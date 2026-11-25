import { createServer } from 'node:http';
import { once } from 'node:events';
import { chromium, firefox } from 'playwright';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { observeBrowserProcesses } from './browserProcessDiagnostics';
import { createBrowserModuleDiagnostics } from './moduleLoadDiagnostics';
import { closeServer } from './closeServer';
import type { Browser, BrowserContext, Page } from 'playwright';
import type { BrowserCommandContext } from 'vitest/node';
import type { AddressInfo } from 'node:net';

const engine = process.env.BROWSER || 'chromium';
let browser: Browser;
let context: BrowserContext;
let page: Page;
let origin: string;
const server = createServer((_request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.end('<!doctype html><title>Process diagnostics</title>');
});

beforeAll(async () => {
  if (!['chromium', 'firefox'].includes(engine)) throw new Error(`Unknown browser: ${engine}`);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  browser = await (engine === 'firefox' ? firefox : chromium).launch({ headless: true });
  console.info('[Process diagnostics browser]', engine, browser.version());
});

beforeEach(async () => {
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(origin);
});

afterEach(async () => {
  await context?.close();
});

afterAll(async () => {
  let phase = 'browser.close';
  const diagnostic = setTimeout(() => {
    console.error('[Process diagnostics teardown]', {
      phase,
      browserConnected: browser?.isConnected(),
      browserContexts: browser?.contexts().length,
      serverListening: server.listening
    });
  }, 10000);
  try {
    try {
      await browser?.close();
    } finally {
      phase = 'server.close';
      await closeServer(server);
    }
  } finally {
    clearTimeout(diagnostic);
  }
});

describe('Browser process diagnostics', () => {
  it('records browser and network identities without recording unrelated process data', async () => {
    const observer = await observeBrowserProcesses(page);
    if (engine === 'firefox') {
      expect(observer).toBeNull();
      expect(await page.title()).toBe('Process diagnostics');
      return;
    }
    expect(observer).not.toBeNull();
    const { initial, current } = await observer!.capture();
    expect(initial).not.toBeNull();
    expect(current).not.toBeNull();
    expect(current!.time).toBeGreaterThanOrEqual(initial!.time);
    expect(current!.processes).toEqual(initial!.processes);
    expect(initial!.truncated).toBe(false);
    expect(new Set(initial!.processes.map(process => process.type))).toEqual(
      new Set(['browser', 'network.mojom.NetworkService'])
    );
    initial!.processes.forEach(process => {
      expect(Object.keys(process).sort()).toEqual(['id', 'type']);
      expect(Number.isInteger(process.id)).toBe(true);
      expect(process.id).toBeGreaterThan(0);
    });
  });

  it('shares initialization and retains the original baseline across captures', async () => {
    const first = observeBrowserProcesses(page);
    expect(observeBrowserProcesses(page)).toBe(first);
    const observer = await first;
    if (engine === 'firefox') {
      expect(observer).toBeNull();
      return;
    }
    const firstCapture = await observer!.capture();
    const nextCapture = await observer!.capture();
    expect(nextCapture.initial).toEqual(firstCapture.initial);
    expect(page.isClosed()).toBe(false);
    expect(browser.isConnected()).toBe(true);
  });

  it('preserves the baseline after page shutdown without failing a diagnostic read', async () => {
    const observer = await observeBrowserProcesses(page);
    await page.close();
    if (engine === 'firefox') {
      expect(observer).toBeNull();
      return;
    }
    const result = await observer!.capture();
    expect(result.initial?.processes.length).toBeGreaterThan(0);
    expect(result.current).toBeNull();
    expect(browser.isConnected()).toBe(true);
  });

  it('does not attach a session to an already closed page', async () => {
    await page.close();
    expect(await observeBrowserProcesses(page)).toBeNull();
    expect(browser.isConnected()).toBe(true);
  });

  it('adds process evidence to abnormal RPC closures while healthy observations stay silent', async () => {
    const { plugin, observeBrowserModuleLoads } = createBrowserModuleDiagnostics();
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    try {
      await observeBrowserModuleLoads({
        page,
        project: { browser: { vite: { config: { plugins: [plugin] } } } }
      } as unknown as BrowserCommandContext);
      expect(info).not.toHaveBeenCalled();
      await page.evaluate(() => {
        console.info('[Browser RPC close]', JSON.stringify({ code: 1006, wasClean: false }));
      });
      await expect
        .poll(() => info.mock.calls.filter(([label]) => label === '[Browser lifecycle]').length)
        .toBe(1);
      if (engine === 'chromium') {
        await expect
          .poll(() => info.mock.calls.filter(([label]) => label === '[Browser processes]').length)
          .toBe(1);
        const [, raw] = info.mock.calls.find(([label]) => label === '[Browser processes]')!;
        const diagnostic = JSON.parse(raw);
        expect(diagnostic.event).toBe('rpc-close');
        expect(diagnostic.initial.processes).toEqual(diagnostic.current.processes);
        expect(diagnostic.initial.processes.length).toBeGreaterThan(0);
      } else {
        expect(info.mock.calls.filter(([label]) => label === '[Browser processes]')).toEqual([]);
      }
      expect(browser.isConnected()).toBe(true);
      expect(page.isClosed()).toBe(false);
    } finally {
      await page.close();
      info.mockRestore();
    }
  });
});
