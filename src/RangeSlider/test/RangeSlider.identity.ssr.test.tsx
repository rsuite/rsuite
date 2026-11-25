import React, { StrictMode } from 'react';
import { renderToString, version as serverVersion } from 'react-dom/server';
import { expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import RangeSliderIdentityFixture from './RangeSliderIdentityFixture';

it.each(['reject', 'defer'] as const)(
  'hydrates range input identity with a %s owner',
  async mode => {
    expect(typeof document).toBe('undefined');
    expect(serverVersion).toBe(React.version);
    const markup = renderToString(
      <StrictMode>
        <RangeSliderIdentityFixture mode={mode} />
      </StrictMode>
    );
    const source = await createSourceBrowser({
      root: process.cwd(),
      entry: '/src/RangeSlider/test/RangeSlider.identity.client.tsx',
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (request.url !== '/') return next();
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(
            await server.transformIndexHtml(
              '/',
              `<!doctype html><html><body><div id="root" data-hydrate>${markup}</div><script type="module" src="/src/RangeSlider/test/RangeSlider.identity.client.tsx"></script></body></html>`
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
      console.info('RangeSlider identity SSR browser', {
        browser: source.browserName,
        version: source.browser.version(),
        react: React.version,
        serverVersion
      });
      expect(source.reactVersion).toBe(React.version);
      await page.goto(source.url + '/#mode=' + mode);
      await expect
        .poll(() => page.evaluate(() => Boolean(window.__RSUITE_RANGE_IDENTITY__)))
        .toBe(true);
      const inputs = page.getByRole('slider');
      const originals = await inputs.elementHandles();
      expect(originals).toHaveLength(2);
      await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.hydrate());
      await expect
        .poll(() => page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.snapshot().ready))
        .toBe(true);
      expect(await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.runtime)).toEqual({
        react: React.version,
        reactDOM: serverVersion
      });
      for (let index = 0; index < 2; index++) {
        expect(
          await inputs.nth(index).evaluate((node, original) => node === original, originals[index])
        ).toBe(true);
      }
      await page.getByRole('button', { name: 'Before' }).click();
      await page.keyboard.press('Tab');
      await page.keyboard.press('End');
      await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.renderOwner());
      await expect.poll(() => page.getByTestId('fixture').getAttribute('data-renders')).toBe('1');
      expect(await inputs.first().inputValue()).toBe('20');
      expect(await inputs.nth(1).inputValue()).toBe('60');
      if (mode === 'defer') {
        await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.accept());
        await expect.poll(() => inputs.first().inputValue()).toBe('80');
        expect(await inputs.nth(1).inputValue()).toBe('60');
      }
      expect(await inputs.first().evaluate(node => node === document.activeElement)).toBe(true);
      expect(
        (await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.snapshot())).errors
      ).toEqual([]);
      expect(errors).toEqual([]);
    } finally {
      await source.close();
    }
  }
);
