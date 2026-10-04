import React from 'react';
import { mkdtemp, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { chromium, firefox, type Browser } from 'playwright';
import react from '@vitejs/plugin-react';
import { createServer, type ViteDevServer } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import type {} from './Modal.date-tab.client';

describe('Modal native date Tab navigation in a source browser', () => {
  let browser: Browser;
  let server: ViteDevServer;
  let cacheDir: string;
  let serverUrl: string;
  const browserName = process.env.BROWSER || 'chromium';

  beforeAll(async () => {
    expect(['chromium', 'firefox']).toContain(browserName);
    const require = createRequire(import.meta.url);
    const runtimeRoot =
      process.env.RSUITE_MODAL_RUNTIME_ROOT ||
      dirname(dirname(require.resolve('react/package.json')));
    const dependencyRoot = process.env.RSUITE_MODAL_DEPENDENCY_ROOT;
    const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
    cacheDir = await mkdtemp(join(tmpdir(), 'rsuite-modal-date-tab-'));
    server = await createServer({
      appType: 'custom',
      configFile: false,
      logLevel: 'silent',
      cacheDir,
      plugins: [tsconfigPaths(), react()],
      root,
      define: { __DEV__: true },
      resolve: {
        dedupe: ['react', 'react-dom'],
        alias: {
          react: join(runtimeRoot, 'react'),
          'react-dom': join(runtimeRoot, 'react-dom'),
          ...(dependencyRoot
            ? {
                lodash: join(dependencyRoot, 'lodash'),
                '@babel/runtime': join(dependencyRoot, '@babel/runtime')
              }
            : {})
        }
      },
      server: {
        host: '127.0.0.1',
        port: 0,
        fs: { allow: [root, runtimeRoot, ...(dependencyRoot ? [dependencyRoot] : [])] }
      }
    });
    server.middlewares.use(async (request, response, next) => {
      if (request.url !== '/') return next();
      const html = await server.transformIndexHtml(
        '/',
        '<!doctype html><html><body><div id="root"></div><script type="module" src="/src/Modal/test/Modal.date-tab.client.tsx"></script></body></html>'
      );
      response.setHeader('Content-Type', 'text/html');
      response.end(html);
    });
    await server.listen();
    serverUrl = `http://127.0.0.1:${(server.httpServer?.address() as AddressInfo).port}`;
    browser = await (browserName === 'firefox' ? firefox : chromium).launch({ headless: true });
    expect(browser.browserType().name()).toBe(browserName);
    console.info('Modal date browser', {
      browser: browserName,
      version: browser.version(),
      react: React.version
    });
  });

  afterAll(async () => {
    await browser?.close();
    await server?.close();
    if (cacheDir) await rm(cacheDir, { recursive: true, force: true });
  });

  it.each(
    ['Modal', 'Drawer'].flatMap(component =>
      [false, true].map(enforceFocus => ({ component, enforceFocus }))
    )
  )(
    'keeps the native day field for $component enforceFocus=$enforceFocus',
    async ({ component, enforceFocus }) => {
      const page = await browser.newPage({ locale: 'en-US' });
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(String(error)));
      try {
        await page.goto(serverUrl);
        await page.waitForFunction(() => Boolean(window.__RSUITE_MODAL_DATE_TAB__));
        const runtime = await page.evaluate(() => window.__RSUITE_MODAL_DATE_TAB__.runtime);
        expect(runtime).toEqual({ react: React.version, reactDOM: React.version });
        await page.evaluate(
          ({ component, enforceFocus }) =>
            window.__RSUITE_MODAL_DATE_TAB__.mount(component as 'Modal' | 'Drawer', enforceFocus),
          { component, enforceFocus }
        );
        await page.waitForFunction(() => window.__RSUITE_MODAL_DATE_TAB__.snapshot().entered === 1);
        await page.locator('#native-date').focus();
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowUp');
        const result = await page.evaluate(() => window.__RSUITE_MODAL_DATE_TAB__.snapshot());
        expect(result.value).toBe('2024-01-16');
        expect(result.focused).toBe(true);
        expect(result.events.map(({ key, trusted }) => ({ key, trusted }))).toEqual([
          { key: 'Tab', trusted: true },
          { key: 'ArrowUp', trusted: true }
        ]);
        expect(result.events[0].prevented).toBe(false);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );
});
