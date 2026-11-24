import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { playwright } from '@vitest/browser-playwright';
import { searchForWorkspaceRoot } from 'vite';
import base from '../../../vitest.config.mts';

const config = await base;
const root = fileURLToPath(new URL('../../../', import.meta.url));
const endpoint = process.env.RSUITE_FIREFOX_PROFILE_ENDPOINT;
const output = process.env.RSUITE_FIREFOX_PROFILE_OUTPUT;
if (!endpoint || !output || !config.test?.browser?.enabled) {
  throw new Error('Start the native profiler through npm run test:firefox-profile');
}
config.root = root;
config.cacheDir = path.join(output, 'cache');
config.server = {
  ...config.server,
  fs: {
    ...config.server?.fs,
    allow: [...(config.server?.fs?.allow || [searchForWorkspaceRoot(root)]), output]
  }
};
config.test.browser.provider = playwright({ connectOptions: { wsEndpoint: endpoint } });
config.test.setupFiles = [
  ...(config.test.setupFiles as string[]),
  fileURLToPath(new URL('./profile.setup.ts', import.meta.url))
];
config.test.browser.commands = {
  ...config.test.browser.commands,
  async saveNativeFirefoxProfile(_context, trigger: { id: string; name: string }) {
    const url = process.env.RSUITE_FIREFOX_PROFILE_COLLECTOR;
    if (!url) throw new Error('Missing native profile collector');
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(trigger),
      headers: { 'content-type': 'application/json' },
      signal: AbortSignal.timeout(6000)
    });
    const value = await response.json();
    if (!response.ok || !value.ok) throw new Error(value.error || 'Native profile capture failed');
    return value;
  }
};
export default config;
