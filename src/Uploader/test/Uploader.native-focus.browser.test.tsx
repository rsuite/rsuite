import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { FileChooser, Page } from 'playwright';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import measureFocusPaint from '../../../test/browser/measureFocusPaint';
import {
  appearance,
  expectContrast,
  focusInput,
  snapshot
} from './Uploader.native-focus.test-utils';

type Options = Parameters<Window['__RSUITE_UPLOAD_NATIVE_FOCUS__']['mount']>[0];
const shapes = ['default', 'button', 'div', 'primary', 'ghost'] as const;

describe('Uploader native file input focus', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Uploader/test/Uploader.native-focus.client.tsx'
    });
    console.info('Uploader native focus', source.browserName, source.reactVersion);
  });
  afterAll(async () => source?.close());
  const withPage = async (
    options: Options,
    run: (page: Page, choices: FileChooser[]) => Promise<void>,
    forced = false
  ) => {
    const page = await source.browser.newPage();
    const choices: FileChooser[] = [];
    page.on('filechooser', chooser => choices.push(chooser));
    try {
      if (forced) await page.emulateMedia({ forcedColors: 'active' });
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_UPLOAD_NATIVE_FOCUS__));
      expect(await page.evaluate(() => window.__RSUITE_UPLOAD_NATIVE_FOCUS__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await page.evaluate(options => window.__RSUITE_UPLOAD_NATIVE_FOCUS__.mount(options), options);
      if (forced)
        expect(await page.evaluate(() => matchMedia('(forced-colors: active)').matches)).toBe(true);
      await run(page, choices);
      expect((await snapshot(page)).submissions).toBe(0);
    } finally {
      await page.close();
    }
  };
  describe.each(['light', 'dark', 'high-contrast'] as const)('%s theme', theme => {
    it.each(shapes)('shows native keyboard focus on the visible %s trigger', async shape => {
      await withPage({ shape, theme, clipped: true }, async page => {
        const trigger = page.locator('.rs-uploader-trigger-btn');
        const initial = await appearance(trigger);
        const beforePaint = await trigger.screenshot();
        await focusInput(page);
        const focused = await appearance(trigger);
        expectContrast(focused, shape !== 'button' && shape !== 'div');
        expect(focused.outline).toBe('solid');
        expect(focused.outlineWidth).toBe('2px');
        if (shape === 'button' || shape === 'div') expect(focused.outlineOffset).toBe('-2px');
        else {
          // The outline stays on the border, clear of the frame inside the padding box.
          expect(parseFloat(focused.outlineOffset)).toBeLessThanOrEqual(0);
          expect(parseFloat(focused.outlineOffset)).toBeGreaterThanOrEqual(
            -parseFloat(focused.border)
          );
        }
        expect(focused.width).toBe(initial.width);
        expect(focused.height).toBe(initial.height);
        expect(focused.shadow).toBe(initial.shadow);
        expect(focused.position).toBe(initial.position);
        if (shape === 'button' || shape === 'div') {
          expect(focused.frameContent).toBe('"consumer badge"');
        } else {
          expect(focused.frameContent).toBe('""');
          expect(focused.frameBorder).toBe('2px');
          expect(parseFloat(focused.frameInset)).toBe(0);
          expect(focused.frameShadow).toContain('inset');
          expect(focused.framePointerEvents).toBe('none');
        }
        const paint = measureFocusPaint(beforePaint, await trigger.screenshot());
        expect(paint.changedPixels).toBeGreaterThanOrEqual(2 * (paint.width + paint.height));
        await trigger.hover();
        expectContrast(await appearance(trigger), shape !== 'button' && shape !== 'div');
        await page.keyboard.press('Tab');
        const destination = shape === 'div' ? '[data-after]' : '.rs-uploader-trigger-btn';
        expect(await page.locator(destination).evaluate(e => document.activeElement === e)).toBe(
          true
        );
        if (shape === 'div') expect((await appearance(trigger)).outline).toBe(initial.outline);
      });
    });

    it.each(['Enter', 'Space'])(
      'keeps native %s selection and FormData with visible focus',
      async key => {
        await withPage({ shape: 'div', theme }, async (page, choices) => {
          await focusInput(page);
          const opened = page.waitForEvent('filechooser');
          await page.keyboard.press(key);
          await (
            await opened
          ).setFiles({
            name: 'selected.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('selected')
          });
          await expect.poll(async () => (await snapshot(page)).changes).toEqual([['selected.txt']]);
          expect(choices).toHaveLength(1);
          expect((await snapshot(page)).files).toEqual(['selected.txt']);
          expect((await snapshot(page)).formFiles).toEqual(['selected.txt']);
        });
      }
    );
    it('shows read-only focus without opening the file picker', async () => {
      await withPage({ shape: 'div', theme, readOnly: true }, async (page, choices) => {
        await focusInput(page);
        expect((await appearance(page.locator('.rs-uploader-trigger-btn'))).outline).toBe('solid');
        await page.keyboard.press('Enter');
        await page.keyboard.press('Space');
        expect(choices).toHaveLength(0);
        expect((await snapshot(page)).changes).toEqual([]);
      });
    });
    it('keeps disabled controls outside the keyboard sequence', async () => {
      await withPage({ shape: 'div', theme, disabled: true }, async (page, choices) => {
        await page.locator('[data-before]').focus();
        await page.keyboard.press('Tab');
        expect(await page.locator('[data-after]').evaluate(e => document.activeElement === e)).toBe(
          true
        );
        expect(choices).toHaveLength(0);
      });
    });
    it.each(['default', 'primary', 'ghost'] as const)(
      'keeps the %s frame in forced colors',
      async shape => {
        await withPage(
          { shape, theme, clipped: true },
          async page => {
            await focusInput(page);
            const frame = await appearance(page.locator('.rs-uploader-trigger-btn'));
            expectContrast(frame, true, true);
            expect(frame.frameContent).toBe('""');
            expect(frame.frameShadow).toBe('none');
            expect(frame.frameOutline).toBe('solid');
            expect(frame.framePointerEvents).toBe('none');
          },
          true
        );
      }
    );

    it.each([
      ...shapes.map(shape => ({ shape, listType: 'picture' as const, draggable: false })),
      ...(['button', 'div'] as const).map(shape => ({
        shape,
        listType: undefined,
        draggable: true
      }))
    ])(
      'preserves $shape custom content in picture/drag mode ($listType, $draggable)',
      async options => {
        await withPage({ ...options, theme, clipped: true }, async page => {
          const trigger = page.locator('.rs-uploader-trigger-btn');
          const initial = await appearance(trigger);
          await focusInput(page);
          const focused = await appearance(trigger);
          const framework = options.shape !== 'button' && options.shape !== 'div';
          expectContrast(focused, framework);
          expect(focused.outline).toBe('solid');
          expect(focused.outlineWidth).toBe('2px');
          expect(focused.width).toBe(initial.width);
          expect(focused.height).toBe(initial.height);
          expect(focused.shadow).toBe(initial.shadow);
          expect(focused.position).toBe(initial.position);
          expect(focused.frameContent).toBe(framework ? '""' : '"consumer badge"');
        });
      }
    );

    it.each(
      (['primary', 'ghost'] as const).flatMap(shape =>
        [false, true].flatMap(circle => [false, true].map(forced => ({ shape, circle, forced })))
      )
    )(
      'keeps the XS $shape spinner inside native focus (circle: $circle, forced: $forced)',
      async ({ shape, circle, forced }) => {
        await withPage(
          { shape, theme, circle, clipped: true, size: 'xs', loading: true },
          async page => {
            await focusInput(page);
            const trigger = page.locator('.rs-uploader-trigger-btn');
            const frame = await appearance(trigger);
            expect(frame.frameContent).toBe('""');
            expect(frame.frameBorder).toBe('2px');
            expectContrast(frame, true, forced);
            const inner = forced
              ? parseFloat(frame.frameOutlineWidth)
              : parseFloat(frame.frameShadow.match(/-?[\d.]+px/g)!.at(-1)!);
            const inset = parseFloat(frame.frameBorder) + inner + parseFloat(frame.frameInset);
            const geometry = await trigger.evaluate(element => {
              const rotor = getComputedStyle(element.querySelector('.rs-btn-spin')!, '::after');
              return {
                clientWidth: element.clientWidth,
                clientHeight: element.clientHeight,
                rotorWidth: parseFloat(rotor.width),
                rotorHeight: parseFloat(rotor.height)
              };
            });
            expect(geometry.rotorWidth + 2 * inset).toBeLessThanOrEqual(geometry.clientWidth);
            expect(geometry.rotorHeight + 2 * inset).toBeLessThanOrEqual(geometry.clientHeight);
          },
          forced
        );
      }
    );
  });
});
