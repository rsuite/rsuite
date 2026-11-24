import type { BrowserCommandContext } from 'vitest/node';
import type {} from '@vitest/browser-playwright';

export async function setForcedColors(
  context: BrowserCommandContext,
  forcedColors: 'active' | 'none',
  colorScheme: 'light' | 'dark'
): Promise<void> {
  await context.page.emulateMedia({ forcedColors, colorScheme });
}
