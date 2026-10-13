import React, { StrictMode } from 'react';
import { renderToString, version as serverVersion } from 'react-dom/server';
import { afterAll, beforeAll, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import ColorPickerHydrationFixture, {
  type ColorPickerHydrationProps
} from './ColorPickerHydrationFixture';

const cases: ColorPickerHydrationProps[] = [];
for (const controlled of [false, true])
  for (const initiallyOpen of [false, true])
    for (const mobile of [false, true]) cases.push({ controlled, initiallyOpen, mobile });

let source: Awaited<ReturnType<typeof createSourceBrowser>>;
beforeAll(async () => {
  expect(typeof document).toBe('undefined');
  expect(serverVersion).toBe(React.version);
  const documents = cases.map(props =>
    renderToString(
      <StrictMode>
        <ColorPickerHydrationFixture {...props} />
      </StrictMode>
    )
  );
  documents.forEach(markup => {
    expect(markup).toContain('name="brand"');
    expect(markup).toContain('value="#11223380"');
    expect(markup).not.toContain('rs-color-picker-panel');
  });
  source = await createSourceBrowser({
    root: process.cwd(),
    entry: '/src/ColorPicker/test/ColorPicker.hydration.client.tsx',
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
            `<!doctype html><html><body><div id="root">${markup}</div><script type="module" src="/src/ColorPicker/test/ColorPicker.hydration.client.tsx"></script></body></html>`
          )
        );
      });
    }
  });
  expect(source.reactVersion).toBe(React.version);
});
afterAll(async () => source?.close());

it.each(cases.map((props, index) => ({ ...props, index })))(
  'hydrates controlled=$controlled, open=$initiallyOpen, mobile=$mobile without replacing the form',
  async ({ controlled, initiallyOpen, mobile, index }) => {
    const errors: string[] = [];
    const page = await source.browser.newPage({
      viewport: { width: mobile ? 375 : 1024, height: 800 },
      reducedMotion: 'reduce'
    });
    try {
      page.on('pageerror', error => errors.push(String(error)));
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text());
      });
      await page.goto(
        source.url +
          '/?case=' +
          index +
          '#' +
          [controlled && 'controlled', initiallyOpen && 'open', mobile && 'mobile']
            .filter(Boolean)
            .join('&')
      );
      await expect
        .poll(() => page.evaluate(() => Boolean(window.__RSUITE_COLOR_HYDRATION__)))
        .toBe(true);
      const trigger = page.getByRole('combobox', { name: 'Brand', exact: true });
      const draft = page.getByRole('textbox', { name: 'Draft' });
      const originalTrigger = await trigger.elementHandle();
      const originalInput = await draft.elementHandle();
      await draft.fill('Edited before hydration');
      expect(await page.getByRole('dialog').count()).toBe(0);
      await page.evaluate(() => window.__RSUITE_COLOR_HYDRATION__.hydrate());
      await expect
        .poll(() => page.evaluate(() => window.__RSUITE_COLOR_HYDRATION__.snapshot().ready))
        .toBe(true);
      expect(await page.evaluate(() => window.__RSUITE_COLOR_HYDRATION__.runtime)).toEqual({
        react: React.version,
        reactDOM: serverVersion
      });
      expect(await trigger.evaluate((node, before) => node === before, originalTrigger)).toBe(true);
      expect(await draft.evaluate((node, before) => node === before, originalInput)).toBe(true);
      expect(await draft.inputValue()).toBe('Edited before hydration');
      const values = () =>
        page
          .locator('form')
          .evaluate(node => new FormData(node as HTMLFormElement).getAll('brand'));
      expect(await values()).toEqual(['#11223380']);
      expect(await page.getByTestId('changes').textContent()).toBe('0');
      if (!initiallyOpen) await trigger.click();
      const dialog = page.getByRole('dialog', { name: 'Brand', exact: true });
      await dialog.waitFor();
      expect(await page.getByRole('dialog').count()).toBe(1);
      expect(await trigger.getAttribute('aria-controls')).toBe(await dialog.getAttribute('id'));
      await dialog.getByRole('button', { name: 'Success', exact: true }).click();
      expect(await values()).toEqual(['#00ff00']);
      expect(await page.getByTestId('changes').textContent()).toBe('1');
      await dialog.getByRole('button', { name: 'Done', exact: true }).click();
      await dialog.waitFor({ state: 'detached' });
      expect(await trigger.evaluate(node => node === document.activeElement)).toBe(true);
      expect(
        await page.evaluate(() => window.__RSUITE_COLOR_HYDRATION__.snapshot().errors)
      ).toEqual([]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  }
);
