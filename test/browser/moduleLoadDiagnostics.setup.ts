import { commands } from 'vitest/browser';

declare module 'vitest/browser' {
  interface BrowserCommands {
    observeBrowserModuleLoads: () => Promise<void>;
  }
}

// Install listeners before importing the test file, including when that import fails.
await commands.observeBrowserModuleLoads();
