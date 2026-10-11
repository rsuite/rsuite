import { commands, server } from '@vitest/browser/context';

declare module '@vitest/browser/context' {
  interface BrowserCommands {
    collectBrowserGarbage: () => Promise<void>;
  }
}

// Reclaim detached tester frames before importing the next file's tests.
// Chromium can retain their documents and module resources across isolated files.
if (server.browser === 'chromium') {
  await commands.collectBrowserGarbage();
}
