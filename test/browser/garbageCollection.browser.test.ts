import { chromium, firefox } from 'playwright';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { collectBrowserGarbage } from './garbageCollection';
import type { Browser, BrowserContext, Page } from 'playwright';
import type { BrowserCommandContext } from 'vitest/node';

const engine = process.env.BROWSER || 'chromium';
let browser: Browser;
let context: BrowserContext;
let page: Page;

beforeAll(async () => {
  if (!['chromium', 'firefox'].includes(engine)) throw new Error(`Unknown browser: ${engine}`);
  browser = await (engine === 'firefox' ? firefox : chromium).launch({ headless: true });
  console.info('[Garbage collection browser]', engine, browser.version());
});

beforeEach(async () => {
  context = await browser.newContext();
  page = await context.newPage();
});

afterEach(async () => context?.close());
afterAll(async () => browser?.close());

function collect() {
  return collectBrowserGarbage({ page } as BrowserCommandContext);
}

describe('Browser garbage collection', () => {
  it('reclaims detached Chromium documents and preserves the live frame and its events', async () => {
    await page.setContent('<button onclick="this.textContent = event.isTrusted">Live</button>');
    await page.evaluate(async () => {
      const iframe = document.createElement('iframe');
      const loaded = new Promise<void>(resolve => {
        iframe.onload = () => resolve();
      });
      iframe.srcdoc = '<!doctype html><p>Detached</p>';
      document.body.appendChild(iframe);
      await loaded;
      // A weak reference observes collection without keeping the old document alive.
      Object.assign(window, { detachedDocument: new WeakRef(iframe.contentDocument!) });
      iframe.remove();
    });

    await collect();

    if (engine === 'chromium') {
      expect(
        await page.evaluate(() => (window as any).detachedDocument.deref() === undefined)
      ).toBe(true);
    }
    expect(page.frames()).toHaveLength(1);
    await page.getByRole('button', { name: 'Live' }).click();
    expect(await page.getByRole('button', { name: 'true' }).count()).toBe(1);
    expect(browser.isConnected()).toBe(true);
  });

  it('surfaces Chromium collection failures and leaves Firefox collection untouched', async () => {
    const failure = new Error('Collection failed');
    const request = vi.spyOn(page, 'requestGC').mockRejectedValue(failure);
    try {
      if (engine === 'chromium') {
        await expect(collect()).rejects.toBe(failure);
      } else {
        await expect(collect()).resolves.toBeUndefined();
        expect(request).not.toHaveBeenCalled();
      }
    } finally {
      request.mockRestore();
    }
    expect(page.isClosed()).toBe(false);
  });

  it('reports a closed Chromium page instead of hiding an incomplete test run', async () => {
    await page.close();
    if (engine === 'chromium') {
      await expect(collect()).rejects.toThrow(/closed/);
    } else {
      await expect(collect()).resolves.toBeUndefined();
    }
    expect(browser.isConnected()).toBe(true);
  });
});
