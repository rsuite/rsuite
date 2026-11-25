import React from 'react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { renderToString, version as serverVersion } from 'react-dom/server';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import ImageHydrationFixture from './ImageHydrationFixture';
import type { HydrationResult } from './ImageHydration.client';

const transparentPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
  'base64'
);

describe('Image SSR hydration', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  let serverMarkup: string;

  beforeAll(async () => {
    expect(typeof document).toBe('undefined');
    expect(serverVersion).toBe(React.version);
    serverMarkup = renderToString(<ImageHydrationFixture />);
    source = await createSourceBrowser({
      root: process.cwd(),
      entry: '/src/Image/test/ImageHydration.client.tsx',
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (request.url === '/demo.png' || request.url === '/demo@2x.png') {
            response.setHeader('Content-Type', 'image/png');
            response.end(transparentPng);
            return;
          }
          if (request.url !== '/') return next();
          const html = await server.transformIndexHtml(
            '/',
            `<!doctype html><html><head><meta charset="UTF-8" /></head><body><div id="root">${serverMarkup}</div><script type="module" src="/src/Image/test/ImageHydration.client.tsx"></script></body></html>`
          );
          response.setHeader('Content-Type', 'text/html');
          response.end(html);
        });
      }
    });
    expect(source.reactVersion).toBe(React.version);
    if (process.env.VITE_RSUITE_REACT_VERSION) {
      expect(React.version).toBe(process.env.VITE_RSUITE_REACT_VERSION);
    }
    console.info('Image SSR hydration browser', {
      name: source.browserName,
      version: source.browser.version(),
      reactVersion: React.version,
      serverVersion
    });
  });

  afterAll(async () => {
    await source?.close();
  });

  it('hydrates without changing Image attributes or reporting errors', async () => {
    expect(serverMarkup).not.toContain('data-rs="box"');
    expect(serverMarkup).not.toMatch(/\brs-box-/);
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', error => errors.push(String(error)));

    try {
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_HYDRATION_RESULT__));
      const result = await page.evaluate(
        () => window.__RSUITE_HYDRATION_RESULT__ as HydrationResult
      );
      const imageAttributes = await page.locator('img').evaluate(image => ({
        className: image.className,
        dataRs: image.getAttribute('data-rs'),
        loading: image.getAttribute('loading'),
        src: image.getAttribute('src'),
        srcSet: image.getAttribute('srcset')
      }));
      expect(result.errors).toEqual([]);
      expect(errors).toEqual([]);
      expect(result.reactVersion).toBe(React.version);
      expect(result.reactDOMVersion).toBe(serverVersion);
      expect(result.hydratedMarkup).toBe(result.initialMarkup);
      expect(imageAttributes).toMatchObject({
        dataRs: null,
        loading: 'lazy',
        src: '/demo.png',
        srcSet: '/demo.png 1x, /demo@2x.png 2x'
      });
      expect(imageAttributes.className).not.toMatch(/\brs-box-/);
    } finally {
      await page.close();
    }
  });
});
