import React, { StrictMode } from 'react';
import { renderToString, version as serverVersion } from 'react-dom/server';
import { expect, it } from 'vitest';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';
import PortalContainerFixture, { PortalKind } from './PortalContainerFixture';

it.each(['modal', 'drawer', 'whisper', 'provider', 'whisper-open'])(
  'hydrates %s with a browser-only container getter',
  async mode => {
    expect(typeof document).toBe('undefined');
    expect(serverVersion).toBe(React.version);
    const kind = (mode === 'whisper-open' ? 'whisper' : mode) as PortalKind;
    const initiallyOpen = mode === 'whisper-open';
    const markup = renderToString(
      <StrictMode>
        <PortalContainerFixture kind={kind} initiallyOpen={initiallyOpen} />
      </StrictMode>
    );
    const source = await createSourceBrowser({
      root: process.cwd(),
      entry: '/src/internals/hooks/test/Portal.container.client.tsx',
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (request.url !== '/') return next();
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(
            await server.transformIndexHtml(
              '/',
              `<!doctype html><html><body><div id="root" data-hydrate>${markup}</div><div id="portal-a"></div><div id="portal-b"></div><script type="module" src="/src/internals/hooks/test/Portal.container.client.tsx"></script></body></html>`
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
      console.info('Portal container SSR browser', {
        browser: source.browserName,
        version: source.browser.version(),
        react: React.version,
        serverVersion
      });
      expect(source.reactVersion).toBe(React.version);
      await page.goto(source.url + '/#kind=' + kind + (initiallyOpen ? '&open' : ''));
      await expect
        .poll(() => page.evaluate(() => Boolean(window.__RSUITE_PORTAL_CONTAINER__)))
        .toBe(true);
      const original = await page.locator('#root button').first().elementHandle();
      expect(await page.getByTestId('portal-content').count()).toBe(0);
      await page.evaluate(() => window.__RSUITE_PORTAL_CONTAINER__.hydrate());
      await expect
        .poll(() => page.evaluate(() => window.__RSUITE_PORTAL_CONTAINER__.snapshot().ready))
        .toBe(true);
      expect(await page.evaluate(() => window.__RSUITE_PORTAL_CONTAINER__.runtime)).toEqual({
        react: React.version,
        reactDOM: serverVersion
      });
      expect(
        await page
          .locator('#root button')
          .first()
          .evaluate((node, before) => node === before, original)
      ).toBe(true);
      if (kind === 'provider') {
        await expect.poll(() => page.locator('#portal-a .rs-toast-container').count()).toBe(6);
        await page.getByRole('button', { name: 'Push toast' }).click();
      } else if (!initiallyOpen) await page.getByRole('button', { name: 'Open overlay' }).click();
      await page.locator('#portal-a').getByTestId('portal-content').waitFor();
      expect(await page.locator('#root').getByTestId('portal-content').count()).toBe(0);
      if (kind === 'provider') await page.getByRole('button', { name: 'Clear toasts' }).click();
      else await page.getByRole('button', { name: 'Close overlay' }).click();
      await page.getByTestId('portal-content').waitFor({ state: 'detached' });
      expect(
        (await page.evaluate(() => window.__RSUITE_PORTAL_CONTAINER__.snapshot())).errors
      ).toEqual([]);
      expect(errors).toEqual([]);
    } finally {
      await source.close();
    }
  }
);
