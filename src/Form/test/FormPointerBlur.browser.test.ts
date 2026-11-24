import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import { pointerBlurCases } from './formPointerBlurCases';
import type {} from './FormPointerBlur.client';

describe('Form blur validation during native pointer activation', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Form/test/FormPointerBlur.client.tsx'
    });
    console.info('Form pointer browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  it.each(['submit', '__defineGetter__'])(
    'ignores the unsupported fixture action %s',
    async action => {
      const page = await source.browser.newPage();
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(String(error)));
      try {
        await page.goto(
          source.url + '/#' + encodeURIComponent(JSON.stringify({ shift: false, action }))
        );
        await page.waitForFunction(() => window.__RSUITE_FORM_POINTER__?.ready);
        await page.evaluate(() => window.__RSUITE_FORM_POINTER_ACTION__());
        const state = await page.evaluate(() => window.__RSUITE_FORM_POINTER__);
        expect(state.checks).toEqual([]);
        expect(state.validSubmits).toBe(0);
        expect(state.nativeSubmits).toBe(0);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  describe.each([false, true])('RSuite button: %s', sdkButton => {
    it.each(pointerBlurCases)('$name', async scenario => {
      const page = await source.browser.newPage({ viewport: { width: 800, height: 600 } });
      const errors: string[] = [];
      const httpErrors: number[] = [];
      page.on('pageerror', error => errors.push(String(error)));
      page.on('response', response => {
        if (response.url().startsWith(source.url) && response.status() >= 400)
          httpErrors.push(response.status());
      });
      try {
        await page.goto(
          source.url + '/#' + encodeURIComponent(JSON.stringify({ ...scenario, sdkButton }))
        );
        await page.waitForFunction(() => window.__RSUITE_FORM_POINTER__?.ready);
        const surface = scenario.portal ? page.frameLocator('#pointer-frame') : page;
        expect(
          await surface
            .locator('#pointer-submit')
            .evaluate((button: HTMLButtonElement) => button.form?.tagName)
        ).toBe('FORM');
        await surface.getByRole('textbox', { name: 'Value', exact: true }).focus();
        if (scenario.number)
          await surface
            .getByRole('textbox', { name: 'Value', exact: true })
            .fill(scenario.shift ? '0' : '2');
        const before = await surface.locator('#pointer-submit').boundingBox();
        expect(before).not.toBeNull();
        const x = before!.x + before!.width / 2,
          y = before!.y + before!.height / 2;
        let afterAction: number | undefined;
        if (scenario.gesture === 'keyboard') {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Enter');
        } else {
          await page.mouse.move(x, y);
          await page.mouse.down();
          if (scenario.reentrant) {
            await surface.getByRole('textbox', { name: 'Other', exact: true }).focus();
            await surface.locator('#pointer-submit').focus();
          }
          if (scenario.action) {
            await page.evaluate(() => window.__RSUITE_FORM_POINTER_ACTION__());
            afterAction = await page.evaluate(() => window.__RSUITE_FORM_POINTER__.checks.length);
          }
          if (scenario.gesture === 'outside' || scenario.gesture === 'back')
            await page.mouse.move(700, 500, { steps: 3 });
          if (scenario.gesture === 'back') await page.mouse.move(x, y, { steps: 3 });
          await page.mouse.up();
        }
        // Native click runs before the pointerup fallback in the next task.
        await page.evaluate(() => new Promise<void>(resolve => setTimeout(resolve, 0)));
        const state = await page.evaluate(() => window.__RSUITE_FORM_POINTER__);
        expect(state.events.length).toBeGreaterThan(0);
        expect(state.events.every(event => event.trusted)).toBe(true);
        expect(state.blurs).toBe(1);
        expect(state.nativeSubmits).toBe(scenario.nativeSubmits);
        expect(state.clicks).toBe(scenario.nativeSubmits || scenario.prevent ? 1 : 0);
        expect(state.validSubmits).toBe(!scenario.shift && scenario.nativeSubmits ? 1 : 0);
        expect(state.otherChecks).toBe(0);
        if (scenario.action) {
          expect(afterAction).toBe(scenario.action === 'supersede' ? 1 : 0);
          expect(state.checks).toHaveLength(scenario.action === 'value' ? 1 : afterAction!);
          if (scenario.action === 'value') expect(state.checks).toEqual([{}]);
        } else if (scenario.shift) {
          expect(await surface.getByRole('alert').allTextContents()).toContain('Use valid value');
        } else {
          expect(await surface.getByRole('alert').allTextContents()).toEqual([]);
        }
        expect(errors).toEqual([]);
        expect(httpErrors).toEqual([]);
      } finally {
        await page.close();
      }
    });
  });
});
