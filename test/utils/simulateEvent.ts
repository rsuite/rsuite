import userEvent from '@testing-library/user-event';

export async function keyPress(input: HTMLElement, keys: string | string[]) {
  if (typeof keys === 'string') {
    keys = keys.split('');
  }

  // Ensure the input is focused
  await userEvent.click(input);

  // Process each key sequentially
  for (const key of keys) {
    // Use userEvent.keyboard to simulate real keyboard input
    await userEvent.keyboard(key);
    // Add a small delay to ensure the input is processed
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}
