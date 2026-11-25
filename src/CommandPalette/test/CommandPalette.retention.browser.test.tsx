import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './CommandPalette.retention.client';

let source: Awaited<ReturnType<typeof createSourceBrowser>>;
beforeAll(async () => {
  source = await createSourceBrowser({
    root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
    entry: '/src/CommandPalette/test/CommandPalette.retention.client.tsx',
    hmr: false
  });
});
afterAll(async () => source?.close());

it.each(['closed', 'close', 'filtered'] as const)(
  'releases the old catalog while the %s palette stays mounted',
  async mode => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const snapshot = () =>
      page.evaluate(() => window.__RSUITE_COMMAND_CATALOG_RETENTION__.snapshot());
    const collect = async () => {
      for (let index = 0; index < 3; index++) await page.requestGC();
      return snapshot();
    };
    const commitAlternates = async () => {
      for (let index = 0; index < 6; index++) {
        await page.evaluate(() => window.__RSUITE_COMMAND_CATALOG_RETENTION__.commit());
      }
    };
    try {
      await page.goto(`${source.url}/#mode=${mode}`);
      await page.waitForFunction(
        () => window.__RSUITE_COMMAND_CATALOG_RETENTION__?.snapshot().mounted
      );
      expect(
        await page.evaluate(() => window.__RSUITE_COMMAND_CATALOG_RETENTION__.runtime)
      ).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      expect(await page.evaluate(() => '__registerBeforePerformReactRefresh' in window)).toBe(
        false
      );
      if (mode !== 'closed')
        await page.getByRole('option', { name: 'Command old', exact: true }).waitFor();
      expect((await collect()).live).toEqual([
        { tag: 'old', kind: 'payload' },
        { tag: 'old', kind: 'item' },
        { tag: 'old', kind: 'catalog' }
      ]);
      await page.evaluate(() => window.__RSUITE_COMMAND_CATALOG_RETENTION__.clear());
      await page.getByRole('dialog').waitFor({ state: 'hidden' });
      await commitAlternates();
      expect(await snapshot()).toMatchObject({ mounted: true, revision: 6 });
      let retainedFailure: unknown;
      try {
        expect((await collect()).live).toEqual([]);
      } catch (error) {
        retainedFailure = error;
      }
      await page.evaluate(() => window.__RSUITE_COMMAND_CATALOG_RETENTION__.restore());
      await commitAlternates();
      expect((await collect()).live.filter(item => item.tag === 'current')).toEqual([
        { tag: 'current', kind: 'payload' },
        { tag: 'current', kind: 'item' },
        { tag: 'current', kind: 'catalog' }
      ]);
      await page.getByRole('button', { name: 'Open commands', exact: true }).click();
      await page.getByRole('option', { name: 'Command current', exact: true }).waitFor();
      await page.getByRole('combobox').press('Enter');
      expect((await snapshot()).selected).toBe('current');
      await page.getByRole('dialog').waitFor({ state: 'hidden' });
      await page.evaluate(() => window.__RSUITE_COMMAND_CATALOG_RETENTION__.unmount());
      await commitAlternates();
      expect((await collect()).live).toEqual([]);
      expect((await snapshot()).mounted).toBe(false);
      expect(errors).toEqual([]);
      if (retainedFailure) throw retainedFailure;
    } finally {
      await page.close();
    }
  }
);
