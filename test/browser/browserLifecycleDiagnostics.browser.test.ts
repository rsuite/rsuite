import { createServer } from 'node:http';
import { once } from 'node:events';
import { chromium, firefox } from 'playwright';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { observeBrowserLifecycle } from './browserLifecycleDiagnostics';
import type { AddressInfo } from 'node:net';
import type { Browser, BrowserContext, Page } from 'playwright';
import type { BrowserLifecycleDiagnostic } from './browserLifecycleDiagnostics';

const engine = process.env.BROWSER || 'chromium';
let browser: Browser;
let context: BrowserContext;
let page: Page;
let origin: string;
let diagnostics: BrowserLifecycleDiagnostic[];
const server = createServer((_request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.end('<!doctype html><title>Lifecycle diagnostics</title>');
});

beforeAll(async () => {
  if (!['chromium', 'firefox'].includes(engine)) throw new Error(`Unknown browser: ${engine}`);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  browser = await (engine === 'firefox' ? firefox : chromium).launch({ headless: true });
  console.info('[Lifecycle diagnostics browser]', engine, browser.version());
});

beforeEach(async () => {
  diagnostics = [];
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(origin);
});

afterEach(async () => {
  await context?.close();
});

afterAll(async () => {
  await browser?.close();
  if (server.listening) await new Promise<void>(resolve => server.close(() => resolve()));
});

describe('Browser lifecycle diagnostics', () => {
  it('ignores malformed close messages and keeps only bounded close metadata', async () => {
    observeBrowserLifecycle(page, origin, diagnostic => diagnostics.push(diagnostic));
    await page.evaluate(() => {
      for (const payload of [
        'not JSON',
        'null',
        '{}',
        '{"code":"1000","wasClean":true}',
        '{"code":999,"wasClean":true}',
        '{"code":5000,"wasClean":true}',
        '{"code":1000.5,"wasClean":true}',
        '{"code":1000,"wasClean":"true"}',
        JSON.stringify({ code: 1000, wasClean: true, reason: 'x'.repeat(200) })
      ]) {
        console.info('[Browser RPC close]', payload);
      }
      console.info('Unrelated console message', '{"code":1000,"wasClean":true}');
      console.info(
        '[Browser RPC close]',
        JSON.stringify({ code: 1000, wasClean: true, reason: 'private-reason', url: 'private-url' })
      );
    });
    await expect.poll(() => diagnostics.length).toBe(1);
    expect(diagnostics[0]).toMatchObject({ event: 'rpc-close', code: 1000, wasClean: true });
    expect(JSON.stringify(diagnostics)).not.toContain('private-');
  });

  it('observes navigation and close once without exposing arbitrary URL parameters', async () => {
    const report = (diagnostic: BrowserLifecycleDiagnostic) => diagnostics.push(diagnostic);
    const snapshot = observeBrowserLifecycle(page, origin, report);
    expect(observeBrowserLifecycle(page, origin, report)).toBe(snapshot);
    await page.goto(`${origin}/next?token=private-navigation-value#private-fragment`);
    await page.close();
    expect(diagnostics.map(diagnostic => diagnostic.event)).toEqual(['navigation', 'close']);
    expect(new Set(diagnostics.map(diagnostic => diagnostic.pageId)).size).toBe(1);
    expect(diagnostics.every(diagnostic => diagnostic.location === `${origin}/next`)).toBe(true);
    expect(JSON.stringify(diagnostics)).not.toContain('private-');
    expect(diagnostics[0].host.nodeRssBytes).toBeGreaterThan(0);
    expect(diagnostics[0].host.temporaryFreeBytes).toBeGreaterThanOrEqual(0);
    expect(diagnostics[0].browserConnected).toBe(true);
  });

  it('retains the latest test file after its iframe is detached', async () => {
    const snapshot = observeBrowserLifecycle(page, origin, diagnostic =>
      diagnostics.push(diagnostic)
    );
    const file = '/src/Example/test/Example.spec.tsx';
    await page.evaluate(
      src =>
        new Promise<void>(resolve => {
          const iframe = document.createElement('iframe');
          iframe.onload = () => resolve();
          iframe.src = src;
          document.body.appendChild(iframe);
        }),
      `${origin}/?iframeId=${encodeURIComponent(file)}&token=private-frame-value`
    );
    expect(snapshot().activeTestFiles).toEqual([file]);
    expect(diagnostics).toEqual([]);
    await page.locator('iframe').evaluate(iframe => iframe.remove());
    expect(snapshot().activeTestFiles).toEqual([]);
    await page.close();
    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0].recentTestFiles).toEqual([file]);
    expect(JSON.stringify(diagnostics)).not.toContain('private-');
  });

  it('bounds the retained test history across repeated test navigations', async () => {
    const snapshot = observeBrowserLifecycle(page, origin, diagnostic =>
      diagnostics.push(diagnostic)
    );
    for (let index = 0; index < 20; index++) {
      await page.goto(`${origin}/?iframeId=test-${index}.spec.ts`);
    }
    expect(snapshot().recentTestFiles).toEqual(
      Array.from({ length: 16 }, (_, index) => `test-${index + 4}.spec.ts`)
    );
    await page.goto(`${origin}/?iframeId=test-10.spec.ts`);
    expect(snapshot().recentTestFiles).toHaveLength(16);
    expect(snapshot().recentTestFiles[15]).toBe('test-10.spec.ts');
  });

  it('distinguishes separate pages while leaving healthy observations silent', async () => {
    const first = observeBrowserLifecycle(page, origin, diagnostic => diagnostics.push(diagnostic));
    const secondPage = await context.newPage();
    await secondPage.goto(origin);
    const second = observeBrowserLifecycle(secondPage, origin, diagnostic =>
      diagnostics.push(diagnostic)
    );
    expect(first().pageId).not.toBe(second().pageId);
    expect(diagnostics).toEqual([]);
    await secondPage.close();
    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0].pageId).toBe(second().pageId);
    expect(page.isClosed()).toBe(false);
  });
});
