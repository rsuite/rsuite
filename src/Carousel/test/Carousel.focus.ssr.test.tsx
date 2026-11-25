import React from 'react';
import { renderToString, version as serverVersion } from 'react-dom/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import CarouselFocusFixture from './CarouselFocusFixture';

describe('Carousel inactive content SSR focus', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    expect(typeof document).toBe('undefined');
    expect(serverVersion).toBe(React.version);
    const markup = renderToString(<CarouselFocusFixture />);
    source = await createSourceBrowser({
      root: process.cwd(),
      entry: '/src/Carousel/test/Carousel.focus.client.tsx',
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (request.url !== '/') return next();
          const html = await server.transformIndexHtml(
            '/',
            `<!doctype html><html><body><div id="root" data-hydrate>${markup}</div><script type="module" src="/src/Carousel/test/Carousel.focus.client.tsx"></script></body></html>`
          );
          response.setHeader('Content-Type', 'text/html');
          response.end(html);
        });
      }
    });
    expect(source.reactVersion).toBe(React.version);
    console.info('Carousel content focus SSR browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: React.version,
      serverVersion
    });
  });
  afterAll(async () => source?.close());
  it('excludes hidden content before hydration and restores it after native selection', async () => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_CAROUSEL_FOCUS__));
      expect(await page.evaluate(() => window.__RSUITE_CAROUSEL_FOCUS__.runtime)).toEqual({
        react: React.version,
        reactDOM: serverVersion
      });
      expect(await page.evaluate(() => window.__RSUITE_CAROUSEL_FOCUS__.snapshot().ready)).toBe(
        false
      );
      await page.getByTestId('before').focus();
      await page.getByTestId('second-input').evaluate(node => node.focus());
      expect(
        await page.getByTestId('before').evaluate(node => document.activeElement === node)
      ).toBe(true);
      const snapshot = () =>
        page.locator('#root').evaluate(root => {
          const describe = (node: Node): unknown =>
            node instanceof Element
              ? {
                  tag: node.tagName,
                  attributes: Array.from(node.attributes, ({ name, value }) => [
                    name,
                    value
                  ]).sort(),
                  children: Array.from(node.childNodes, describe)
                }
              : { type: node.nodeType, value: node.nodeValue };
          return describe(root);
        });
      const markup = await snapshot();
      const initialNodes = await page
        .locator('#root')
        .evaluateHandle(root => [root, ...root.querySelectorAll('*')]);
      await page.evaluate(() => window.__RSUITE_CAROUSEL_FOCUS__.hydrate());
      await page.waitForFunction(() => window.__RSUITE_CAROUSEL_FOCUS__.snapshot().ready);
      // React 18 can reorder checked/value attributes while retaining the same input node.
      expect(await snapshot()).toEqual(markup);
      expect(
        await page.evaluate(nodes => {
          const root = document.getElementById('root')!;
          const current = [root, ...root.querySelectorAll('*')];
          return (
            nodes.length === current.length && nodes.every((node, index) => node === current[index])
          );
        }, initialNodes)
      ).toBe(true);
      await initialNodes.dispose();
      const indicators = page.getByTestId('carousel').locator('input[type="radio"]');
      await indicators.first().focus();
      await page.keyboard.press('ArrowRight');
      await expect
        .poll(() => page.getByTestId('second-slide').getAttribute('aria-hidden'))
        .toBe('false');
      await page.keyboard.press('Shift+Tab');
      expect(
        await page.getByTestId('second-editable').evaluate(node => document.activeElement === node)
      ).toBe(true);
      await page.getByTestId('first-input').evaluate(node => node.focus());
      expect(
        await page.getByTestId('second-editable').evaluate(node => document.activeElement === node)
      ).toBe(true);
      expect(await page.evaluate(() => window.__RSUITE_CAROUSEL_FOCUS__.snapshot())).toEqual({
        ready: true,
        selections: [{ index: 1, trusted: true }],
        errors: []
      });
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
