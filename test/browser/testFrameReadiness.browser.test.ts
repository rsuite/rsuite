import { chromium, firefox } from 'playwright';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { waitForTestFrame } from './testFrameReadiness';
import type { Browser, BrowserContext, Page } from 'playwright';

const engine = process.env.BROWSER || 'chromium';
let browser: Browser;
let context: BrowserContext;
let page: Page;

beforeAll(async () => {
  if (!['chromium', 'firefox'].includes(engine)) throw new Error(`Unknown browser: ${engine}`);
  browser = await (engine === 'firefox' ? firefox : chromium).launch({ headless: true });
  console.info('[Test frame readiness browser]', engine, browser.version());
});

beforeEach(async () => {
  context = await browser.newContext();
  page = await context.newPage();
});

afterEach(async () => context?.close());
afterAll(async () => browser?.close());

async function mountFrame(target: Page, token: string) {
  await target.evaluate(
    token =>
      new Promise<void>(resolve => {
        document.querySelector('iframe')?.remove();
        const iframe = document.createElement('iframe');
        iframe.name = 'vitest-iframe';
        iframe.onload = () => resolve();
        iframe.srcdoc = `<!doctype html><html><body>
          <script>window.frameElement.setAttribute('data-rsuite-test-frame', ${JSON.stringify(token)})</script>
          <button onclick="this.textContent = event.isTrusted ? 'Trusted click' : 'Synthetic click'">Ready</button>
        </body></html>`;
        document.body.appendChild(iframe);
      }),
    token
  );
}

describe('Test frame readiness', () => {
  it('resolves an attached caller frame before a native command', async () => {
    await mountFrame(page, 'current');
    await waitForTestFrame(page, 'current');
    const frame = page.frame('vitest-iframe')!;
    expect(await frame.getByRole('button', { name: 'Ready' }).count()).toBe(1);
    await frame.getByRole('button', { name: 'Ready' }).click();
    expect(await frame.getByRole('button', { name: 'Trusted click' }).count()).toBe(1);
  });

  it('does not accept the previous frame just because its name and URL match', async () => {
    await mountFrame(page, 'previous');
    expect(page.frame('vitest-iframe')?.url()).toBe('about:srcdoc');
    await expect(waitForTestFrame(page, 'current', 50)).rejects.toThrow(/Timeout/);
    expect(await page.frame('vitest-iframe')!.getByRole('button', { name: 'Ready' }).count()).toBe(
      1
    );
  });

  it('waits for a replacement even when the next iframe reuses the same URL', async () => {
    await mountFrame(page, 'previous');
    const previous = page.frame('vitest-iframe')!;
    const ready = waitForTestFrame(page, 'current');
    await mountFrame(page, 'current');
    await ready;
    const current = page.frame('vitest-iframe')!;
    expect(previous.isDetached()).toBe(true);
    expect(current).not.toBe(previous);
    expect(current.url()).toBe(previous.url());
    expect(current.isDetached()).toBe(false);
  });

  it('keeps readiness scoped to the allocated page', async () => {
    const other = await context.newPage();
    await mountFrame(other, 'current');
    await expect(waitForTestFrame(page, 'current', 50)).rejects.toThrow(/Timeout/);
    await waitForTestFrame(other, 'current');
  });

  it('rejects a pending readiness check when its page closes', async () => {
    const rejected = expect(waitForTestFrame(page, 'current')).rejects.toThrow(/closed/);
    await page.close();
    await rejected;
  });

  it('bounds missing-frame waits and allows a later readiness check', async () => {
    await expect(waitForTestFrame(page, 'current', 50)).rejects.toThrow(/Timeout/);
    await mountFrame(page, 'current');
    await waitForTestFrame(page, 'current');
    expect(await page.frame('vitest-iframe')!.getByRole('button', { name: 'Ready' }).count()).toBe(
      1
    );
  });
});
