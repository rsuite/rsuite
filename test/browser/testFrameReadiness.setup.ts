import { commands } from '@vitest/browser/context';

declare module '@vitest/browser/context' {
  interface BrowserCommands {
    waitForBrowserTestFrame: (token: string) => Promise<void>;
  }
}

// Browser RPC can arrive before Playwright receives the new iframe's lifecycle events.
// Give its locator a unique identity before importing tests that issue native commands.
const iframe = window.frameElement;
if (!iframe) throw new Error('Expected a Vitest tester iframe');
const token = crypto.randomUUID();
iframe.setAttribute('data-rsuite-test-frame', token);
try {
  await commands.waitForBrowserTestFrame(token);
} finally {
  iframe.removeAttribute('data-rsuite-test-frame');
}
