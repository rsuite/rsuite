import React from 'react';
import type { AddressInfo } from 'node:net';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { chromium, type Browser } from 'playwright';
import react from '@vitejs/plugin-react';
import { createServer, type ViteDevServer } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import CarouselHydrationFixture from './CarouselHydrationFixture';
import type { CarouselHydrationResult } from './CarouselHydration.client';

describe('Carousel SSR hydration', () => {
  let browser: Browser;
  let server: ViteDevServer;
  let serverUrl: string;
  let cacheDir: string;

  beforeAll(async () => {
    const serverMarkup = renderToString(<CarouselHydrationFixture />);
    cacheDir = await mkdtemp(join(tmpdir(), 'rsuite-carousel-hydration-'));

    server = await createServer({
      appType: 'custom',
      configFile: false,
      logLevel: 'silent',
      cacheDir: join(cacheDir, 'node_modules/.vite'),
      define: { __DEV__: true },
      plugins: [tsconfigPaths(), react()],
      resolve: { dedupe: ['react', 'react-dom'] },
      root: process.cwd(),
      server: { host: '127.0.0.1', port: 0 }
    });

    server.middlewares.use(async (request, response, next) => {
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
              <script type="module" src="/src/Carousel/test/CarouselHydration.client.tsx"></script>
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
    if (cacheDir) {
      await rm(cacheDir, { recursive: true, force: true });
    }
  });

  it('hydrates separate Carousels with stable indicator associations and selection', async () => {
    const page = await browser.newPage();
    const consoleErrors: string[] = [];
    page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    await page.goto(serverUrl);
    await page.waitForFunction(() => Boolean(window.__RSUITE_CAROUSEL_HYDRATION_RESULT__));

    const result = await page.evaluate(
      () => window.__RSUITE_CAROUSEL_HYDRATION_RESULT__ as CarouselHydrationResult
    );
    expect(result.errors).toEqual([]);
    expect(consoleErrors).toEqual([]);
    expect(result.reactVersion).toBe(React.version);

    const indicators = await page.locator('input[type="radio"]').evaluateAll(inputs =>
      inputs.map(input => {
        const label = input.parentElement?.querySelector('label');
        return {
          id: input.id,
          name: input.getAttribute('name'),
          htmlFor: label?.htmlFor,
          associated: label?.control === input
        };
      })
    );
    const ids = indicators.map(indicator => indicator.id);
    expect(indicators).toEqual(result.initialIndicators);
    expect(indicators).toHaveLength(4);
    expect(new Set(ids).size).toBe(4);
    indicators.forEach(indicator => {
      expect(indicator.id).not.toBe('');
      expect(indicator.name).toBe(indicator.id);
      expect(indicator.htmlFor).toBe(indicator.id);
      expect(indicator.associated).toBe(true);
    });

    await page
      .getByTestId('first-carousel')
      .locator('label')
      .first()
      .evaluate(label => (label as HTMLLabelElement).click());
    await page.waitForFunction(
      () =>
        document
          .querySelector('[data-testid="first-carousel"] .rs-carousel-slider-item')
          ?.getAttribute('aria-hidden') === 'false'
    );

    expect(await page.getByText('First slide A').getAttribute('aria-hidden')).toBe('false');
    expect(await page.getByText('First slide B').getAttribute('aria-hidden')).toBe('true');
    expect(await page.getByText('Second slide A').getAttribute('aria-hidden')).toBe('false');
    expect(await page.getByText('Second slide B').getAttribute('aria-hidden')).toBe('true');
    expect(
      await page.locator('input[type="radio"]').evaluateAll(inputs => inputs.map(input => input.id))
    ).toEqual(ids);

    await page.close();
  });
});
