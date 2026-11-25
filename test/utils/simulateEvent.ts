import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export async function keyPress(input: HTMLElement, keys: string | string[]) {
  if (typeof keys === 'string') {
    keys = keys.split('');
  }

  userEvent.click(input);

  let timeout = 0;

  const actions = keys.map(key => {
    timeout += 100;
    return new Promise<void>(resolve => {
      setTimeout(() => {
        fireEvent.keyDown(input, { key });
        resolve();
      }, timeout);
    });
  });

  await Promise.all(actions);
}
