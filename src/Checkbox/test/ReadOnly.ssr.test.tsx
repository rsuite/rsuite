import React, { StrictMode } from 'react';
import { renderToString, version as serverVersion } from 'react-dom/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import ReadOnlyFixture from './ReadOnlyFixture';

let source: Awaited<ReturnType<typeof createSourceBrowser>>;

beforeAll(async () => {
  expect(typeof document).toBe('undefined');
  expect(serverVersion).toBe(React.version);
  const documents = new Map<string, string>();
  for (const kind of ['checkbox', 'radio'] as const) {
    for (const group of [false, true]) {
      documents.set(
        `${kind}-${group}`,
        renderToString(
          <StrictMode>
            <ReadOnlyFixture kind={kind} group={group} defaultChecked />
          </StrictMode>
        )
      );
    }
  }
  source = await createSourceBrowser({
    root: process.cwd(),
    entry: '/src/Checkbox/test/ReadOnly.client.tsx',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const url = new URL(request.url || '/', 'http://localhost');
        if (url.pathname !== '/') return next();
        const markup = documents.get(url.searchParams.get('case') || '');
        if (markup === undefined) return next();
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(
          await server.transformIndexHtml(
            '/',
            `<!doctype html><html><body><div id="root" data-hydrate>${markup}</div><script type="module" src="/src/Checkbox/test/ReadOnly.client.tsx"></script></body></html>`
          )
        );
      });
    }
  });
});

afterAll(async () => source?.close());

describe.each(['checkbox', 'radio'] as const)('%s read-only hydration', kind => {
  it.each([false, true])('preserves input nodes and submitted values, group: %s', async group => {
    const errors: string[] = [];
    const page = await source.browser.newPage();
    try {
      page.on('pageerror', error => errors.push(String(error)));
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text());
      });
      console.info('Read-only controls SSR browser', {
        browser: source.browserName,
        version: source.browser.version(),
        react: React.version,
        serverVersion
      });
      expect(source.reactVersion).toBe(React.version);
      await page.goto(
        source.url +
          '/?case=' +
          `${kind}-${group}` +
          '#' +
          [kind, 'checked', ...(group ? ['group'] : [])].join('&')
      );
      await expect.poll(() => page.evaluate(() => Boolean(window.__RSUITE_READONLY__))).toBe(true);
      const inputs = page.getByRole(kind);
      const originals = await inputs.elementHandles();
      expect(originals).toHaveLength(group ? 2 : 1);
      expect(await inputs.first().isChecked()).toBe(true);
      await page.evaluate(() => window.__RSUITE_READONLY__.hydrate());
      await expect
        .poll(() => page.evaluate(() => window.__RSUITE_READONLY__.snapshot().ready))
        .toBe(true);
      expect(await page.evaluate(() => window.__RSUITE_READONLY__.runtime)).toEqual({
        react: React.version,
        reactDOM: serverVersion
      });
      for (let i = 0; i < originals.length; i++) {
        expect(
          await inputs.nth(i).evaluate((node, original) => node === original, originals[i])
        ).toBe(true);
      }
      const target = group ? inputs.nth(1) : inputs.first();
      await target.focus();
      await page.keyboard.press('Space');
      expect(await inputs.first().isChecked()).toBe(true);
      if (group) expect(await target.isChecked()).toBe(false);
      expect(
        await page
          .getByTestId('readonly-form')
          .evaluate(form => new FormData(form as HTMLFormElement).getAll('choice'))
      ).toEqual([group ? 'first' : 'yes']);
      const state = await page.evaluate(() => window.__RSUITE_READONLY__.snapshot());
      expect(state.changes).toEqual([]);
      expect(state.inputChanges).toEqual([]);
      expect(state.errors).toEqual([]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
