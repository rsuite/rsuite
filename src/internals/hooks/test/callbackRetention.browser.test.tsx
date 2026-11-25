import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, expect, it } from 'vitest';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';
import type {} from './callbackRetention.client';

let source: Awaited<ReturnType<typeof createSourceBrowser>>;
beforeAll(async () => {
  source = await createSourceBrowser({
    root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
    entry: '/src/internals/hooks/test/callbackRetention.client.tsx',
    hmr: false
  });
});
afterAll(async () => source?.close());

it.each(['event', 'config', 'button'] as const)(
  'releases superseded callbacks and payloads while %s remains mounted',
  async mode => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const snapshot = () => page.evaluate(() => window.__RSUITE_CALLBACK_RETENTION__.snapshot());
    const collect = async () => {
      for (let index = 0; index < 3; index++) await page.requestGC();
      return snapshot();
    };
    try {
      await page.goto(`${source.url}/#mode=${mode}`);
      expect(await page.evaluate(() => window.__RSUITE_CALLBACK_RETENTION__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      expect(await page.evaluate(() => '__registerBeforePerformReactRefresh' in window)).toBe(
        false
      );
      await page.locator('#target').click();
      expect((await collect()).live).toEqual([
        { tag: 'old', kind: 'payload' },
        { tag: 'old', kind: 'callback' }
      ]);
      expect((await snapshot()).observed).toBe('old');
      for (const tag of ['middle', 'current']) {
        await page.evaluate(tag => window.__RSUITE_CALLBACK_RETENTION__.replace(tag), tag);
        await page.locator('#target').click();
        expect((await snapshot()).observed).toBe(tag);
      }
      // Render both fiber alternates with current props before checking GC.
      for (let index = 0; index < 6; index++) {
        await page.evaluate(() => window.__RSUITE_CALLBACK_RETENTION__.commit());
      }
      expect(await snapshot()).toMatchObject({ mounted: true, revision: 6, observed: 'current' });
      let retainedFailure: unknown;
      try {
        expect((await collect()).live).toEqual([
          { tag: 'current', kind: 'payload' },
          { tag: 'current', kind: 'callback' }
        ]);
      } catch (error) {
        retainedFailure = error;
      }
      await page.evaluate(() => window.__RSUITE_CALLBACK_RETENTION__.unmount());
      for (let index = 0; index < 6; index++) {
        await page.evaluate(() => window.__RSUITE_CALLBACK_RETENTION__.commit());
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
