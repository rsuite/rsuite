import React from 'react';
import type { AddressInfo } from 'node:net';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { chromium, firefox, type Browser } from 'playwright';
import { createServer, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import SplitterHydrationFixture from './SplitterHydrationFixture';

const browserName = process.env.SPLITTER_BROWSER || process.env.BROWSER || 'chromium';

describe('Splitter SSR and native interaction', () => {
  let browser: Browser;
  let server: ViteDevServer;
  let markup: string;
  let url: string;
  let cacheDir: string;

  beforeAll(async () => {
    markup = renderToString(<SplitterHydrationFixture />);
    cacheDir = await mkdtemp(join(tmpdir(), 'rsuite-splitter-hydration-'));
    const reactModules = process.env.SPLITTER_REACT_MODULES;
    server = await createServer({
      configFile: false,
      appType: 'custom',
      logLevel: 'silent',
      root: process.cwd(),
      cacheDir,
      define: { __DEV__: true },
      plugins: [tsconfigPaths(), react()],
      resolve: {
        dedupe: ['react', 'react-dom'],
        alias: reactModules
          ? {
              react: resolve(reactModules, 'react'),
              'react-dom': resolve(reactModules, 'react-dom')
            }
          : {}
      },
      optimizeDeps: { include: ['react', 'react-dom', 'react-dom/client'] },
      server: { host: '127.0.0.1', port: 0 }
    });
    server.middlewares.use(async (request, response, next) => {
      if (request.url !== '/') return next();
      const html = await server.transformIndexHtml(
        '/',
        `<!doctype html><div id="root">${markup}</div><script type="module" src="/src/Splitter/test/SplitterHydration.client.tsx"></script>`
      );
      response.setHeader('Content-Type', 'text/html');
      response.end(html);
    });
    await server.listen();
    url = `http://127.0.0.1:${(server.httpServer!.address() as AddressInfo).port}`;
    browser = await (browserName === 'firefox' ? firefox : chromium).launch({ headless: true });
  });

  afterAll(async () => {
    await browser?.close();
    await server?.close();
    if (cacheDir) await rm(cacheDir, { recursive: true, force: true });
  });

  async function openPage(hasTouch = false) {
    const page = await browser.newPage({ hasTouch });
    await page.goto(url);
    await page.waitForFunction(() => window.splitterHydrated);
    return page;
  }

  it('server renders percentage layout without DOM measurement', () => {
    expect(typeof document).toBe('undefined');
    expect(markup).toContain('flex-grow:40;flex-shrink:0;flex-basis:0');
    expect(markup).toContain('aria-controls="explorer"');
    expect(markup).toContain('dir="rtl"');
  });

  it('hydrates with the same markup, ids, and percentages', async () => {
    const page = await openPage();
    try {
      const result = await page.evaluate(() => ({
        errors: window.splitterHydrationErrors,
        html: document.getElementById('root')!.innerHTML,
        serverHTML: window.splitterServerHTML,
        react: window.splitterReactVersion
      }));
      expect(result.react).toBe(React.version);
      expect(result.errors).toEqual([]);
      expect(result.html).toBe(result.serverHTML);
      expect(
        await page.getByRole('separator', { name: 'Explorer' }).getAttribute('aria-valuenow')
      ).toBe('40');
    } finally {
      await page.close();
    }
  });

  it('supports native keyboard movement, constraints, and RTL directions', async () => {
    const page = await openPage();
    try {
      const explorer = page.getByRole('separator', { name: 'Explorer' });
      await explorer.focus();
      await page.keyboard.press('ArrowRight');
      expect(await explorer.getAttribute('aria-valuenow')).toBe('41');
      await page.keyboard.press('Shift+ArrowRight');
      expect(await explorer.getAttribute('aria-valuenow')).toBe('51');
      await page.keyboard.press('Home');
      expect(await explorer.getAttribute('aria-valuenow')).toBe('20');
      await page.keyboard.press('End');
      expect(await explorer.getAttribute('aria-valuenow')).toBe('70');
      const rtl = page.getByRole('separator', { name: 'RTL navigation' });
      await rtl.focus();
      await page.keyboard.press('ArrowLeft');
      expect(await rtl.getAttribute('aria-valuenow')).toBe('51');
      await page.keyboard.press('ArrowRight');
      expect(await rtl.getAttribute('aria-valuenow')).toBe('50');
      expect(
        await page.evaluate(() => window.splitterResizeRecords.every(event => event.trusted))
      ).toBe(true);
    } finally {
      await page.close();
    }
  });

  it.each([
    { id: 'horizontal', name: 'Explorer', axis: 'width', direction: 1, expected: 50 },
    { id: 'vertical', name: 'Output', axis: 'height', direction: 1, expected: 60 },
    { id: 'rtl', name: 'RTL navigation', axis: 'width', direction: -1, expected: 60 }
  ] as const)(
    'captures native dragging for $id without padding or transform drift',
    async ({ id, name, axis, direction, expected }) => {
      const page = await openPage();
      try {
        const handle = page.getByRole('separator', { name });
        await handle.scrollIntoViewIfNeeded();
        const box = (await handle.boundingBox())!;
        const length = await page.locator(`#${id}`).evaluate(
          (root, dimension) =>
            Array.from(root.children)
              .filter((_, index) => index % 2 === 0)
              .reduce((sum, panel) => sum + panel.getBoundingClientRect()[dimension], 0),
          axis
        );
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(
          startX + (axis === 'width' ? (direction * length) / 10 : 0),
          startY + (axis === 'height' ? length / 10 : 0),
          { steps: 3 }
        );
        await page.mouse.up();
        expect(Number(await handle.getAttribute('aria-valuenow'))).toBeCloseTo(expected, 0);
        const records = await page.evaluate(() => window.splitterResizeRecords);
        expect(records.length).toBeGreaterThan(0);
        expect(records.every(record => record.id === id && record.trusted)).toBe(true);
        expect(await page.locator(`#${id}`).getAttribute('data-resizing')).toBeNull();
      } finally {
        await page.close();
      }
    }
  );

  it.each(['horizontal', 'vertical'] as const)(
    'keeps padded panels within their shares with root gap and native keys in %s layout',
    async orientation => {
      const page = await openPage();
      try {
        const root = page.locator(`#padded-${orientation}`);
        const handle = page.getByRole('separator', { name: `Padded ${orientation}` });
        const dimension = orientation === 'horizontal' ? 'width' : 'height';
        const lengths = () =>
          root.evaluate(
            (element, axis) =>
              [element.children[0], element.children[2]].map(
                panel => panel.getBoundingClientRect()[axis]
              ),
            dimension
          );
        const initial = await lengths();
        const available = initial.reduce((sum, value) => sum + value, 0);
        expect(initial[0]).toBeCloseTo(available / 4, 1);
        expect(initial[1]).toBeCloseTo((available * 3) / 4, 1);
        const outer = await root.evaluate(
          (element, axis) => element.getBoundingClientRect()[axis],
          dimension
        );
        const handleSize = await handle.evaluate(
          (element, axis) => element.getBoundingClientRect()[axis],
          dimension
        );
        expect(outer).toBeCloseTo(available + handleSize + 40 + 32, 1);
        await handle.focus();
        await page.keyboard.press('Home');
        const home = await lengths();
        expect(home[0]).toBe(0);
        expect(home[1]).toBeCloseTo(available, 1);
        await page.keyboard.press('End');
        const end = await lengths();
        expect(end[0]).toBeCloseTo(available, 1);
        expect(end[1]).toBe(0);
        const records = await page.evaluate(() => window.splitterResizeRecords);
        expect(records.map(record => record.sizes)).toEqual([
          [0, 100],
          [100, 0]
        ]);
        expect(records.every(record => record.trusted)).toBe(true);
      } finally {
        await page.close();
      }
    }
  );

  it('skips zero-size content in native tab navigation and restores its state', async () => {
    const page = await openPage();
    try {
      const primary = page.getByRole('textbox', { name: 'Primary horizontal' });
      const handle = page.getByRole('separator', { name: 'Padded horizontal' });
      await primary.fill('Edited draft');
      await handle.focus();
      await page.keyboard.press('Home');
      expect(
        await page.locator('#padded-horizontal > :first-child').getAttribute('aria-hidden')
      ).toBe('true');
      await page.keyboard.press('Shift+Tab');
      expect(await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))).toBe(
        'RTL navigation'
      );
      await handle.focus();
      await page.keyboard.press('End');
      await page.keyboard.press('Shift+Tab');
      expect(await primary.evaluate(element => element === document.activeElement)).toBe(true);
      expect(await primary.inputValue()).toBe('Edited draft');
    } finally {
      await page.close();
    }
  });

  it.skipIf(browserName !== 'chromium')(
    'captures a native touch drag beyond the handle',
    async () => {
      const page = await openPage(true);
      try {
        const handle = page.getByRole('separator', { name: 'Explorer' });
        const box = (await handle.boundingBox())!;
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;
        const cdp = await page.context().newCDPSession(page);
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
        await cdp.send('Input.dispatchTouchEvent', {
          type: 'touchMove',
          touchPoints: [{ x: x + 60, y }]
        });
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        const records = await page.evaluate(() => window.splitterResizeRecords);
        expect(records.length).toBeGreaterThan(0);
        expect(records.every(record => record.trusted)).toBe(true);
        expect(Number(await handle.getAttribute('aria-valuenow'))).toBeGreaterThan(40);
        expect(await page.locator('#horizontal').getAttribute('data-resizing')).toBeNull();
      } finally {
        await page.close();
      }
    }
  );
});
