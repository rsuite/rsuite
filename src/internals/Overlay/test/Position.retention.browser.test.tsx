import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, afterAll, it, expect } from 'vitest';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

let source: Awaited<ReturnType<typeof createSourceBrowser>>;
beforeAll(async () => {
  source = await createSourceBrowser({
    root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
    hmr: false,
    entry: '/src/internals/Overlay/test/Position.retention.client.tsx'
  });
  console.info('Runtime', source.browserName, source.browser.version(), source.reactVersion);
});
afterAll(async () => source?.close());

it.each([false, true])('releases unmounted custom containers (cached=%s)', async cached => {
  const page = await source.browser.newPage();
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(`${source.url}/${cached ? '#cached' : ''}`);
    expect(await page.evaluate(() => window.__RSUITE_OVERLAY_RETENTION__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    expect(await page.evaluate(() => '__registerBeforePerformReactRefresh' in window)).toBe(false);
    await page.getByRole('button', { name: 'Mount overlays', exact: true }).click();
    await page.waitForFunction(() => {
      const state = window.__RSUITE_OVERLAY_RETENTION__.snapshot();
      return state.entered === state.count;
    });
    const mounted = await page.evaluate(() => window.__RSUITE_OVERLAY_RETENTION__.snapshot());
    expect(mounted.trustedMount).toBe(true);
    expect(mounted.connectedContainers).toBe(mounted.count);
    expect(mounted.tooltips).toBe(mounted.count);
    await page.getByRole('button', { name: 'Remove overlays', exact: true }).click();
    await page.evaluate(() => window.__RSUITE_OVERLAY_RETENTION__.settle());
    const removed = await page.evaluate(() => window.__RSUITE_OVERLAY_RETENTION__.snapshot());
    expect(removed.trustedRemove).toBe(true);
    expect(removed.connectedContainers).toBe(0);
    expect(removed.tooltips).toBe(0);
    try {
      await expect
        .poll(
          async () => {
            // Request collection after the unmount/layout jobs have completed.
            await page.requestGC();
            return page.evaluate(
              () => window.__RSUITE_OVERLAY_RETENTION__.snapshot().liveContainers
            );
          },
          { timeout: 5000 }
        )
        .toBe(0);
    } finally {
      console.info(
        '[overlay-retention]',
        JSON.stringify({
          ...(await page.evaluate(() => window.__RSUITE_OVERLAY_RETENTION__.snapshot())),
          errors
        })
      );
    }
    expect(errors).toEqual([]);
  } finally {
    await page.close();
  }
});
