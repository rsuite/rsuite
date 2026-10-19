import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import PinInput from '../PinInput';
import '../styles/index.scss';

describe.each([false, true])('PinInput accessible native forms (controlled=%s)', controlled => {
  it.each([false, true])(
    'retains names and errors through reset and submit (outside=%s)',
    async outside => {
      const onChange = vi.fn();
      const onComplete = vi.fn();
      const onReset = vi.fn();
      const onSubmit = vi.fn();
      const pin = (
        <PinInput
          name="pin"
          form="accessible-pin-form"
          otp
          defaultValue="1234"
          {...(controlled ? { value: '5678' } : {})}
          aria-labelledby="pin-label"
          aria-describedby="pin-help"
          aria-invalid
          aria-errormessage="pin-error"
          onChange={onChange}
          onComplete={onComplete}
        />
      );
      const { container } = render(
        <>
          <span id="pin-label">Account verification</span>
          <p id="pin-help">Enter the code sent by email.</p>
          <p id="pin-error">Use the latest code.</p>
          <form
            id="accessible-pin-form"
            onReset={event => onReset(event.nativeEvent.isTrusted)}
            onSubmit={event => {
              event.preventDefault();
              onSubmit(
                new FormData(event.currentTarget).getAll('pin'),
                event.nativeEvent.isTrusted
              );
            }}
          >
            {!outside && pin}
            <button type="reset">Reset code</button>
            <button type="submit">Confirm code</button>
          </form>
          {outside && pin}
        </>
      );
      const form = container.querySelector<HTMLFormElement>('form')!;
      const inputs = Array.from(
        container.querySelectorAll<HTMLInputElement>('input:not([type="hidden"])')
      );
      const hidden = container.querySelector<HTMLInputElement>('input[type="hidden"]')!;
      const value = () => inputs.map(input => input.value).join('');
      const verifyAccessibility = () => {
        const group = screen.getByRole('group', { name: 'Account verification' });
        expect(group).toHaveAccessibleDescription('Enter the code sent by email.');
        inputs.forEach((input, index) => {
          expect(input).toHaveAccessibleName(`Character ${index + 1} of 4`);
          expect(input).toHaveAccessibleDescription('Enter the code sent by email.');
          expect(input).toHaveAccessibleErrorMessage('Use the latest code.');
          expect(input.form).toBe(form);
        });
        expect(hidden.form).toBe(form);
        expect(hidden.getAttributeNames().filter(name => name.startsWith('aria-'))).toEqual([]);
      };
      verifyAccessibility();
      act(() => inputs[2].focus());
      fireEvent.input(inputs[2], {
        target: { value: '9876' },
        inputType: 'insertReplacementText'
      });
      expect(onChange).toHaveBeenCalledExactlyOnceWith('9876');
      expect(onComplete).toHaveBeenCalledExactlyOnceWith('9876');
      expect(value()).toBe(controlled ? '5678' : '9876');
      expect(new FormData(form).getAll('pin')).toEqual([controlled ? '5678' : '9876']);
      onChange.mockClear();
      onComplete.mockClear();

      await act(async () => userEvent.click(screen.getByRole('button', { name: 'Reset code' })));
      await waitFor(() => expect(value()).toBe(controlled ? '5678' : '1234'));
      expect(onReset).toHaveBeenCalledExactlyOnceWith(true);
      expect(onChange).not.toHaveBeenCalled();
      expect(onComplete).not.toHaveBeenCalled();
      verifyAccessibility();

      await act(async () => {
        await userEvent.click(inputs[0]);
        await userEvent.keyboard('{Enter}');
      });
      expect(onSubmit).toHaveBeenCalledExactlyOnceWith([controlled ? '5678' : '1234'], true);
      expect(onChange).not.toHaveBeenCalled();
      expect(onComplete).not.toHaveBeenCalled();
      verifyAccessibility();
    }
  );
});
