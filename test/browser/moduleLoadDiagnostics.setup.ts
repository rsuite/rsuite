import { commands } from '@vitest/browser/context';

declare module '@vitest/browser/context' {
  interface BrowserCommands {
    observeBrowserModuleLoads: () => Promise<void>;
  }
}

// Install listeners before importing the test file, including when that import fails.
await commands.observeBrowserModuleLoads();
