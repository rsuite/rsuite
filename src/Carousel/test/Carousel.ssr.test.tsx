import React from 'react';
import { renderToString, version as serverVersion } from 'react-dom/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import CarouselHydrationFixture from './CarouselHydrationFixture';
import type { CarouselHydrationResult } from './CarouselHydration.client';

describe('Carousel SSR hydration', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;

  beforeAll(async () => {
    expect(typeof document).toBe('undefined');
    expect(serverVersion).toBe(React.version);
    const markup = renderToString(<CarouselHydrationFixture />);
    source = await createSourceBrowser({
      root: process.cwd(),
      entry: '/src/Carousel/test/CarouselHydration.client.tsx',
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (request.url !== '/') return next();
          const html = await server.transformIndexHtml(
            '/',
            `<!doctype html><html><body><div id="root">${markup}</div><script type="module" src="/src/Carousel/test/CarouselHydration.client.tsx"></script></body></html>`
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
    console.info('Carousel SSR hydration browser', {
      name: source.browserName,
      version: source.browser.version(),
      reactVersion: React.version,
      serverVersion
    });
  });

  afterAll(async () => {
    await source?.close();
  });

  it('hydrates separate Carousels with stable indicator associations and native selection', async () => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', error => errors.push(String(error)));

    try {
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_CAROUSEL_HYDRATION_RESULT__));
      const result = await page.evaluate(
        () => window.__RSUITE_CAROUSEL_HYDRATION_RESULT__ as CarouselHydrationResult
      );
      expect(result.errors).toEqual([]);
      expect(errors).toEqual([]);
      expect(result.reactVersion).toBe(React.version);
      expect(result.reactDOMVersion).toBe(serverVersion);

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

      await page.getByTestId('first-carousel').locator('input[type="radio"]').first().click();
      await page.waitForFunction(
        () => window.__RSUITE_CAROUSEL_HYDRATION_RESULT__?.selections.length === 1
      );
      expect(await page.getByText('First slide A').getAttribute('aria-hidden')).toBe('false');
      expect(await page.getByText('First slide B').getAttribute('aria-hidden')).toBe('true');
      expect(await page.getByText('Second slide A').getAttribute('aria-hidden')).toBe('false');
      expect(await page.getByText('Second slide B').getAttribute('aria-hidden')).toBe('true');
      expect(
        await page.evaluate(() => window.__RSUITE_CAROUSEL_HYDRATION_RESULT__?.selections)
      ).toEqual([{ carousel: 'first', index: 0, trusted: true }]);
      expect(
        await page
          .locator('input[type="radio"]')
          .evaluateAll(inputs => inputs.map(input => input.id))
      ).toEqual(ids);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
