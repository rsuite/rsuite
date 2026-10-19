import React from 'react';
import { version as reactDomVersion } from 'react-dom';
import { renderToString } from 'react-dom/server';
import canUseDOM from 'dom-lib/canUseDOM';
import type { AddressInfo } from 'node:net';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { chromium, firefox, type Browser } from 'playwright';
import react from '@vitejs/plugin-react';
import { createServer, type ViteDevServer } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import WhisperHydrationFixture, { type HydrationMode } from './WhisperHydrationFixture';
import type { WhisperHydrationResult } from './WhisperHydration.client';

const modes: HydrationMode[] = ['closed', 'defaultOpen', 'controlledOpen'];
const identifierPrefix = 'whisper-hydration-';
const require = createRequire(import.meta.url);

// Match the browser renderer to the React packages used by the Node renderer.
const reactDirectory = dirname(require.resolve('react/package.json'));
const reactDomDirectory = dirname(require.resolve('react-dom/package.json'));

describe('Whisper SSR hydration', () => {
  let browser: Browser;
  let server: ViteDevServer;
  let serverUrl: string;
  let cacheDirectory: string;
  const markup = new Map<HydrationMode, string>();

  beforeAll(async () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
    expect(canUseDOM).toBe(false);
    expect(reactDomVersion).toBe(React.version);
    for (const mode of modes) {
      markup.set(
        mode,
        renderToString(<WhisperHydrationFixture mode={mode} />, { identifierPrefix })
      );
    }

    cacheDirectory = await mkdtemp(`${tmpdir()}/rsuite-whisper-hydration-`);
    server = await createServer({
      appType: 'custom',
      configFile: false,
      logLevel: 'silent',
      root: process.cwd(),
      cacheDir: cacheDirectory,
      plugins: [tsconfigPaths(), react()],
      resolve: {
        dedupe: ['react', 'react-dom'],
        alias: { react: reactDirectory, 'react-dom': reactDomDirectory }
      },
      server: { host: '127.0.0.1', port: 0 }
    });
    server.middlewares.use(async (request, response, next) => {
      const mode = request.url?.slice(1) as HydrationMode;
      if (!modes.includes(mode)) return next();
      const html = await server.transformIndexHtml(
        request.url!,
        `<!doctype html>
        <html><head><meta charset="UTF-8" /></head><body>
          <div id="root">${markup.get(mode)}</div>
          <div id="portal-container"></div>
          <script>window.__WHISPER_HYDRATION_CONFIG__ = ${JSON.stringify({ mode, identifierPrefix })}</script>
          <script type="module" src="/src/Whisper/test/WhisperHydration.client.tsx"></script>
        </body></html>`
      );
      response.setHeader('Content-Type', 'text/html');
      response.end(html);
    });
    await server.listen();
    const address = server.httpServer?.address() as AddressInfo;
    serverUrl = `http://127.0.0.1:${address.port}`;
    const browserName = process.env.BROWSER || 'chromium';
    browser = await (browserName === 'firefox' ? firefox : chromium).launch({ headless: true });
    expect(browser.browserType().name()).toBe(browserName);
    console.info('Whisper hydration runtime', {
      react: React.version,
      browser: browserName,
      browserVersion: browser.version()
    });
  });

  afterAll(async () => {
    try {
      await browser?.close();
    } finally {
      try {
        await server?.close();
      } finally {
        if (cacheDirectory) await rm(cacheDirectory, { recursive: true, force: true });
      }
    }
  });

  it.each(modes)('hydrates %s portals without replacing trigger nodes', async mode => {
    const page = await browser.newPage();
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on('console', message => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', error => pageErrors.push(error.message));
    try {
      await page.goto(`${serverUrl}/${mode}`);
      await page.waitForFunction(() => Boolean(window.__WHISPER_HYDRATION_RESULT__));
      const result = await page.evaluate(
        () => window.__WHISPER_HYDRATION_RESULT__ as WhisperHydrationResult
      );
      expect(result.reactVersion).toBe(React.version);
      expect(result.reactDomVersion).toBe(React.version);
      expect(result.initialMarkup).toBe(markup.get(mode));
      expect(result.hydratedMarkup).toBe(result.initialMarkup);
      expect(result.errors).toEqual([]);
      expect(result.sameTriggerNodes).toEqual([true, true]);
      const assertAuthorDescriptions = async () => {
        const descriptions = await page.locator('[data-trigger]').evaluateAll(triggers =>
          triggers.map(trigger => {
            const tokens = trigger.getAttribute('aria-describedby')?.split(/\s+/) || [];
            return tokens.some(id =>
              document.getElementById(id)?.textContent?.startsWith('Author help')
            );
          })
        );
        expect(descriptions).toEqual([true, true]);
      };
      await assertAuthorDescriptions();
      if (mode === 'closed') expect(await page.getByRole('tooltip').count()).toBe(0);
      else
        await page.waitForFunction(
          () => document.querySelectorAll('[role="tooltip"]').length === 2
        );
      if (mode === 'controlledOpen')
        expect(await page.locator('#portal-container [role="tooltip"]').count()).toBe(2);

      // Begin with native Tab, then retain the browser's actual focus throughout.
      await page.keyboard.press('Tab');
      expect(
        await page.locator('[data-trigger="1"]').evaluate(node => node === document.activeElement)
      ).toBe(true);
      await page.getByRole('tooltip').filter({ hasText: 'Tooltip 1' }).waitFor();
      await page.keyboard.press('Escape');
      if (mode === 'controlledOpen') {
        expect(await page.getByRole('tooltip').count()).toBe(2);
        await page.getByRole('button', { name: 'Close both' }).click();
        await page.waitForFunction(
          () => document.querySelectorAll('[role="tooltip"]').length === 0
        );
        await page.getByRole('button', { name: 'Open both' }).click();
        await page.waitForFunction(
          () => document.querySelectorAll('[role="tooltip"]').length === 2
        );
        expect(
          await page
            .getByRole('button', { name: 'Open both' })
            .evaluate(node => node === document.activeElement)
        ).toBe(true);
      } else {
        await page
          .getByRole('tooltip')
          .filter({ hasText: 'Tooltip 1' })
          .waitFor({ state: 'detached' });
        expect(
          await page.locator('[data-trigger="1"]').evaluate(node => node === document.activeElement)
        ).toBe(true);
        await page.keyboard.press('Tab');
        expect(
          await page.locator('[data-after="1"]').evaluate(node => node === document.activeElement)
        ).toBe(true);
        await page.keyboard.press('Shift+Tab');
        await page.getByRole('tooltip').filter({ hasText: 'Tooltip 1' }).waitFor();
        expect(
          await page.locator('[data-trigger="1"]').evaluate(node => node === document.activeElement)
        ).toBe(true);
      }
      await assertAuthorDescriptions();
      expect(consoleErrors).toEqual([]);
      expect(pageErrors).toEqual([]);
      const finalResult = await page.evaluate(
        () => window.__WHISPER_HYDRATION_RESULT__ as WhisperHydrationResult
      );
      expect(finalResult.errors).toEqual([]);
      expect(
        finalResult.events.some(event => event.type === 'keydown' && event.key === 'Tab')
      ).toBe(true);
      expect(
        finalResult.events.some(event => event.type === 'keydown' && event.key === 'Escape')
      ).toBe(true);
      expect(finalResult.events.every(event => event.trusted)).toBe(true);
    } finally {
      try {
        expect(await page.evaluate(() => window.__UNMOUNT_WHISPER_HYDRATION__?.())).toBe(true);
      } finally {
        await page.close();
      }
    }
  });
});
