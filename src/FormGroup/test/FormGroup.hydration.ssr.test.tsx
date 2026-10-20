import React from 'react';
import { renderToString } from 'react-dom/server';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { chromium, firefox, type Browser } from 'playwright';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { createServer, type ViteDevServer } from 'vite';
import Fixture, { type RelationsMode } from './FormGroupRelationsFixture';
import type { FormGroupHydrationResult } from './FormGroupRelations.client';

const modes: RelationsMode[] = ['direct', 'opaque'];
const identifierPrefix = 'form-relations-';
const require = createRequire(import.meta.url);

describe('Form relationships through SSR hydration and native interaction', () => {
  let server: ViteDevServer, browser: Browser, cache: string, url: string;
  beforeAll(async () => {
    expect(typeof document).toBe('undefined');
    cache = await mkdtemp(`${tmpdir()}/rsuite-form-relations-`);
    server = await createServer({
      appType: 'custom',
      configFile: false,
      logLevel: 'silent',
      root: process.cwd(),
      cacheDir: cache,
      plugins: [tsconfigPaths(), react()],
      resolve: {
        dedupe: ['react', 'react-dom'],
        alias: {
          react: dirname(require.resolve('react/package.json')),
          'react-dom': dirname(require.resolve('react-dom/package.json'))
        }
      },
      server: { host: '127.0.0.1', port: 0 }
    });
    server.middlewares.use(async (request, response, next) => {
      const mode = request.url?.slice(1) as RelationsMode;
      if (!modes.includes(mode)) return next();
      const markup = renderToString(<Fixture mode={mode} />, { identifierPrefix });
      const html = await server.transformIndexHtml(
        request.url!,
        `<!doctype html><html><head><meta charset="UTF-8"></head><body><div id="root">${markup}</div><script>window.__FORM_GROUP_CONFIG__=${JSON.stringify({ mode, identifierPrefix })}</script><script type="module" src="/src/FormGroup/test/FormGroupRelations.client.tsx"></script></body></html>`
      );
      response.setHeader('Content-Type', 'text/html');
      response.end(html);
    });
    await server.listen();
    url = `http://127.0.0.1:${(server.httpServer!.address() as AddressInfo).port}`;
    browser = await (process.env.BROWSER === 'firefox' ? firefox : chromium).launch();
    console.info('Form group hydration runtime', {
      react: React.version,
      browser: browser.browserType().name(),
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
        if (cache) await rm(cache, { recursive: true, force: true });
      }
    }
  });

  it.each(modes)(
    'preserves native label focus, updated IDs and tooltip ownership: %s',
    async mode => {
      const page = await browser.newPage();
      page.setDefaultTimeout(12000);
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(String(error)));
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text());
      });
      const expectRelations = async (label: string | null, help: string | null) => {
        await page.waitForFunction(
          ({ label, help }) => {
            const input = document.querySelector('input')!;
            return (
              input.getAttribute('aria-labelledby') === label &&
              input.getAttribute('aria-describedby') === help &&
              [label, help].filter(Boolean).every(id => !!document.getElementById(id!))
            );
          },
          { label, help }
        );
      };
      try {
        await page.goto(url + '/' + mode);
        await page.waitForFunction(() => !!window.__FORM_GROUP_RESULT__);
        await expectRelations('label-0', 'help-0');
        await page.getByText('Name', { exact: true }).click();
        expect(await page.locator('input').evaluate(node => node === document.activeElement)).toBe(
          true
        );
        await page.keyboard.press('Tab');
        expect(
          await page
            .getByRole('button', { name: 'Next state' })
            .evaluate(node => node === document.activeElement)
        ).toBe(true);
        await page.keyboard.press('Enter');
        await expectRelations('label-1', 'help-1');
        await page.getByRole('button', { name: 'Next state' }).click();
        await expectRelations('label-2', null);
        await page.getByRole('img', { name: 'help', exact: true }).hover();
        await page.getByRole('tooltip').waitFor();
        await expectRelations('label-2', null);
        await page.mouse.move(0, 0);
        await page.getByRole('tooltip').waitFor({ state: 'detached' });
        await page.getByRole('button', { name: 'Next state' }).click();
        await expectRelations(null, null);
        const result = await page.evaluate(
          () => window.__FORM_GROUP_RESULT__ as FormGroupHydrationResult
        );
        expect(result.sameInput).toBe(true);
        expect(result.errors).toEqual([]);
        expect(result.reactVersion).toBe(React.version);
        expect(result.events.length).toBeGreaterThan(0);
        expect(result.events.every(Boolean)).toBe(true);
        expect(errors).toEqual([]);
      } finally {
        await page.evaluate(() => window.__UNMOUNT_FORM_GROUP__?.());
        await page.close();
      }
    }
  );
});
