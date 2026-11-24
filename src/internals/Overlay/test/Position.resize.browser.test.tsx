import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, expect, it } from 'vitest';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

let source: Awaited<ReturnType<typeof createSourceBrowser>>;
beforeAll(async () => {
  source = await createSourceBrowser({
    root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
    entry: '/src/internals/Overlay/test/Position.resize.client.tsx'
  });
  console.info('Runtime', source.browserName, source.browser.version(), source.reactVersion);
});

it.each([false, true])('observes only active geometry custom=%s', async custom => {
  const page = await source.browser.newPage();
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(`${source.url}/#mode=anchor-height${custom ? '&custom' : ''}`);
    await page.waitForFunction(() => {
      const state = window.__RSUITE_OVERLAY_RESIZE__.snapshot();
      return state.ready && state.entered === 1 && Date.now() - state.lastMeasured > 150;
    });
    await page.evaluate(() => window.__RSUITE_OVERLAY_RESIZE__.resetMeasurements());
    await page.getByRole('button', { name: 'Resize unrelated', exact: true }).click();
    await page.evaluate(() => window.__RSUITE_OVERLAY_RESIZE__.settle());
    expect(
      await page.locator('#unrelated').evaluate(node => node.getBoundingClientRect().width)
    ).toBe(240);
    expect(
      (await page.evaluate(() => window.__RSUITE_OVERLAY_RESIZE__.snapshot())).measurements
    ).toBe(0);
    await page.getByRole('button', { name: 'Close overlay', exact: true }).click();
    await page.waitForFunction(() => window.__RSUITE_OVERLAY_RESIZE__.snapshot().exited === 1);
    await expect.poll(() => page.getByTestId('overlay').count()).toBe(0);
    await page.evaluate(() => window.__RSUITE_OVERLAY_RESIZE__.settle());
    await page.evaluate(() => window.__RSUITE_OVERLAY_RESIZE__.resetMeasurements());
    await page.getByRole('button', { name: 'Resize closed nodes', exact: true }).click();
    await page.evaluate(() => window.__RSUITE_OVERLAY_RESIZE__.settle());
    const state = await page.evaluate(() => window.__RSUITE_OVERLAY_RESIZE__.snapshot());
    console.info('[resize-cleanup]', JSON.stringify({ custom, ...state, errors }));
    expect(state.anchor.height).toBe(95);
    expect(state.container.width).toBe(290);
    expect(state.measurements).toBe(0);
    expect(errors).toEqual([]);
  } finally {
    await page.close();
  }
});
afterAll(async () => source?.close());

const cases = ['anchor-height', 'anchor-width', 'anchor-border', 'overlay-width'].flatMap(mode =>
  [false, true].map(custom => ({ mode, custom }))
);
cases.push(
  ...['container-width', 'container-height', 'manual'].map(mode => ({ mode, custom: true }))
);

it.each(cases)('repositions for $mode custom=$custom', async ({ mode, custom }) => {
  const page = await source.browser.newPage();
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(`${source.url}/#mode=${mode}${custom ? '&custom' : ''}`);
    await page.waitForFunction(() => {
      const state = window.__RSUITE_OVERLAY_RESIZE__.snapshot();
      return state.ready && state.entered === 1 && Date.now() - state.lastMeasured > 150;
    });
    expect(await page.evaluate(() => window.__RSUITE_OVERLAY_RESIZE__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    const before = await page.evaluate(() => window.__RSUITE_OVERLAY_RESIZE__.snapshot());
    await page.getByRole('button', { name: 'Change size', exact: true }).click();
    if (mode === 'manual') {
      const state = await page.evaluate(() => window.__RSUITE_OVERLAY_RESIZE__.snapshot());
      console.info('[manual-resize]', JSON.stringify(state));
      expect(state.manual!.firstLeft).toBeCloseTo(state.container.left + 220, 1);
      expect(state.manual!.secondLeft).toBeCloseTo(state.container.right - 140, 1);
    } else {
      await expect
        .poll(
          async () => {
            const state = await page.evaluate(() => window.__RSUITE_OVERLAY_RESIZE__.snapshot());
            if (mode === 'container-width') return state.overlay!.right - state.container.right;
            if (mode === 'container-height') return state.overlay!.bottom - state.anchor.top;
            if (mode === 'anchor-height') return state.overlay!.top - state.anchor.bottom;
            if (mode === 'anchor-border')
              return Math.max(
                Math.abs(state.overlay!.top - state.anchor.bottom),
                Math.abs(
                  state.overlay!.left +
                    state.overlay!.width / 2 -
                    state.anchor.left -
                    state.anchor.width / 2
                )
              );
            return (
              state.overlay!.left +
              state.overlay!.width / 2 -
              state.anchor.left -
              state.anchor.width / 2
            );
          },
          { timeout: 1500 }
        )
        .toBeCloseTo(0, 1);
    }
    const after = await page.evaluate(() => window.__RSUITE_OVERLAY_RESIZE__.snapshot());
    console.info('[overlay-resize]', JSON.stringify({ mode, custom, before, after, errors }));
    expect(after.trusted).toBe(true);
    expect(after.measurements).toBeGreaterThan(before.measurements);
    expect(errors).toEqual([]);
  } finally {
    await page.close();
  }
});
