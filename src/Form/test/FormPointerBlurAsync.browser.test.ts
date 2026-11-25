import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './FormPointerBlurAsync.client';

describe('Form async request ownership during a pointer gesture', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Form/test/FormPointerBlurAsync.client.tsx'
    });
  });
  afterAll(async () => source?.close());

  describe.each(['schema', 'resolver'])('%s', adapter => {
    describe.each([false, true])('RSuite button: %s', sdkButton => {
      it.each([
        'blur-result',
        'clean-during-press',
        'explicit-supersedes-blur',
        'blur-supersedes-prior'
      ])('%s', async scenario => {
        const page = await source.browser.newPage({ viewport: { width: 800, height: 600 } });
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(String(error)));
        try {
          await page.goto(
            source.url + '/#' + encodeURIComponent(JSON.stringify({ adapter, sdkButton }))
          );
          await page.waitForFunction(() => window.__RSUITE_ASYNC_POINTER__?.ready);
          if (scenario === 'blur-supersedes-prior') {
            await page.evaluate(() => window.__RSUITE_ASYNC_POINTER_ACTIONS__.check(false));
            await page.waitForFunction(() => window.__RSUITE_ASYNC_POINTER__.requests.length === 1);
          }
          await page.getByRole('textbox', { name: 'Value', exact: true }).focus();
          const box = await page.locator('#async-pointer-submit').boundingBox();
          expect(box).not.toBeNull();
          await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
          await page.mouse.down();
          if (scenario === 'clean-during-press')
            await page.evaluate(() => window.__RSUITE_ASYNC_POINTER_ACTIONS__.clean());
          if (scenario === 'explicit-supersedes-blur')
            await page.evaluate(() => window.__RSUITE_ASYNC_POINTER_ACTIONS__.check(true));
          if (scenario === 'blur-supersedes-prior') {
            await page.evaluate(() => window.__RSUITE_ASYNC_POINTER_ACTIONS__.release(0, false));
            await page.waitForFunction(() => window.__RSUITE_ASYNC_POINTER__.settled.length === 1);
            expect(await page.evaluate(() => window.__RSUITE_ASYNC_POINTER__.checks)).toEqual([]);
          }
          await page.mouse.move(700, 500, { steps: 3 });
          await page.mouse.up();
          await page.evaluate(() => new Promise<void>(resolve => setTimeout(resolve, 0)));
          const count = await page.evaluate(() => window.__RSUITE_ASYNC_POINTER__.requests.length);
          expect(count).toBe(
            scenario === 'clean-during-press' ? 0 : scenario === 'blur-supersedes-prior' ? 2 : 1
          );
          if (scenario !== 'clean-during-press') {
            await page.evaluate(
              ({ id, valid }) => window.__RSUITE_ASYNC_POINTER_ACTIONS__.release(id, valid),
              {
                id: count - 1,
                valid: scenario !== 'blur-result'
              }
            );
            await page.waitForFunction(() => window.__RSUITE_ASYNC_POINTER__.checks.length === 1);
          }
          const state = await page.evaluate(() => ({
            ...window.__RSUITE_ASYNC_POINTER__,
            invalid: document.querySelector('input')!.getAttribute('aria-invalid'),
            alerts: Array.from(
              document.querySelectorAll('[role="alert"]'),
              node => node.textContent
            )
          }));
          expect(state.requests.every(request => request.value === 'value')).toBe(true);
          expect(state.checks).toHaveLength(scenario === 'clean-during-press' ? 0 : 1);
          expect(state.nativeSubmits).toBe(0);
          expect(state.events.length).toBeGreaterThan(0);
          expect(state.events.every(Boolean)).toBe(true);
          expect(state.alerts).toEqual(scenario === 'blur-result' ? ['Use valid value'] : []);
          expect(state.invalid === 'true').toBe(scenario === 'blur-result');
          expect(errors).toEqual([]);
        } finally {
          await page.close();
        }
      });
    });
  });
});
