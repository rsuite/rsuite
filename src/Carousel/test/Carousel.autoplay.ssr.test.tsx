import React from 'react';
import { renderToString, version as serverVersion } from 'react-dom/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import CarouselAutoplayFixture from './CarouselAutoplayFixture';

describe('Carousel autoplay SSR hydration', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    expect(typeof document).toBe('undefined');
    expect(serverVersion).toBe(React.version);
    const markup = renderToString(<CarouselAutoplayFixture />);
    source = await createSourceBrowser({
      root: process.cwd(),
      entry: '/src/Carousel/test/Carousel.autoplay.client.tsx',
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (request.url !== '/') return next();
          const html = await server.transformIndexHtml(
            '/',
            `<!doctype html><html><body><div id="root" data-hydrate>${markup}</div><script type="module" src="/src/Carousel/test/Carousel.autoplay.client.tsx"></script></body></html>`
          );
          response.setHeader('Content-Type', 'text/html');
          response.end(html);
        });
      }
    });
    expect(source.reactVersion).toBe(React.version);
    console.info('Carousel autoplay SSR browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: React.version,
      serverVersion
    });
  });
  afterAll(async () => source?.close());

  it.each([
    { reducedMotion: false, interaction: 'none' },
    { reducedMotion: true, interaction: 'none' },
    { reducedMotion: false, interaction: 'focus' },
    { reducedMotion: false, interaction: 'hover' }
  ])(
    'hydrates the same control, reducedMotion: $reducedMotion, interaction: $interaction',
    async ({ reducedMotion, interaction }) => {
      const page = await source.browser.newPage();
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(String(error)));
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text());
      });
      try {
        await page.emulateMedia({ reducedMotion: reducedMotion ? 'reduce' : 'no-preference' });
        const time = new Date('2026-01-01T00:00:00Z');
        await page.clock.install({ time });
        await page.clock.pauseAt(time);
        await page.goto(source.url);
        await expect
          .poll(() => page.evaluate(() => Boolean(window.__RSUITE_CAROUSEL_AUTOPLAY__)))
          .toBe(true);
        const control = await page
          .getByRole('button', { name: 'Stop slide rotation', exact: true })
          .elementHandle();
        expect(control).not.toBeNull();
        if (interaction === 'focus') await page.getByTestId('first-action').focus();
        if (interaction === 'hover') await page.getByTestId('carousel').hover();
        await page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__.hydrate());
        await expect
          .poll(() => page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__.snapshot().ready))
          .toBe(true);
        expect(await page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__.runtime)).toEqual({
          react: React.version,
          reactDOM: serverVersion
        });
        const label =
          reducedMotion || interaction === 'focus' ? 'Start slide rotation' : 'Stop slide rotation';
        await expect
          .poll(() => page.getByRole('button', { name: label, exact: true }).count())
          .toBe(1);
        expect(
          await page
            .getByRole('button', { name: label, exact: true })
            .evaluate((node, original) => node === original, control)
        ).toBe(true);
        await page.clock.runFor(1000);
        expect(await page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__.snapshot())).toEqual({
          ready: true,
          slides: reducedMotion || interaction !== 'none' ? [] : [1],
          errors: []
        });
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );
});
