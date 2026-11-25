import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from './createSourceBrowser';

describe('Native control styles without a global reset', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../..'),
      entry: '/test/browser/NativeControl.styles.client.tsx'
    });
    console.info('Native control styles browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });

  afterAll(async () => source?.close());

  describe.each(['full', 'no-reset', 'standalone'])('%s styles', styles => {
    it.each(['light', 'dark', 'high-contrast'])(
      'inherits component typography in %s',
      async theme => {
        const page = await source.browser.newPage();
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(String(error)));
        try {
          await page.goto(`${source.url}/#${new URLSearchParams({ styles, theme })}`);
          await page.getByTestId('button').waitFor();
          const snapshot = await page.evaluate(() => {
            const read = (element: Element) => {
              const style = getComputedStyle(element);
              return {
                family: style.fontFamily,
                size: style.fontSize,
                weight: style.fontWeight,
                lineHeight: style.lineHeight,
                color: style.color
              };
            };
            const get = (id: string) => read(document.querySelector(`[data-testid="${id}"]`)!);
            return {
              button: get('button'),
              span: get('span'),
              anchor: get('anchor'),
              input: get('input'),
              textarea: get('textarea'),
              disabled: get('disabled'),
              override: get('override'),
              inline: get('inline'),
              tags: Array.from(document.querySelectorAll('.rs-tag'), tag => ({
                tag: read(tag),
                close: read(tag.querySelector('button')!),
                icon: read(tag.querySelector('svg')!)
              })),
              raw: window.__RSUITE_NATIVE_STYLES__
            };
          });
          expect(snapshot.button.family).toBe('monospace');
          expect(snapshot.button).toEqual(snapshot.span);
          expect(snapshot.button).toEqual(snapshot.anchor);
          expect(snapshot.button.size).toBe('14px');
          expect(snapshot.button.weight).toBe('400');
          expect(snapshot.disabled.family).toBe('monospace');
          expect(snapshot.input.family).toBe('monospace');
          expect(snapshot.textarea.family).toBe('monospace');
          expect(snapshot.input.size).toBe('14px');
          expect(snapshot.textarea.size).toBe('14px');
          for (const { tag, close, icon } of snapshot.tags) {
            expect(close.family).toBe(tag.family);
            expect(close.size).toBe(tag.size);
            expect(close.weight).toBe(tag.weight);
            expect(close.color).toBe(tag.color);
            expect(icon.color).toBe(tag.color);
          }
          expect(snapshot.override.family).toBe('serif');
          expect(snapshot.override.size).toBe('21px');
          expect(snapshot.override.color).toBe('rgb(123, 45, 67)');
          expect(snapshot.inline.family).toBe('serif');
          expect(snapshot.inline.color).toBe('rgb(123, 45, 67)');
          if (styles !== 'full') {
            expect(snapshot.raw.after.slice(0, 4)).toEqual(snapshot.raw.before.slice(0, 4));
            // Preserve the browser's disabled color while normalizing its font.
            expect(snapshot.raw.after[4][1]).toBe(snapshot.raw.before[4][1]);
          }
          expect(errors).toEqual([]);
        } finally {
          await page.close();
        }
      }
    );
  });
});
