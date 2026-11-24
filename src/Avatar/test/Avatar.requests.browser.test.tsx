import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Route } from 'playwright';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('Avatar image request ownership', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Avatar/test/Avatar.requests.client.tsx'
    });
    console.info('Avatar request browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });

  afterAll(async () => source?.close());

  describe.each([false, true])('StrictMode: %s', strict => {
    it.each([
      'obsolete error after current success',
      'obsolete error before current success',
      'obsolete success after current error',
      'obsolete success before current error',
      'clear source before error',
      'unmount before error',
      'current error',
      'current success',
      'replace error handler while loading'
    ])('%s', async scenario => {
      const page = await source.browser.newPage();
      const pending = new Map<string, Route[]>();
      const responses = new Map<string, string>();
      const pageErrors: string[] = [];
      let stage = 'navigate';
      page.on('pageerror', error => pageErrors.push(String(error)));

      const fulfill = (route: Route, body: string) =>
        route.fulfill({ contentType: 'image/svg+xml', body });
      await page.route(`${source.url}/avatar-images/*`, async route => {
        const key = new URL(route.request().url()).pathname.split('/').pop()![0];
        const body = responses.get(key);
        if (body !== undefined) {
          await fulfill(route, body);
        } else {
          pending.set(key, [...(pending.get(key) || []), route]);
        }
      });

      const settle = async (key: 'A' | 'B', success: boolean) => {
        const body = success
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="blue"/></svg>`
          : 'invalid image';
        responses.set(key, body);
        const routes = pending.get(key) || [];
        pending.delete(key);
        expect(routes.length).toBeGreaterThan(0);
        await Promise.all(routes.map(route => fulfill(route, body)));
        await page.waitForFunction(
          ({ key, type }) => {
            const state = window.__RSUITE_AVATAR_REQUESTS__.snapshot();
            const images = state.images.filter(image => image.source.endsWith(`/${key}.svg`));
            return (
              images.length > 0 &&
              images.every(image =>
                state.imageEvents.some(event => event.id === image.id && event.type === type)
              )
            );
          },
          { key, type: success ? 'load' : 'error' }
        );
      };

      try {
        // Image responses are deliberately held until the scenario releases them.
        await page.goto(`${source.url}${strict ? '#strict' : ''}`, {
          waitUntil: 'domcontentloaded'
        });
        stage = 'ready';
        await page.waitForFunction(() => Boolean(window.__RSUITE_AVATAR_REQUESTS__));
        await expect.poll(() => pending.get('A')?.length || 0).toBeGreaterThan(0);
        expect(await page.evaluate(() => window.__RSUITE_AVATAR_REQUESTS__.runtime)).toEqual({
          react: source.reactVersion,
          reactDOM: source.reactVersion
        });

        const obsolete = scenario.startsWith('obsolete');
        if (obsolete) {
          await page.getByRole('button', { name: 'Use B', exact: true }).click();
          await expect.poll(() => pending.get('B')?.length || 0).toBeGreaterThan(0);
          const currentSuccess = scenario.includes('current success');
          const oldSuccess = !currentSuccess;
          if (scenario.includes('before')) {
            await settle('A', oldSuccess);
            await settle('B', currentSuccess);
          } else {
            await settle('B', currentSuccess);
            await settle('A', oldSuccess);
          }
        } else {
          if (scenario.startsWith('clear')) {
            await page.getByRole('button', { name: 'Clear source', exact: true }).click();
          } else if (scenario.startsWith('unmount')) {
            await page.getByRole('button', { name: 'Unmount', exact: true }).click();
          } else if (scenario.startsWith('replace')) {
            await page.getByRole('button', { name: 'Change error handler', exact: true }).click();
          }
          await settle('A', scenario === 'current success');
        }

        const currentSuccess = scenario.includes('current success');
        const currentFailure = scenario.includes('current error') || scenario.startsWith('replace');
        const avatar = page.getByTestId('avatar');
        if (scenario.startsWith('unmount')) {
          expect(await avatar.count()).toBe(0);
        } else if (currentSuccess) {
          await expect.poll(() => avatar.locator('img').count()).toBe(1);
          await page.waitForFunction(() => {
            const image = document.querySelector('[data-testid="avatar"] img') as HTMLImageElement;
            return image?.complete && image.naturalWidth === 48;
          });
          expect(await avatar.locator('img').getAttribute('src')).toBe(
            `/avatar-images/${obsolete ? 'B' : 'A'}.svg`
          );
        } else {
          await expect.poll(() => avatar.textContent()).toBe('Fallback');
          expect(await avatar.locator('img').count()).toBe(0);
        }

        const state = await page.evaluate(() => window.__RSUITE_AVATAR_REQUESTS__.snapshot());
        expect(state.nativeImages).toBe(true);
        expect(state.images).toHaveLength((strict ? 2 : 1) + (obsolete ? 1 : 0));
        expect(state.imageEvents.every(event => event.trusted)).toBe(true);
        expect(state.failures).toEqual(
          currentFailure
            ? [
                {
                  source: `${source.url}/avatar-images/${obsolete ? 'B' : 'A'}.svg`,
                  handler: scenario.startsWith('replace') ? 'latest' : 'initial',
                  trusted: true
                }
              ]
            : []
        );
        expect(pageErrors).toEqual([]);
      } finally {
        console.info(
          '[avatar-request-native-audit]',
          JSON.stringify({
            scenario,
            strict,
            stage,
            pending: [...pending.keys()],
            pageErrors,
            ...(await page.evaluate(() => window.__RSUITE_AVATAR_REQUESTS__?.snapshot()))
          })
        );
        await page.close();
      }
    });
  });
});
