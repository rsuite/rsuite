import type { Page } from 'playwright';
import type { BrowserCommandContext } from 'vitest/node';
import type {} from '@vitest/browser/providers/playwright';

/** Resolve the caller's iframe through the live DOM, including when its URL is reused. */
export async function waitForTestFrame(page: Page, token: string, timeout = 30000) {
  await page
    .locator(`iframe[data-rsuite-test-frame="${token}"]`)
    .contentFrame()
    .locator('html')
    .waitFor({ state: 'attached', timeout });
}

export function waitForBrowserTestFrame(context: BrowserCommandContext, token: string) {
  return waitForTestFrame(context.page, token, context.project.config.browser.connectTimeout);
}
