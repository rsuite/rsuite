import React from 'react';
import { renderToString } from 'react-dom/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';
import RootStyleFixture, { type RootStyleSpec } from './identifiers.fixture';

const cases = [
  { name: 'colon namespaces', prefixes: ['account:', 'account'] },
  { name: 'whitespace and literal markers', prefixes: ['account ', 'account%20%'] }
];
const createSpecs = (prefixes: string[]): RootStyleSpec[] => [
  { id: 'first', prefix: prefixes[0], color: '#123456', padding: 7 },
  { id: 'second', prefix: prefixes[1], color: '#654321', padding: 13 }
];
const read = (page: Page, id: string) =>
  page.getByTestId(id).evaluate(node => {
    const style = getComputedStyle(node);
    return { color: style.color, padding: style.paddingTop };
  });

describe('hydrated style root identifiers', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    if (process.env.VITE_RSUITE_REACT_VERSION) {
      expect(React.version).toBe(process.env.VITE_RSUITE_REACT_VERSION);
    }
    const documents = cases.map(({ prefixes }) => {
      const specs = createSpecs(prefixes);
      const roots = specs
        .map(
          spec =>
            `<div id="root-${spec.id}">${renderToString(<RootStyleFixture spec={spec} />, {
              identifierPrefix: spec.prefix
            })}</div>`
        )
        .join('');
      const config = JSON.stringify(specs).replace(/</g, '\\u003c');
      return `<!doctype html><html><head><meta property="csp-nonce" nonce="style-identifiers-test"></head><body>${roots}<script id="root-config" type="application/json">${config}</script><script type="module" src="/src/internals/styled-system/test/identifiers.client.tsx"></script></body></html>`;
    });
    source = await createSourceBrowser({
      root: process.cwd(),
      entry: '/src/internals/styled-system/test/identifiers.client.tsx',
      hmr: false,
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          const url = new URL(request.url || '/', 'http://localhost');
          if (url.pathname !== '/' || !url.searchParams.has('case')) return next();
          const document = documents[Number(url.searchParams.get('case'))];
          if (document === undefined) return next();
          response.setHeader(
            'Content-Security-Policy',
            "style-src 'nonce-style-identifiers-test'; style-src-attr 'none'"
          );
          response.setHeader('Content-Type', 'text/html');
          response.end(await server.transformIndexHtml('/', document));
        });
      }
    });
    expect(source.reactVersion).toBe(React.version);
  });
  afterAll(async () => source?.close());

  const open = async (index: number) => {
    const page = await source.browser.newPage({ viewport: { width: 1280, height: 800 } });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    const response = await page.goto(source.url + '/?case=' + index);
    expect(response?.headers()['content-security-policy']).toContain(
      "style-src 'nonce-style-identifiers-test'"
    );
    await expect
      .poll(() => page.evaluate(() => typeof window.__RSUITE_STYLE_ROOTS__))
      .toBe('object');
    const firstNode = await page.getByTestId('first').elementHandle();
    const secondNode = await page.getByTestId('second').elementHandle();
    await page.evaluate(() => window.__RSUITE_STYLE_ROOTS__.hydrate());
    for (const id of ['first', 'second']) {
      await expect.poll(() => page.getByTestId(id).getAttribute('data-ready')).toBe('true');
      expect(await page.getByTestId(id).getAttribute('data-react')).toBe(source.reactVersion);
      expect(await page.getByTestId(id).getAttribute('data-react-dom')).toBe(source.reactVersion);
    }
    expect(
      await page.getByTestId('first').evaluate((node, before) => node === before, firstNode)
    ).toBe(true);
    expect(
      await page.getByTestId('second').evaluate((node, before) => node === before, secondNode)
    ).toBe(true);
    expect(await page.getByTestId('first').getAttribute('data-raw-id')).not.toBe(
      await page.getByTestId('second').getAttribute('data-raw-id')
    );
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => window.__RSUITE_STYLE_ROOTS__.errors)).toEqual([]);
    return { page, errors };
  };

  it.each(cases.map((scenario, index) => ({ ...scenario, index })))(
    'keeps styles independent through hydration and updates ($name)',
    async ({ index }) => {
      const { page, errors } = await open(index);
      try {
        expect(await read(page, 'first')).toEqual({ color: 'rgb(18, 52, 86)', padding: '17px' });
        expect(await read(page, 'second')).toEqual({ color: 'rgb(101, 67, 33)', padding: '23px' });
        expect(await page.getByTestId('first').getAttribute('class')).not.toBe(
          await page.getByTestId('second').getAttribute('class')
        );
        await page.evaluate(() =>
          window.__RSUITE_STYLE_ROOTS__.update('first', { color: '#234567', padding: 11 })
        );
        await expect
          .poll(() => read(page, 'first'))
          .toEqual({
            color: 'rgb(35, 69, 103)',
            padding: '21px'
          });
        expect(await read(page, 'second')).toEqual({ color: 'rgb(101, 67, 33)', padding: '23px' });
        expect(await page.evaluate(() => window.__RSUITE_STYLE_ROOTS__.ruleCount())).toBe(4);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it.each(cases.map((scenario, index) => ({ ...scenario, index })))(
    'retains the other root styles after unmount ($name)',
    async ({ index }) => {
      const { page, errors } = await open(index);
      try {
        await page.evaluate(() => window.__RSUITE_STYLE_ROOTS__.unmount('first'));
        expect(await read(page, 'second')).toEqual({ color: 'rgb(101, 67, 33)', padding: '23px' });
        expect(await page.evaluate(() => window.__RSUITE_STYLE_ROOTS__.ruleCount())).toBe(2);
        await page.evaluate(() => window.__RSUITE_STYLE_ROOTS__.unmount('second'));
        expect(await page.evaluate(() => window.__RSUITE_STYLE_ROOTS__.ruleCount())).toBe(0);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );
});
