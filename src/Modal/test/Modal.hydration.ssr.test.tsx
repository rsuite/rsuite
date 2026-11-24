import React, { StrictMode } from 'react';
import { renderToString, version as serverVersion } from 'react-dom/server';
import { afterAll, beforeAll, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import ModalHydrationFixture, { ModalHydrationFixtureProps } from './ModalHydrationFixture';

const cases: ModalHydrationFixtureProps[] = [];
for (const kind of ['modal', 'drawer'] as const)
  for (const customContainer of [false, true])
    for (const reduceMotion of [false, true]) cases.push({ kind, customContainer, reduceMotion });

let source: Awaited<ReturnType<typeof createSourceBrowser>>;

beforeAll(async () => {
  expect(typeof document).toBe('undefined');
  expect(serverVersion).toBe(React.version);
  const documents = cases.map(props =>
    renderToString(
      <StrictMode>
        <ModalHydrationFixture {...props} />
      </StrictMode>
    )
  );
  documents.forEach(markup => expect(markup).not.toContain('Initial dialog'));
  source = await createSourceBrowser({
    root: process.cwd(),
    entry: '/src/Modal/test/Modal.hydration.client.tsx',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const url = new URL(request.url || '/', 'http://localhost');
        if (url.pathname !== '/') return next();
        const markup = documents[Number(url.searchParams.get('case'))];
        if (markup === undefined) return next();
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(
          await server.transformIndexHtml(
            '/',
            `<!doctype html><html><body><div id="root">${markup}</div><div id="portal-target"></div><script type="module" src="/src/Modal/test/Modal.hydration.client.tsx"></script></body></html>`
          )
        );
      });
    }
  });
});

afterAll(async () => source?.close());

it.each(cases.map((props, index) => ({ ...props, index })))(
  'hydrates an open $kind, custom container: $customContainer, reduced motion: $reduceMotion',
  async props => {
    const errors: string[] = [];
    const page = await source.browser.newPage();
    try {
      page.on('pageerror', error => errors.push(String(error)));
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text());
      });
      console.info('Modal initial-open SSR browser', {
        browser: source.browserName,
        version: source.browser.version(),
        react: React.version,
        serverVersion
      });
      expect(source.reactVersion).toBe(React.version);
      await page.goto(
        source.url +
          '/?case=' +
          props.index +
          '#kind=' +
          props.kind +
          (props.customContainer ? '&custom' : '') +
          (props.reduceMotion ? '&reduced' : '')
      );
      await expect
        .poll(() => page.evaluate(() => Boolean(window.__RSUITE_MODAL_HYDRATION__)))
        .toBe(true);
      const opener = page.getByRole('button', { name: 'Open dialog' });
      const input = page.getByRole('textbox', { name: 'Draft' });
      const originalOpener = await opener.elementHandle();
      const originalInput = await input.elementHandle();
      await input.fill('Edited before hydration');
      await opener.focus();
      expect(await page.getByRole('dialog').count()).toBe(0);
      await page.evaluate(() => window.__RSUITE_MODAL_HYDRATION__.hydrate());
      await expect
        .poll(() =>
          page.evaluate(() =>
            window.__RSUITE_MODAL_HYDRATION__.snapshot().events.filter(event => event === 'entered')
          )
        )
        .toEqual(['entered']);
      expect(await page.evaluate(() => window.__RSUITE_MODAL_HYDRATION__.runtime)).toEqual({
        react: React.version,
        reactDOM: serverVersion
      });
      expect(await input.evaluate((node, before) => node === before, originalInput)).toBe(true);
      expect(await opener.evaluate((node, before) => node === before, originalOpener)).toBe(true);
      expect(await input.inputValue()).toBe('Edited before hydration');
      const target = page.locator(props.customContainer ? '#portal-target' : 'body');
      const dialog = target.getByRole('dialog', { name: 'Initial dialog' });
      await dialog.waitFor();
      expect(await page.locator('#root').getByRole('dialog').count()).toBe(0);
      await expect
        .poll(() =>
          page
            .getByTestId(`${props.kind}-wrapper`)
            .evaluate(node => node.contains(node.ownerDocument.activeElement))
        )
        .toBe(true);
      expect(
        await target.evaluate(
          (node, kind) => node.classList.contains(`rs-${kind}-open`),
          props.kind
        )
      ).toBe(true);
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'detached' });
      await expect.poll(() => opener.evaluate(node => node === document.activeElement)).toBe(true);
      expect(
        await target.evaluate(
          (node, kind) => node.classList.contains(`rs-${kind}-open`),
          props.kind
        )
      ).toBe(false);
      await opener.click();
      await dialog.waitFor();
      await page.getByRole('button', { name: 'Close dialog' }).click();
      await dialog.waitFor({ state: 'detached' });
      await expect.poll(() => opener.evaluate(node => node === document.activeElement)).toBe(true);
      const snapshot = await page.evaluate(() => window.__RSUITE_MODAL_HYDRATION__.snapshot());
      expect(snapshot.events.filter(event => event === 'open')).toEqual(['open', 'open']);
      expect(snapshot.events.filter(event => event === 'exited')).toEqual(['exited', 'exited']);
      expect(snapshot.errors).toEqual([]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  }
);
