import { beforeEach, afterEach } from 'vitest';
import { commands } from 'vitest/browser';

declare module 'vitest/browser' {
  interface BrowserCommands {
    saveNativeFirefoxProfile: (test: { id: string; name: string }) => Promise<{
      ok: boolean;
      capturedTestId: string;
      file: string;
    }>;
  }
}

beforeEach(context => {
  performance.mark('rsuite-firefox-profile:start:' + context.task.id);
  context.onTestFailed(async () => {
    performance.mark('rsuite-firefox-profile:request:' + context.task.id);
    try {
      // Await aggregation while this test frame still exists. A Node reporter
      // can run after the provider has already destroyed its content process.
      const result = await commands.saveNativeFirefoxProfile({
        id: context.task.id,
        name: context.task.name
      });
      console.info('[Firefox profile] Captured first failure:', result.capturedTestId, result.file);
    } catch (error) {
      // Keep the original assertion failure. The collector records its own
      // capture error separately in summary.json and retains any partial file.
      console.warn('[Firefox profile] Capture failed:', String(error));
    }
  });
});
afterEach(context => {
  performance.mark('rsuite-firefox-profile:end:' + context.task.id);
});
