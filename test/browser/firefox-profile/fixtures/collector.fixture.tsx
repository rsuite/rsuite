import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { expect, it } from 'vitest';

for (const index of [1, 2]) {
  it(`retains the original assertion ${index}`, async () => {
    let trusted = false;
    render(
      <button
        onClick={event => {
          trusted = event.nativeEvent.isTrusted;
        }}
      >
        Native control
      </button>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Native control' }));
    expect(trusted).toBe(true);
    performance.mark('rsuite-firefox-profile:fixture:' + index);
    expect('original assertion').toBe(
      import.meta.env.VITE_RSUITE_PROFILE_CONTROL_FAIL === '1'
        ? 'intentional collector control failure'
        : 'original assertion'
    );
  });
}
