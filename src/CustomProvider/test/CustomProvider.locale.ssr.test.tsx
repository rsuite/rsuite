import React from 'react';
import { renderToString, version as serverVersion } from 'react-dom/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import DefaultLocaleFixture from './DefaultLocaleFixture';

describe('CustomProvider default locale SSR', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    expect(typeof document).toBe('undefined');
    expect(serverVersion).toBe(React.version);
    const markup = renderToString(<DefaultLocaleFixture />);
    source = await createSourceBrowser({
      root: process.cwd(),
      entry: '/src/CustomProvider/test/CustomProvider.locale.client.tsx',
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (request.url !== '/') return next();
          const html = await server.transformIndexHtml(
            '/',
            `<!doctype html><html><body><div id="root" data-hydrate>${markup}</div><script type="module" src="/src/CustomProvider/test/CustomProvider.locale.client.tsx"></script></body></html>`
          );
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(html);
        });
      }
    });
    expect(source.reactVersion).toBe(React.version);
    console.info('CustomProvider default locale SSR browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: React.version,
      serverVersion
    });
  });
  afterAll(async () => source?.close());

  it('renders configured names on the server and hydrates before trusted interaction', async () => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_DEFAULT_LOCALE__));
      expect(await page.evaluate(() => window.__RSUITE_DEFAULT_LOCALE__.snapshot().ready)).toBe(
        false
      );
      expect(await page.evaluate(() => window.__RSUITE_DEFAULT_LOCALE__.runtime)).toEqual({
        react: React.version,
        reactDOM: serverVersion
      });
      expect(await page.getByRole('switch', { name: 'Default on 1', exact: true }).count()).toBe(1);
      expect(await page.getByRole('button', { name: 'Default next 1', exact: true }).count()).toBe(
        1
      );
      expect(await page.getByRole('button', { name: 'Show folders 1', exact: true }).count()).toBe(
        1
      );
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
      await page.evaluate(() => window.__RSUITE_DEFAULT_LOCALE__.hydrate());
      await page.waitForFunction(() => window.__RSUITE_DEFAULT_LOCALE__.snapshot().ready);
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
      await page.getByRole('switch', { name: 'Default on 1', exact: true }).press('Space');
      await page.getByRole('button', { name: 'Default next 1', exact: true }).click();
      expect(
        await page.getByRole('switch', { name: 'Default off 1', exact: true }).isChecked()
      ).toBe(false);
      expect(await page.getByTestId('page').textContent()).toBe('2');
      expect(await page.evaluate(() => window.__RSUITE_DEFAULT_LOCALE__.snapshot())).toEqual({
        ready: true,
        errors: [],
        actions: [
          { control: 'toggle', value: false, trusted: true },
          { control: 'page', value: 2 }
        ]
      });
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
