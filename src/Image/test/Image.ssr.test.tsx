import React from 'react';
import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { chromium, type Browser } from 'playwright';
import react from '@vitejs/plugin-react';
import { createServer, type ViteDevServer } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import ImageHydrationFixture from './ImageHydrationFixture';
import type { HydrationResult } from './ImageHydration.client';

const transparentPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
  'base64'
);

describe('Image SSR hydration', () => {
  let browser: Browser;
  let server: ViteDevServer;
  let serverMarkup: string;
  let serverUrl: string;

  beforeAll(async () => {
    serverMarkup = renderToString(<ImageHydrationFixture />);

    server = await createServer({
      appType: 'custom',
      configFile: false,
      logLevel: 'silent',
      plugins: [tsconfigPaths(), react()],
      root: process.cwd(),
      server: {
        host: '127.0.0.1',
        port: 0
      }
    });

    server.middlewares.use(async (request, response, next) => {
      if (request.url === '/demo.png' || request.url === '/demo@2x.png') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'image/png');
        response.end(transparentPng);
        return;
      }

      if (request.url !== '/') {
        next();
        return;
      }

      const html = await server.transformIndexHtml(
        '/',
        `<!doctype html>
          <html>
            <head><meta charset="UTF-8" /></head>
            <body>
              <div id="root">${serverMarkup}</div>
              <script type="module" src="/src/Image/test/ImageHydration.client.tsx"></script>
            </body>
          </html>`
      );

      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end(html);
    });

    await server.listen();

    const address = server.httpServer?.address() as AddressInfo;
    serverUrl = `http://127.0.0.1:${address.port}`;
    browser = await chromium.launch({ headless: true });
  });

  afterAll(async () => {
    await browser?.close();
    await server?.close();
  });

  it('hydrates without changing Image attributes or reporting errors', async () => {
    expect(serverMarkup).not.toContain('data-rs="box"');
    expect(serverMarkup).not.toMatch(/\brs-box-/);

    const page = await browser.newPage();
    const consoleErrors: string[] = [];

    page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    await page.goto(serverUrl);
    await page.waitForFunction(() => Boolean(window.__RSUITE_HYDRATION_RESULT__));

    const result = await page.evaluate(() => window.__RSUITE_HYDRATION_RESULT__ as HydrationResult);
    const imageAttributes = await page.locator('img').evaluate(image => ({
      className: image.className,
      dataRs: image.getAttribute('data-rs'),
      loading: image.getAttribute('loading'),
      src: image.getAttribute('src'),
      srcSet: image.getAttribute('srcset')
    }));

    expect(result.errors).toEqual([]);
    expect(consoleErrors).toEqual([]);
    expect(result.hydratedMarkup).toBe(result.initialMarkup);
    expect(imageAttributes).toMatchObject({
      dataRs: null,
      loading: 'lazy',
      src: '/demo.png',
      srcSet: '/demo.png 1x, /demo@2x.png 2x'
    });
    expect(imageAttributes.className).not.toMatch(/\brs-box-/);

    await page.close();
  });
});
