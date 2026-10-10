import React, { StrictMode } from 'react';
import { renderToString, version as serverVersion } from 'react-dom/server';
import { expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import SliderInputFixture from './SliderInputFixture';

it.each([false, true])('hydrates the original native slider inputs, range: %s', async range => {
  expect(typeof document).toBe('undefined');
  expect(serverVersion).toBe(React.version);
  const markup = renderToString(
    <StrictMode>
      <SliderInputFixture range={range} />
    </StrictMode>
  );
  const source = await createSourceBrowser({
    root: process.cwd(),
    entry: '/src/Slider/test/Slider.input.client.tsx',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (request.url !== '/') return next();
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(
          await server.transformIndexHtml(
            '/',
            `<!doctype html><html><body><div id="root" data-hydrate>${markup}</div><script type="module" src="/src/Slider/test/Slider.input.client.tsx"></script></body></html>`
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
    console.info('Slider input SSR browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: React.version,
      serverVersion
    });
    expect(source.reactVersion).toBe(React.version);
    await page.goto(source.url + (range ? '/#range' : '/'));
    await expect
      .poll(() => page.evaluate(() => Boolean(window.__RSUITE_SLIDER_INPUT__)))
      .toBe(true);
    const inputs = page.getByRole('slider', { name: 'Amount' });
    const originals = await inputs.elementHandles();
    expect(originals).toHaveLength(range ? 2 : 1);
    for (const input of originals) {
      expect(await input.getAttribute('min')).toBe('10');
      expect(await input.getAttribute('max')).toBe('80');
      expect(await input.getAttribute('step')).toBe('5');
    }
    await page.evaluate(() => window.__RSUITE_SLIDER_INPUT__.hydrate());
    await expect
      .poll(() => page.evaluate(() => window.__RSUITE_SLIDER_INPUT__.snapshot().ready))
      .toBe(true);
    expect(await page.evaluate(() => window.__RSUITE_SLIDER_INPUT__.runtime)).toEqual({
      react: React.version,
      reactDOM: serverVersion
    });
    for (let index = 0; index < originals.length; index++) {
      expect(
        await inputs.nth(index).evaluate((node, original) => node === original, originals[index])
      ).toBe(true);
    }
    await page.getByRole('button', { name: 'Before' }).click();
    await page.keyboard.press('Tab');
    expect(await inputs.first().evaluate(node => node === document.activeElement)).toBe(true);
    await page.keyboard.press('ArrowUp');
    expect(await inputs.first().inputValue()).toBe('25');
    if (range) expect(await inputs.nth(1).inputValue()).toBe('60');
    expect(await page.evaluate(() => window.__RSUITE_SLIDER_INPUT__.snapshot())).toEqual({
      ready: true,
      errors: [],
      changes: [range ? [25, 60] : 25],
      commits: []
    });
    expect(errors).toEqual([]);
  } finally {
    await source.close();
  }
});
