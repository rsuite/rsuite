import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Locator } from 'playwright';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

declare global {
  interface Window {
    __RSUITE_STYLE_VIOLATIONS__: string[];
  }
}

const appearances = ['default', 'primary', 'subtle', 'ghost', 'link'];
const cases = ['light', 'dark', 'high-contrast'].flatMap(theme =>
  [false, true].map(rtl => ({ theme, rtl }))
);
const read = (target: Locator) =>
  target.evaluate(node => {
    const style = getComputedStyle(node);
    return {
      color: style.color,
      background: style.backgroundColor,
      borders: [
        style.borderTopColor,
        style.borderRightColor,
        style.borderBottomColor,
        style.borderLeftColor
      ],
      borderWidth: style.borderTopWidth,
      padding: [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft],
      fontSize: style.fontSize,
      radius: style.borderTopLeftRadius
    };
  });
const expected = (changed = false) => ({
  color: changed ? 'rgb(69, 103, 137)' : 'rgb(18, 52, 86)',
  background: 'rgb(35, 69, 103)',
  borders: Array(4).fill('rgb(52, 86, 120)'),
  borderWidth: '3px',
  padding: Array(4).fill('17px'),
  fontSize: '19px',
  radius: '7px'
});

describe('native explicit style properties', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
      entry: '/src/internals/styled-system/test/precedence.native.client.tsx',
      hmr: false,
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (request.url !== '/') return next();
          response.setHeader(
            'Content-Security-Policy',
            "style-src 'nonce-style-props-test'; style-src-attr 'none'"
          );
          response.setHeader('Content-Type', 'text/html');
          response.end(
            await server.transformIndexHtml(
              '/',
              '<!doctype html><html><head><meta property="csp-nonce" nonce="style-props-test"><style nonce="style-props-test">.priority-important { color: rgb(45, 67, 89) !important; }</style></head><body><div id="root"></div><script type="module" src="/src/internals/styled-system/test/precedence.native.client.tsx"></script></body></html>'
            )
          );
        });
      }
    });
    console.info(
      'Style properties native runtime',
      source.browserName,
      source.browser.version(),
      source.reactVersion
    );
  });
  afterAll(async () => source?.close());
  const open = async (options = '') => {
    const page = await source.browser.newPage({
      viewport: { width: 1280, height: 900 },
      reducedMotion: 'reduce'
    });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.addInitScript(() => {
      window.__RSUITE_STYLE_VIOLATIONS__ = [];
      document.addEventListener('securitypolicyviolation', event =>
        window.__RSUITE_STYLE_VIOLATIONS__.push(event.violatedDirective)
      );
    });
    const response = await page.goto(source.url + '/#' + options);
    expect(response?.headers()['content-security-policy']).toContain(
      "style-src 'nonce-style-props-test'"
    );
    const runtime = page.getByTestId('runtime');
    await runtime.waitFor({ state: 'attached' });
    expect(await runtime.getAttribute('data-react')).toBe(source.reactVersion);
    expect(await runtime.getAttribute('data-react-dom')).toBe(source.reactVersion);
    expect(await runtime.getAttribute('data-options')).toBe(
      new URLSearchParams(options).toString()
    );
    expect(
      await page
        .locator('style[data-rs-style-manager]')
        .evaluate(node => (node as HTMLStyleElement).nonce)
    ).toBe('style-props-test');
    return { page, errors };
  };

  it.each(cases)(
    'preserves explicit values through native states ($theme/rtl=$rtl)',
    async ({ theme, rtl }) => {
      const { page, errors } = await open(`theme=${theme}${rtl ? '&rtl' : ''}`);
      try {
        for (const appearance of appearances) {
          const actual = page.getByTestId(`actual-${appearance}`);
          const reference = page.getByTestId(`reference-${appearance}`);
          expect(await read(actual)).toEqual(expected());
          expect(await read(reference)).toEqual(expected());
          for (const target of [actual, reference]) {
            await target.hover();
            expect(await read(target)).toEqual(expected());
            await page.mouse.down();
            expect(await read(target)).toEqual(expected());
            await page.mouse.up();
          }
          await page.getByTestId(`before-${appearance}`).click();
          await page.keyboard.press('Tab');
          expect(await actual.evaluate(node => node === document.activeElement)).toBe(true);
          expect(await read(actual)).toEqual(expected());
          await page.keyboard.press('Tab');
          expect(await reference.evaluate(node => node === document.activeElement)).toBe(true);
          expect(await read(reference)).toEqual(expected());
        }
        expect(await page.evaluate(() => window.__RSUITE_STYLE_VIOLATIONS__)).toEqual([]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it.each(['disabled', 'loading'])('preserves values in %s controls', async mode => {
    const { page, errors } = await open('theme=high-contrast&' + mode);
    try {
      for (const appearance of appearances) {
        const actual = page.getByTestId(`actual-${appearance}`);
        expect(await actual.getAttribute('aria-disabled')).toBe('true');
        if (mode === 'disabled') expect(await actual.isDisabled()).toBe(true);
        else expect(await actual.getAttribute('aria-busy')).toBe('true');
        // Loading hides text with !important, including text styled through native style.
        const stateStyle = {
          ...expected(),
          ...(mode === 'loading' ? { color: 'rgba(0, 0, 0, 0)' } : {})
        };
        expect(await read(actual)).toEqual(stateStyle);
        expect(await read(page.getByTestId(`reference-${appearance}`))).toEqual(stateStyle);
      }
      expect(await page.evaluate(() => window.__RSUITE_STYLE_VIOLATIONS__)).toEqual([]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it('updates responsive values and preserves inline and important priority under CSP', async () => {
    const { page, errors } = await open();
    try {
      for (const width of [1280, 375, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        const responsive = page.getByTestId('responsive');
        expect(await responsive.evaluate(node => getComputedStyle(node).color)).toBe(
          width >= 992 ? 'rgb(69, 103, 137)' : 'rgb(18, 52, 86)'
        );
        expect(await responsive.evaluate(node => getComputedStyle(node).paddingTop)).toBe(
          width >= 992 ? '19px' : '5px'
        );
        expect(
          await page.getByTestId('hidden').evaluate(node => getComputedStyle(node).display)
        ).toBe(width >= 992 ? 'none' : 'block');
      }
      expect(await page.getByTestId('inline').evaluate(node => getComputedStyle(node).color)).toBe(
        'rgb(35, 69, 103)'
      );
      expect(
        await page.getByTestId('important').evaluate(node => getComputedStyle(node).color)
      ).toBe('rgb(45, 67, 89)');
      expect(await page.evaluate(() => window.__RSUITE_STYLE_VIOLATIONS__)).toEqual([]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it('updates and removes escaped instance rules in StrictMode', async () => {
    const { page, errors } = await open('prefix=' + encodeURIComponent('dialog.[section]/'));
    try {
      expect(await read(page.getByTestId('actual-primary'))).toEqual(expected());
      await page.getByTestId('update').click();
      expect(await read(page.getByTestId('actual-primary'))).toEqual(expected(true));
      expect(await read(page.getByTestId('reference-primary'))).toEqual(expected(true));
      await page.getByTestId('unmount').click();
      await page.getByTestId('runtime').waitFor({ state: 'detached' });
      expect(await page.locator('style[data-rs-style-manager]').textContent()).toBe('');
      expect(await page.evaluate(() => window.__RSUITE_STYLE_VIOLATIONS__)).toEqual([]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
