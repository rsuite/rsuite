import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, afterAll, it, expect } from 'vitest';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

let source: Awaited<ReturnType<typeof createSourceBrowser>>;
beforeAll(async () => {
  source = await createSourceBrowser({
    root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
    entry: '/src/internals/Overlay/test/Position.shadow.client.tsx'
  });
  console.info('Runtime', source.browserName, source.browser.version(), source.reactVersion);
});
afterAll(async () => source?.close());
const cases = ['light', 'open', 'closed', 'nested'].flatMap(mode =>
  [false, true].flatMap(custom =>
    ['bottomStart', 'topEnd', 'autoVerticalEnd'].map(placement => ({
      mode,
      custom,
      placement,
      fixed: false,
      frame: false,
      rtl: false
    }))
  )
);

const cursorCases = ['light', 'open'].flatMap(mode =>
  [false, true].flatMap(custom =>
    [false, true].flatMap(fixed =>
      [false, true].map(scrolled => ({ mode, custom, fixed, scrolled }))
    )
  )
);

it.each(cursorCases)(
  'positions cursor in $mode roots custom=$custom fixed=$fixed scrolled=$scrolled',
  async ({ mode, custom, fixed, scrolled }) => {
    const page = await source.browser.newPage({ viewport: { width: 1100, height: 800 } });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      await page.goto(
        `${source.url}/#mode=${mode}&placement=bottomStart&cursor${custom ? '&custom' : ''}${fixed ? '&fixed' : ''}${scrolled ? '&scrolled' : ''}`
      );
      await page.waitForFunction(() => window.__RSUITE_SHADOW_POSITION__?.snapshot().ready);
      expect(await page.evaluate(() => window.__RSUITE_SHADOW_POSITION__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      const initial = await page.evaluate(() => window.__RSUITE_SHADOW_POSITION__.snapshot());
      expect(initial.connected).toBe(true);
      for (const delta of [
        { left: 15, top: 10 },
        { left: 70, top: 6 }
      ]) {
        const point = {
          left: initial.anchor!.left + delta.left,
          top: initial.anchor!.top + delta.top
        };
        await page.mouse.move(point.left, point.top);
        await page.waitForFunction(
          () => window.__RSUITE_SHADOW_POSITION__.snapshot().entered === 1
        );
        await page.evaluate(() => window.__RSUITE_SHADOW_POSITION__.settle());
        const result = await page.evaluate(() => window.__RSUITE_SHADOW_POSITION__.snapshot());
        console.info(
          '[shadow-cursor]',
          JSON.stringify({ mode, custom, fixed, scrolled, point, ...result, errors })
        );
        expect(errors).toEqual([]);
        expect(result.trustedMove).toBe(true);
        expect(result.placement).toBe('bottom-start');
        expect(result.overlay!.width).toBe(120);
        expect(result.overlay!.height).toBe(30);
        expect(result.overlay!.left).toBeCloseTo(point.left, 1);
        expect(result.overlay!.top).toBeCloseTo(point.top + 10, 1);
      }
    } finally {
      await page.close();
    }
  }
);
cases.push(
  ...['light', 'open'].flatMap(mode =>
    [false, true].map(custom => ({
      mode,
      custom,
      placement: 'bottomStart',
      fixed: true,
      frame: false,
      rtl: false
    }))
  )
);
cases.push(
  ...[false, true].flatMap(rtl =>
    ['autoVerticalEnd', 'bottomStart'].map(placement => ({
      mode: 'open',
      custom: false,
      placement,
      fixed: false,
      frame: true,
      rtl
    }))
  )
);

it.each(cases)(
  'positions $mode roots custom=$custom placement=$placement fixed=$fixed frame=$frame rtl=$rtl',
  async ({ mode, custom, placement, fixed, frame, rtl }) => {
    const page = await source.browser.newPage({ viewport: { width: 1100, height: 800 } });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      await page.goto(
        `${source.url}/#mode=${mode}&placement=${placement}${custom ? '&custom' : ''}${fixed ? '&fixed' : ''}${frame ? '&frame' : ''}${rtl ? '&rtl' : ''}`
      );
      await page.waitForFunction(() => window.__RSUITE_SHADOW_POSITION__?.snapshot().ready);
      expect(await page.evaluate(() => window.__RSUITE_SHADOW_POSITION__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      const initial = await page.evaluate(() => window.__RSUITE_SHADOW_POSITION__.snapshot());
      expect(initial.connected).toBe(true);
      expect(initial.documentContains).toBe(mode === 'light');
      await page.mouse.click(
        initial.anchor!.left + initial.pointerOffset.left + 50,
        initial.anchor!.top + initial.pointerOffset.top + 14
      );
      if (frame) {
        const clicked = await page.evaluate(() => window.__RSUITE_SHADOW_POSITION__.snapshot());
        console.info('[frame-bootstrap]', JSON.stringify({ ...clicked, errors }));
        expect(clicked.frameDocumentCurrent).toBe(true);
        expect(clicked.connected).toBe(true);
      }
      await page.waitForFunction(() => window.__RSUITE_SHADOW_POSITION__.snapshot().entered === 1);
      await page.evaluate(() => window.__RSUITE_SHADOW_POSITION__.settle());
      const result = await page.evaluate(() => window.__RSUITE_SHADOW_POSITION__.snapshot());
      console.info(
        '[shadow-position]',
        JSON.stringify({ mode, custom, requestedPlacement: placement, ...result, errors })
      );
      expect(errors).toEqual([]);
      expect(result.trustedClick).toBe(true);
      expect(result.overlay!.width).toBe(120);
      expect(result.overlay!.height).toBe(30);
      const expectedPlacement =
        placement === 'autoVerticalEnd'
          ? frame
            ? 'top-end'
            : 'bottom-end'
          : placement === 'bottomStart'
            ? 'bottom-start'
            : 'top-end';
      expect(result.placement).toBe(expectedPlacement);
      if (
        (expectedPlacement.endsWith('start') && !rtl) ||
        (expectedPlacement.endsWith('end') && rtl)
      )
        expect(result.overlay!.left).toBeCloseTo(result.anchor!.left, 1);
      else expect(result.overlay!.right).toBeCloseTo(result.anchor!.right, 1);
      if (expectedPlacement.startsWith('bottom'))
        expect(result.overlay!.top).toBeCloseTo(result.anchor!.bottom, 1);
      else expect(result.overlay!.bottom).toBeCloseTo(result.anchor!.top, 1);
    } finally {
      await page.close();
    }
  }
);
