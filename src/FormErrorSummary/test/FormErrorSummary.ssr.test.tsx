import React from 'react';
import { mkdtemp, realpath, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { isAbsolute, join, relative, sep } from 'node:path';
import type { AddressInfo } from 'node:net';
import { renderToString, version as serverVersion } from 'react-dom/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { chromium, firefox, type Browser } from 'playwright';
import { createServer, searchForWorkspaceRoot, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import FormErrorSummary from '../FormErrorSummary';
import FormErrorSummaryHydrationFixture from './FormErrorSummaryHydrationFixture';
import type { FormErrorSummaryHydrationResult } from './FormErrorSummaryHydration.client';

describe('FormErrorSummary SSR hydration', () => {
  let browser: Browser;
  let server: ViteDevServer;
  let cacheDir: string;
  let serverUrl: string;
  let markup: string;
  const browserName = process.env.BROWSER || 'chromium';

  beforeAll(async () => {
    expect(serverVersion).toBe(React.version);
    markup = renderToString(<FormErrorSummaryHydrationFixture />);
    cacheDir = await mkdtemp(join(tmpdir(), 'rsuite-summary-hydration-'));
    const runtimeRoot = process.env.RSUITE_SUMMARY_RUNTIME_ROOT;
    const fsAllow = [searchForWorkspaceRoot(process.cwd())];
    if (runtimeRoot) {
      fsAllow.push(
        await realpath(join(runtimeRoot, 'react')),
        await realpath(join(runtimeRoot, 'react-dom'))
      );
    }
    fsAllow.push(await realpath(join(process.cwd(), 'node_modules/@rsuite/icons')));
    const selectedPackages = runtimeRoot
      ? [
          {
            find: 'react-dom',
            replacement: join(runtimeRoot, 'react-dom'),
            physical: await realpath(join(runtimeRoot, 'react-dom'))
          },
          {
            find: 'react',
            replacement: join(runtimeRoot, 'react'),
            physical: await realpath(join(runtimeRoot, 'react'))
          }
        ]
      : [];
    server = await createServer({
      configFile: false,
      appType: 'custom',
      root: process.cwd(),
      logLevel: 'silent',
      cacheDir,
      plugins: [tsconfigPaths(), react()],
      resolve: {
        dedupe: ['react', 'react-dom'],
        alias: runtimeRoot
          ? selectedPackages.map(selected => ({
              find: selected.find,
              replacement: selected.replacement,
              async customResolver(source, importer, options) {
                const resolved = await this.resolve(source, importer, {
                  ...options,
                  skipSelf: true
                });
                if (!resolved || resolved.external) {
                  throw new Error(
                    `Cannot resolve selected summary runtime as a local file: ${source}`
                  );
                }
                const resolvedId = resolved.id.split(/[?#]/)[0];
                if (resolvedId.startsWith('\0') || !isAbsolute(resolvedId)) {
                  throw new Error(
                    `Summary runtime did not resolve to a physical file: ${resolved.id}`
                  );
                }
                const physical = await realpath(resolvedId);
                const withinPackage = relative(selected.physical, physical);
                if (
                  isAbsolute(withinPackage) ||
                  withinPackage === '..' ||
                  withinPackage.startsWith(`..${sep}`)
                ) {
                  throw new Error(`Summary runtime resolved outside selected package: ${physical}`);
                }
                console.info('FormErrorSummary hydration physical runtime', { source, physical });
                return resolved;
              }
            }))
          : undefined
      },
      optimizeDeps: {
        entries: ['src/FormErrorSummary/test/FormErrorSummaryHydration.client.tsx'],
        include: ['react', 'react-dom/client']
      },
      server: { host: '127.0.0.1', port: 0, fs: { allow: fsAllow } }
    });
    server.middlewares.use(async (request, response, next) => {
      if (request.url !== '/') return next();
      const html = await server.transformIndexHtml(
        '/',
        `<!doctype html><html><head><meta charset="UTF-8"></head><body><div id="root">${markup}</div><script type="module" src="/src/FormErrorSummary/test/FormErrorSummaryHydration.client.tsx"></script></body></html>`
      );
      response.setHeader('Content-Type', 'text/html');
      response.end(html);
    });
    await server.listen();
    serverUrl = `http://127.0.0.1:${(server.httpServer?.address() as AddressInfo).port}`;
    browser = await (browserName === 'firefox' ? firefox : chromium).launch({ headless: true });
    expect(browser.browserType().name()).toBe(browserName);
    console.log('FormErrorSummary hydration runtime', {
      react: React.version,
      reactDOMServer: serverVersion,
      browser: browserName,
      version: browser.version()
    });
  });

  afterAll(async () => {
    try {
      await browser?.close();
    } finally {
      try {
        await server?.close();
      } finally {
        if (cacheDir) await rm(cacheDir, { force: true, recursive: true });
      }
    }
  });

  it('renders an empty summary without browser globals', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
    expect(renderToString(<FormErrorSummary header="Errors" items={[]} />)).toBe('');
  });

  it('hydrates stable heading IDs without errors or implicit focus, then navigates to the real input', async () => {
    const page = await browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    let assertionError: unknown;
    let assertionFailed = false;
    const cleanupErrors: unknown[] = [];
    try {
      await page.goto(serverUrl);
      await page.waitForFunction(() => window.formErrorSummaryHydration?.ready);
      const result = await page.evaluate(() => {
        const state: FormErrorSummaryHydrationResult = window.formErrorSummaryHydration;
        const regions = [...document.querySelectorAll('[role="region"]')];
        const ids = regions.map(region => region.getAttribute('aria-labelledby'));
        return {
          ready: state.ready,
          reactVersion: state.reactVersion,
          reactDOMVersion: state.reactDOMVersion,
          errors: [...state.errors],
          ids,
          allIds: [...document.querySelectorAll('[id]')].map(node => node.id),
          active: document.activeElement?.tagName,
          value: (document.getElementById('contact-email') as HTMLInputElement).value
        };
      });
      expect(result.reactVersion).toBe(React.version);
      expect(result.reactDOMVersion).toBe(serverVersion);
      expect(result.errors).toEqual([]);
      expect(errors).toEqual([]);
      expect(result.ids).toHaveLength(2);
      result.ids.forEach(id => expect(markup).toContain(`id="${id}"`));
      expect(new Set(result.allIds).size).toBe(result.allIds.length);
      expect(result.active).toBe('BODY');
      expect(result.value).toBe('unchanged');
      await page.getByRole('link', { name: 'Email: Enter an address.' }).focus();
      await page.keyboard.press('Enter');
      await expect
        .poll(() =>
          page
            .getByLabel('Email', { exact: true })
            .evaluate(node => node === document.activeElement)
        )
        .toBe(true);
      expect(await page.getByLabel('Email', { exact: true }).inputValue()).toBe('unchanged');
      expect(await page.evaluate(() => window.formErrorSummaryHydration.errors)).toEqual([]);
      expect(errors).toEqual([]);
    } catch (error) {
      assertionFailed = true;
      assertionError = error;
    } finally {
      try {
        const remainingChildren = await page.evaluate(() => {
          window.formErrorSummaryHydration.unmount();
          return document.getElementById('root')!.childNodes.length;
        });
        expect(remainingChildren).toBe(0);
      } catch (error) {
        cleanupErrors.push(error);
      }
      try {
        await page.close();
      } catch (error) {
        cleanupErrors.push(error);
      }
    }
    if (cleanupErrors.length) {
      throw new AggregateError(
        assertionFailed ? [assertionError, ...cleanupErrors] : cleanupErrors,
        'FormErrorSummary hydration assertion or cleanup failed'
      );
    }
    if (assertionFailed) throw assertionError;
  });
});
