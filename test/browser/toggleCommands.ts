import type { BrowserCommandContext } from 'vitest/node';
import type {} from '@vitest/browser/providers/playwright';

export async function trcTrustedResetClick(
  context: BrowserCommandContext,
  buttonId: string
): Promise<{ buttonId: string }> {
  if (buttonId !== 'trc-reset') throw new Error('Unexpected reset button identity');
  const frame = await context.frame();
  if (frame.page() !== context.page || frame.isDetached() || context.page.isClosed()) {
    throw new Error('Expected live test frame in the allocated browser page');
  }
  const button = frame.locator('#trc-reset');
  if ((await button.count()) !== 1)
    throw new Error('Expected exactly one reset button in the test frame');
  await button.evaluate(element => {
    if (
      !(element instanceof HTMLButtonElement) ||
      element.type !== 'reset' ||
      element.disabled ||
      !element.form
    ) {
      throw new Error('Expected enabled native reset button with a form owner');
    }
  });
  const rect = await button.boundingBox();
  if (!rect || rect.width <= 0 || rect.height <= 0) throw new Error('Reset button is not visible');
  const x = rect.x + rect.width / 2;
  const y = rect.y + rect.height / 2;
  await context.page.mouse.move(x, y);
  await context.page.mouse.click(x, y);
  return { buttonId };
}

export async function trcTrustedInputClick(
  context: BrowserCommandContext,
  inputId: string
): Promise<{ inputId: string }> {
  if (inputId !== 'trc-input') throw new Error('Unexpected native input identity');
  const frame = await context.frame();
  if (frame.page() !== context.page || frame.isDetached() || context.page.isClosed()) {
    throw new Error('Expected live test frame in the allocated browser page');
  }
  const input = frame.locator('#trc-input');
  if ((await input.count()) !== 1)
    throw new Error('Expected exactly one native input in the test frame');
  await input.evaluate(element => {
    if (!(element instanceof HTMLInputElement) || element.type !== 'checkbox' || element.disabled) {
      throw new Error('Expected enabled native checkbox');
    }
  });
  const rect = await input.boundingBox();
  if (!rect || rect.width <= 0 || rect.height <= 0) throw new Error('Native input is not visible');
  const x = rect.x + rect.width / 2;
  const y = rect.y + rect.height / 2;
  await context.page.mouse.move(x, y);
  await context.page.mouse.click(x, y);
  return { inputId };
}
