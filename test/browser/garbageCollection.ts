import type { BrowserCommandContext } from 'vitest/node';
import type {} from '@vitest/browser-playwright';

export async function collectBrowserGarbage({ page }: BrowserCommandContext): Promise<void> {
  if (page.context().browser()?.browserType().name() === 'chromium') {
    await page.requestGC();
  }
}
