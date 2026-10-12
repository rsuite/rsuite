import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

describe('Picker group keys with native clicks', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
      entry: '/src/internals/Picker/test/Picker.group-keys.client.tsx'
    });
    console.info('Picker group keys browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  describe.each(['SelectPicker', 'CheckPicker', 'InputPicker', 'TagPicker'])('%s', picker => {
    it.each([false, true])(
      'Should collapse a mixed zero group and preserve selection (virtualized=%s)',
      async virtualized => {
        const page = await source.browser.newPage();
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(String(error)));
        page.on('console', message => {
          if (message.type() === 'error') errors.push(message.text());
        });
        try {
          const params = new URLSearchParams({ picker });
          if (virtualized) params.set('virtualized', 'true');
          await page.goto(`${source.url}/#${params}`);
          await expect
            .poll(() => page.evaluate(() => window.__RSUITE_GROUP_KEYS__?.snapshot().entered))
            .toBe(true);
          expect(await page.evaluate(() => window.__RSUITE_GROUP_KEYS__.runtime)).toEqual({
            react: source.reactVersion,
            reactDOM: source.reactVersion
          });
          const title = page.getByText('Group: 0', { exact: true });
          for (let cycle = 0; cycle < 2; cycle++) {
            await expect.poll(() => page.getByRole('option').count()).toBe(3);
            await title.click();
            await expect.poll(() => page.getByRole('option').count()).toBe(1);
            expect(await page.getByRole('option', { name: 'Other', exact: true }).isVisible()).toBe(
              true
            );
            expect(
              await page.getByRole('option', { name: 'Number zero', exact: true }).count()
            ).toBe(0);
            expect(
              await page.getByRole('option', { name: 'String zero', exact: true }).count()
            ).toBe(0);
            expect(
              (await page.evaluate(() => window.__RSUITE_GROUP_KEYS__.snapshot())).changes
            ).toEqual([]);
            await title.click();
          }
          await expect.poll(() => page.getByRole('option').count()).toBe(3);
          const ids = await page
            .getByRole('option')
            .evaluateAll(nodes => nodes.map(node => node.id));
          expect(ids.every(Boolean)).toBe(true);
          expect(new Set(ids).size).toBe(3);
          await page.getByRole('option', { name: 'String zero', exact: true }).click();
          const state = await page.evaluate(() => window.__RSUITE_GROUP_KEYS__.snapshot());
          expect(state.groupClicks).toEqual([true, true, true, true]);
          expect(state.changes).toEqual([
            {
              value: picker === 'CheckPicker' || picker === 'TagPicker' ? ['0'] : '0',
              trusted: true
            }
          ]);
          expect(state.selections).toEqual([
            {
              value: picker === 'CheckPicker' || picker === 'TagPicker' ? ['0'] : '0',
              originalItem: true,
              trusted: true
            }
          ]);
          expect(errors).toEqual([]);
        } finally {
          await page.close();
        }
      }
    );
  });
});
