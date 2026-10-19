import React, { StrictMode } from 'react';
import { renderToString, version as serverVersion } from 'react-dom/server';
import { expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import CarouselSemanticsFixture from './CarouselSemanticsFixture';

it('hydrates carousel and slide groups without replacing their content', async () => {
  expect(typeof document).toBe('undefined');
  expect(serverVersion).toBe(React.version);
  const markup = renderToString(
    <StrictMode>
      <CarouselSemanticsFixture />
    </StrictMode>
  );
  const source = await createSourceBrowser({
    root: process.cwd(),
    entry: '/src/Carousel/test/Carousel.semantics.client.tsx',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (request.url !== '/') return next();
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(
          await server.transformIndexHtml(
            '/',
            `<!doctype html><html><body><div id="root" data-hydrate>${markup}</div><script type="module" src="/src/Carousel/test/Carousel.semantics.client.tsx"></script></body></html>`
          )
        );
      });
    }
  });
  const errors: string[] = [];
  try {
    const page = await source.browser.newPage();
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    console.info('Carousel semantics SSR browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: React.version,
      serverVersion
    });
    expect(source.reactVersion).toBe(React.version);
    await page.goto(source.url);
    await expect
      .poll(() => page.evaluate(() => Boolean(window.__RSUITE_CAROUSEL_SEMANTICS__)))
      .toBe(true);
    const carousel = page.getByRole('group', { name: 'Destinations', exact: true });
    const slide = page.getByRole('group', { name: '1 of 3', exact: true });
    const originalSlide = await slide.elementHandle();
    const originalImage = await page.getByRole('img', { name: 'Lake' }).elementHandle();
    expect(originalSlide).not.toBeNull();
    expect(await carousel.getAttribute('aria-roledescription')).toBe('carousel');
    expect(await slide.getAttribute('aria-roledescription')).toBe('slide');
    await page.evaluate(() => window.__RSUITE_CAROUSEL_SEMANTICS__.hydrate());
    await expect
      .poll(() => page.evaluate(() => window.__RSUITE_CAROUSEL_SEMANTICS__.snapshot().ready))
      .toBe(true);
    expect(await page.evaluate(() => window.__RSUITE_CAROUSEL_SEMANTICS__.runtime)).toEqual({
      react: React.version,
      reactDOM: serverVersion
    });
    expect(await slide.evaluate((node, original) => node === original, originalSlide)).toBe(true);
    expect(
      await page
        .getByRole('img', { name: 'Lake' })
        .evaluate((node, original) => node === original, originalImage)
    ).toBe(true);
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    expect(await page.getByRole('radio', { name: 'City skyline', exact: true }).isChecked()).toBe(
      true
    );
    expect(await page.getByRole('group', { name: 'City skyline', exact: true }).count()).toBe(1);
    expect(await page.getByRole('group', { name: '1 of 3', exact: true }).count()).toBe(0);
    expect(await page.evaluate(() => window.__RSUITE_CAROUSEL_SEMANTICS__.snapshot())).toEqual({
      ready: true,
      errors: []
    });
    expect(errors).toEqual([]);
  } finally {
    await source.close();
  }
});
