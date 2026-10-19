import type { CDPSession, Page } from 'playwright';

interface ProcessSnapshot {
  time: number;
  processes: { type: string; id: number }[];
  truncated: boolean;
}

interface ProcessObserver {
  capture: () => Promise<{ initial: ProcessSnapshot | null; current: ProcessSnapshot | null }>;
}

const observers = new WeakMap<Page, Promise<ProcessObserver | null>>();

async function bounded<T>(operation: Promise<T>): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout>;
  try {
    return await Promise.race([
      operation.catch(() => null),
      new Promise<null>(resolve => {
        timer = setTimeout(() => resolve(null), 1000);
      })
    ]);
  } finally {
    clearTimeout(timer!);
  }
}

async function sample(session: CDPSession): Promise<ProcessSnapshot | null> {
  const result = await bounded(session.send('SystemInfo.getProcessInfo'));
  if (!result) return null;
  const processes = result.processInfo.filter(
    process => process.type === 'browser' || process.type === 'network.mojom.NetworkService'
  );
  return {
    time: Date.now(),
    processes: processes.slice(0, 8).map(({ type, id }) => ({ type, id })),
    truncated: processes.length > 8
  };
}

/** Keep a baseline to distinguish a network-service restart from a surviving browser process. */
export function observeBrowserProcesses(page: Page): Promise<ProcessObserver | null> {
  const existing = observers.get(page);
  if (existing) return existing;

  const initialize = async (): Promise<ProcessObserver | null> => {
    const browser = page.context().browser();
    if (!browser || browser.browserType().name() !== 'chromium' || page.isClosed()) return null;
    const opening = browser.newBrowserCDPSession();
    const session = await bounded(opening);
    if (!session) {
      // A late connection must not leave a diagnostic session attached after our deadline.
      void opening.then(session => session.detach()).catch(() => {});
      return null;
    }
    const detach = () => {
      void session.detach().catch(() => {});
    };
    page.once('close', detach);
    if (page.isClosed()) {
      page.off('close', detach);
      detach();
      return null;
    }
    const initial = await sample(session);
    return {
      capture: async () => ({ initial, current: page.isClosed() ? null : await sample(session) })
    };
  };
  const observer = initialize();
  observers.set(page, observer);
  return observer;
}
