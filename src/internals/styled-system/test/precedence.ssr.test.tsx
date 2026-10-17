import React, { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { afterAll, beforeAll, expect, it } from 'vitest';
import Button from '@/Button';
import { StyleManager } from '../style-manager';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';
import Fixture from './precedence.native.fixture';

it.each(['', 'dialog.[section]/'])(
  'renders style props without DOM or CSS globals (prefix=%s)',
  identifierPrefix => {
    expect(typeof document).toBe('undefined');
    expect(typeof CSS).toBe('undefined');
    const markup = renderToString(
      <StrictMode>
        <Button c="#123456" p={{ xs: '5px', md: '19px' }}>
          Save
        </Button>
      </StrictMode>,
      { identifierPrefix }
    );
    expect(markup).toContain('Save');
    expect(markup).toContain('rs-box-');
    expect(StyleManager.styleMap.size).toBe(0);
    expect(StyleManager.styleElement).toBe(null);
  }
);

const cases = ['light', 'dark', 'high-contrast'].flatMap(theme =>
  [false, true].map(rtl =>
    new URLSearchParams({
      theme,
      ...(rtl ? { rtl: '' } : {}),
      prefix: 'dialog.[section]/',
      hydrate: ''
    }).toString()
  )
);
let source: Awaited<ReturnType<typeof createSourceBrowser>>;
beforeAll(async () => {
  const documents = cases.map(options =>
    renderToString(
      <StrictMode>
        <Fixture options={new URLSearchParams(options)} onUnmount={() => {}} />
      </StrictMode>,
      { identifierPrefix: 'dialog.[section]/' }
    )
  );
  documents.forEach(markup => expect(markup).not.toContain(' style='));
  expect(StyleManager.styleMap.size).toBe(0);
  source = await createSourceBrowser({
    root: process.cwd(),
    entry: '/src/internals/styled-system/test/precedence.native.client.tsx',
    hmr: false,
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const url = new URL(request.url || '/', 'http://localhost');
        if (url.pathname !== '/' || !url.searchParams.has('case')) return next();
        const markup = documents[Number(url.searchParams.get('case'))];
        if (markup === undefined) return next();
        response.setHeader(
          'Content-Security-Policy',
          "style-src 'nonce-style-props-test'; style-src-attr 'none'"
        );
        response.setHeader('Content-Type', 'text/html');
        response.end(
          await server.transformIndexHtml(
            '/',
            `<!doctype html><html><head><meta property="csp-nonce" nonce="style-props-test"><style nonce="style-props-test">.priority-important { color: rgb(45, 67, 89) !important; }</style></head><body><div id="root">${markup}</div><script type="module" src="/src/internals/styled-system/test/precedence.native.client.tsx"></script></body></html>`
          )
        );
      });
    }
  });
  expect(source.reactVersion).toBe(React.version);
});
afterAll(async () => source?.close());

it.each(cases.map((options, index) => ({ options, index })))(
  'hydrates escaped style rules without replacing nodes ($options)',
  async ({ options, index }) => {
    const page = await source.browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      await page.goto(source.url + '/?case=' + index + '#' + options);
      await expect
        .poll(() => page.evaluate(() => typeof window.__RSUITE_STYLE_HYDRATE__))
        .toBe('function');
      const target = page.getByTestId('actual-primary');
      const before = await target.elementHandle();
      expect(await page.getByTestId('runtime').getAttribute('data-ready')).toBe('false');
      await page.evaluate(() => window.__RSUITE_STYLE_HYDRATE__());
      await expect.poll(() => page.getByTestId('runtime').getAttribute('data-ready')).toBe('true');
      expect(await page.getByTestId('runtime').getAttribute('data-react')).toBe(React.version);
      expect(await page.getByTestId('runtime').getAttribute('data-react-dom')).toBe(React.version);
      expect(errors).toEqual([]);
      expect(await target.evaluate((node, original) => node === original, before)).toBe(true);
      await target.evaluate(node =>
        Promise.all(node.getAnimations().map(animation => animation.finished))
      );
      expect(await target.evaluate(node => getComputedStyle(node).color)).toBe('rgb(18, 52, 86)');
      expect(await target.evaluate(node => getComputedStyle(node).borderTopColor)).toBe(
        'rgb(52, 86, 120)'
      );
      expect(
        await page.getByTestId('responsive').evaluate(node => getComputedStyle(node).paddingTop)
      ).toBe('19px');
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  }
);
