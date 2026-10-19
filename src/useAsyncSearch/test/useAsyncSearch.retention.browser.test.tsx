import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './useAsyncSearch.retention.client';

let source: Awaited<ReturnType<typeof createSourceBrowser>>;
beforeAll(async () => {
  source = await createSourceBrowser({
    root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
    entry: '/src/useAsyncSearch/test/useAsyncSearch.retention.client.tsx',
    hmr: false
  });
  console.info(
    'Search retention runtime',
    source.browserName,
    source.browser.version(),
    source.reactVersion
  );
});
afterAll(async () => source?.close());

it.each(['success', 'error', 'pending'] as const)(
  'releases previous %s state while the disabled hook stays mounted',
  async mode => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const snapshot = () => page.evaluate(() => window.__RSUITE_ASYNC_SEARCH_RETENTION__.snapshot());
    try {
      await page.goto(`${source.url}/#mode=${mode}`);
      expect(await page.evaluate(() => window.__RSUITE_ASYNC_SEARCH_RETENTION__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      expect(await page.evaluate(() => '__registerBeforePerformReactRefresh' in window)).toBe(
        false
      );
      await page.getByRole('button', { name: 'Mount search', exact: true }).click();
      await page.waitForFunction(mode => {
        const value = window.__RSUITE_ASYNC_SEARCH_RETENTION__.snapshot();
        return value.status === mode && value.calls === 1;
      }, mode);
      await page.requestGC();
      const enabled = await snapshot();
      // Positive control: the active hook must still own its current data/error.
      expect(enabled.liveObjects).toBe(mode === 'error' ? 2 : 1);
      expect(enabled.items).toBe(mode === 'success' ? 1 : 0);
      await page.getByRole('button', { name: 'Disable and release data', exact: true }).click();
      await page.waitForFunction(
        () => window.__RSUITE_ASYNC_SEARCH_RETENTION__.snapshot().status === 'idle'
      );
      for (let index = 0; index < 6; index++) {
        await page.getByRole('button', { name: 'Commit unrelated render', exact: true }).click();
      }
      await page.evaluate(() => window.__RSUITE_ASYNC_SEARCH_RETENTION__.settle());
      expect(await snapshot()).toMatchObject({
        mounted: true,
        status: 'idle',
        items: 0,
        error: '',
        revision: 6,
        calls: 1,
        aborts: 1
      });
      let disabledFailure: unknown;
      try {
        await expect
          .poll(
            async () => {
              await page.requestGC();
              return (await snapshot()).liveObjects;
            },
            { timeout: 5000 }
          )
          .toBe(0);
      } catch (error) {
        disabledFailure = error;
      }
      const disabled = await snapshot();
      await page.getByRole('button', { name: 'Unmount search', exact: true }).click();
      for (let index = 0; index < 6; index++) {
        await page.getByRole('button', { name: 'Commit unrelated render', exact: true }).click();
      }
      await expect
        .poll(
          async () => {
            await page.requestGC();
            return (await snapshot()).liveObjects;
          },
          { timeout: 5000 }
        )
        .toBe(0);
      console.info('Search retention controls', { enabled, disabled, unmounted: await snapshot() });
      expect(errors).toEqual([]);
      if (disabledFailure) throw disabledFailure;
    } finally {
      await page.close();
    }
  }
);
