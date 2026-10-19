import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

describe('Browser portal container resolution', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
      entry: '/src/internals/hooks/test/Portal.container.client.tsx'
    });
    console.info('Portal container browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());
  it.each(['modal', 'drawer', 'whisper', 'provider'])(
    'resolves and changes a %s container getter',
    async kind => {
      const page = await source.browser.newPage();
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(String(error)));
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text());
      });
      try {
        await page.goto(source.url + '/#kind=' + kind);
        await expect
          .poll(() => page.evaluate(() => window.__RSUITE_PORTAL_CONTAINER__?.snapshot().ready))
          .toBe(true);
        expect(await page.evaluate(() => window.__RSUITE_PORTAL_CONTAINER__.runtime)).toEqual({
          react: source.reactVersion,
          reactDOM: source.reactVersion
        });
        for (const id of ['portal-a', 'portal-b', 'body']) {
          const before = (await page.evaluate(() => window.__RSUITE_PORTAL_CONTAINER__.snapshot()))
            .resolutions;
          await page.evaluate(id => window.__RSUITE_PORTAL_CONTAINER__.setContainer(id), id);
          if (id !== 'portal-a')
            await expect
              .poll(
                async () =>
                  (await page.evaluate(() => window.__RSUITE_PORTAL_CONTAINER__.snapshot()))
                    .resolutions
              )
              .toBeGreaterThan(before);
          if (kind === 'provider') {
            await expect
              .poll(() =>
                page
                  .locator(
                    id === 'body'
                      ? 'body > .rs-toast-provider .rs-toast-container'
                      : '#' + id + ' .rs-toast-container'
                  )
                  .count()
              )
              .toBe(6);
            await page.getByRole('button', { name: 'Push toast' }).click();
          } else await page.getByRole('button', { name: 'Open overlay' }).click();
          await page.getByTestId('portal-content').waitFor();
          expect(
            await page.getByTestId('portal-content').evaluate((node, id) => {
              const destination = id === 'body' ? document.body : document.getElementById(id)!;
              return (
                destination.contains(node) &&
                !document.getElementById('root')!.contains(node) &&
                (id !== 'body' ||
                  (!document.getElementById('portal-a')!.contains(node) &&
                    !document.getElementById('portal-b')!.contains(node)))
              );
            }, id)
          ).toBe(true);
          if (kind === 'provider') await page.getByRole('button', { name: 'Clear toasts' }).click();
          else await page.getByRole('button', { name: 'Close overlay' }).click();
          await page.getByTestId('portal-content').waitFor({ state: 'detached' });
        }
        expect(
          (await page.evaluate(() => window.__RSUITE_PORTAL_CONTAINER__.snapshot())).resolutions
        ).toBeGreaterThan(0);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );
});
