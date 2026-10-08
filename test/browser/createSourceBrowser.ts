import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { chromium, firefox, type Browser } from 'playwright';
import react from '@vitejs/plugin-react';
import { createServer, type ViteDevServer } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

interface SourceBrowserOptions {
  root: string;
  entry: string;
  runtimeRoot?: string;
  dependencyRoot?: string;
  configureServer?: (server: ViteDevServer) => void;
}

export default async function createSourceBrowser(options: SourceBrowserOptions) {
  const browserName = process.env.BROWSER || 'chromium';
  assert(['chromium', 'firefox'].includes(browserName));
  const require = createRequire(join(options.root, 'package.json'));
  const runtimeRoot =
    options.runtimeRoot ||
    process.env.RSUITE_TEST_RUNTIME_ROOT ||
    dirname(dirname(require.resolve('react/package.json')));
  const dependencyRoot = options.dependencyRoot || process.env.RSUITE_TEST_DEPENDENCY_ROOT;
  const reactVersion: string = require(join(runtimeRoot, 'react/package.json')).version;
  const cacheDir = await mkdtemp(join(tmpdir(), 'rsuite-source-browser-'));
  let server: ViteDevServer | undefined;
  let browser: Browser | undefined;
  const close = async () => {
    try {
      await browser?.close();
    } finally {
      try {
        await server?.close();
      } finally {
        await rm(cacheDir, { recursive: true, force: true });
      }
    }
  };

  try {
    server = await createServer({
      appType: 'custom',
      configFile: false,
      logLevel: 'silent',
      cacheDir,
      plugins: [tsconfigPaths(), react()],
      root: options.root,
      define: { __DEV__: true },
      optimizeDeps: { entries: [resolve(options.root, `.${options.entry}`)] },
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
        fs: { allow: [options.root, runtimeRoot, ...(dependencyRoot ? [dependencyRoot] : [])] }
      }
    });
    options.configureServer?.(server);
    const viteServer = server;
    server.middlewares.use(async (request, response, next) => {
      if (request.url !== '/') return next();
      const html = await viteServer.transformIndexHtml(
        '/',
        `<!doctype html><html><body><div id="root"></div><script type="module" src="${options.entry}"></script></body></html>`
      );
      response.setHeader('Content-Type', 'text/html');
      response.end(html);
    });
    await server.listen();
    const url = `http://127.0.0.1:${(server.httpServer?.address() as AddressInfo).port}`;
    browser = await (browserName === 'firefox' ? firefox : chromium).launch({ headless: true });
    assert.equal(browser.browserType().name(), browserName);
    return { browser, browserName, reactVersion, url, close };
  } catch (error) {
    await close();
    throw error;
  }
}
