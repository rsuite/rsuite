import { statfsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import type { Page } from 'playwright';

interface BrowserSnapshot {
  pageId: number;
  time: number;
  location: string;
  activeTestFiles: string[];
  recentTestFiles: string[];
  browserConnected: boolean | null;
  host: {
    platform: string;
    nodeRssBytes: number;
    temporaryFreeBytes: number | null;
  };
}

export type BrowserLifecycleDiagnostic = BrowserSnapshot &
  (
    | { event: 'crash' | 'close' | 'navigation' }
    | { event: 'rpc-close'; code: number; wasClean: boolean }
  );

const observers = new WeakMap<Page, () => BrowserSnapshot>();
let nextPageId = 0;

/** Observe the default provider's page without changing its lifecycle or resource policy. */
export function observeBrowserLifecycle(
  page: Page,
  origin: string,
  report: (diagnostic: BrowserLifecycleDiagnostic) => void = diagnostic =>
    console.info('[Browser lifecycle]', JSON.stringify(diagnostic))
) {
  const existing = observers.get(page);
  if (existing) return existing;

  const pageId = ++nextPageId;
  const recentTestFiles: string[] = [];
  const testFile = (url: string) => {
    const location = new URL(url, origin);
    return location.origin === origin ? location.searchParams.get('iframeId') : null;
  };
  const rememberTestFile = (url: string) => {
    const file = testFile(url);
    if (!file) return;
    const previous = recentTestFiles.indexOf(file);
    if (previous !== -1) recentTestFiles.splice(previous, 1);
    recentTestFiles.push(file);
    if (recentTestFiles.length > 16) recentTestFiles.shift();
  };
  const snapshot = (): BrowserSnapshot => {
    const url = new URL(page.url());
    let temporaryFreeBytes: number | null = null;
    try {
      const { bavail, bsize } = statfsSync(tmpdir());
      temporaryFreeBytes = bavail * bsize;
    } catch {
      // Diagnostics must not fail a test when filesystem statistics are unavailable.
    }
    return {
      pageId,
      time: Date.now(),
      // Do not expose URL credentials, arbitrary query parameters or opaque URL contents.
      location: url.origin === origin ? url.origin + url.pathname : url.origin,
      activeTestFiles: page
        .frames()
        .map(frame => testFile(frame.url()))
        .filter(Boolean) as string[],
      recentTestFiles: [...recentTestFiles],
      browserConnected: page.context().browser()?.isConnected() ?? null,
      host: {
        platform: process.platform,
        nodeRssBytes: process.memoryUsage().rss,
        temporaryFreeBytes
      }
    };
  };
  observers.set(page, snapshot);
  page.frames().forEach(frame => rememberTestFile(frame.url()));
  page.on('framenavigated', frame => {
    rememberTestFile(frame.url());
    if (frame === page.mainFrame()) report({ event: 'navigation', ...snapshot() });
  });
  page.on('crash', () => report({ event: 'crash', ...snapshot() }));
  page.on('close', () => report({ event: 'close', ...snapshot() }));
  page.on('console', message => {
    const prefix = '[Browser RPC close] ';
    const text = message.text();
    if (!text.startsWith(prefix) || text.length > 200) return;
    let close: { code?: unknown; wasClean?: unknown } | null;
    try {
      close = JSON.parse(text.slice(prefix.length));
    } catch {
      return;
    }
    if (
      !close ||
      typeof close.code !== 'number' ||
      !Number.isInteger(close.code) ||
      close.code < 1000 ||
      close.code > 4999 ||
      typeof close.wasClean !== 'boolean'
    ) {
      return;
    }
    // Keep only close metadata; never forward the socket URL, reason or payload.
    report({ event: 'rpc-close', code: close.code, wasClean: close.wasClean, ...snapshot() });
  });
  return snapshot;
}
