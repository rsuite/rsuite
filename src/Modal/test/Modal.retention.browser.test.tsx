import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Modal.retention.client';

let source: Awaited<ReturnType<typeof createSourceBrowser>>;
beforeAll(async () => {
  source = await createSourceBrowser({
    root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
    entry: '/src/Modal/test/Modal.retention.client.tsx',
    hmr: false
  });
});
afterAll(async () => source?.close());

it.each(['closed', 'close', 'replace'] as const)(
  'releases replaced callbacks while the %s Modal stays mounted',
  async mode => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const snapshot = () => page.evaluate(() => window.__RSUITE_MODAL_RETENTION__.snapshot());
    const collect = async () => {
      for (let index = 0; index < 3; index++) await page.requestGC();
      return snapshot();
    };
    try {
      await page.goto(`${source.url}/#mode=${mode}`);
      await page.waitForFunction(() => window.__RSUITE_MODAL_RETENTION__?.snapshot().mounted);
      expect(await page.evaluate(() => window.__RSUITE_MODAL_RETENTION__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      expect(await page.evaluate(() => '__registerBeforePerformReactRefresh' in window)).toBe(
        false
      );
      if (mode !== 'closed') {
        await page.waitForFunction(
          () => window.__RSUITE_MODAL_RETENTION__.snapshot().observed === 'old'
        );
      }
      expect((await collect()).live).toEqual([
        { tag: 'old', kind: 'payload' },
        { tag: 'old', kind: 'callback' }
      ]);
      await page.evaluate(() => window.__RSUITE_MODAL_RETENTION__.replace());
      if (mode !== 'replace') await page.getByRole('dialog').waitFor({ state: 'hidden' });
      for (let index = 0; index < 6; index++) {
        await page.evaluate(() => window.__RSUITE_MODAL_RETENTION__.commit());
      }
      let retainedFailure: unknown;
      try {
        expect((await collect()).live).toEqual([
          { tag: 'current', kind: 'payload' },
          { tag: 'current', kind: 'callback' }
        ]);
      } catch (error) {
        retainedFailure = error;
      }
      expect(await snapshot()).toMatchObject({ mounted: true, revision: 6 });
      await page.evaluate(() => window.__RSUITE_MODAL_RETENTION__.hide());
      await page.getByRole('dialog').waitFor({ state: 'hidden' });
      await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
      await page.waitForFunction(
        () => window.__RSUITE_MODAL_RETENTION__.snapshot().observed === 'current'
      );
      await page.evaluate(() => window.__RSUITE_MODAL_RETENTION__.unmount());
      for (let index = 0; index < 6; index++) {
        await page.evaluate(() => window.__RSUITE_MODAL_RETENTION__.commit());
      }
      expect((await collect()).live).toEqual([]);
      expect((await snapshot()).mounted).toBe(false);
      expect(errors).toEqual([]);
      if (retainedFailure) throw retainedFailure;
    } finally {
      await page.close();
    }
  }
);
