import type { BrowserCommandContext } from 'vitest/node';
import type {} from '@vitest/browser/providers/playwright';

export async function setMotionPreference(
  context: BrowserCommandContext,
  reducedMotion: 'reduce' | 'no-preference'
): Promise<void> {
  await context.page.emulateMedia({ reducedMotion });
}
