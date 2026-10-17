import React, { useState } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PinInput, { type PinInputProps } from '../PinInput';
import '../styles/index.scss';

function fixture(props: Partial<PinInputProps> = {}, controlled = false) {
  const onChange = vi.fn();
  const onComplete = vi.fn();
  const onInput = vi.fn();
  const initial = props.defaultValue ?? '1234';
  function Example() {
    const [value, setValue] = useState(initial);
    return (
      <form>
        <PinInput
          name="pin"
          {...props}
          {...(controlled ? { value } : { defaultValue: initial })}
          onChange={next => {
            onChange(next);
            if (controlled) setValue(next);
          }}
          onComplete={onComplete}
          onInput={event => onInput(event.nativeEvent.isTrusted)}
        />
      </form>
    );
  }
  const { container } = render(<Example />);
  const inputs = Array.from(
    container.querySelectorAll<HTMLInputElement>('input:not([type="hidden"])')
  );
  return {
    inputs,
    onChange,
    onComplete,
    onInput,
    hiddenValue: () => container.querySelector<HTMLInputElement>('input[type="hidden"]')!.value,
    formValue: () => new FormData(container.querySelector('form')!).get('pin')
  };
}

function replace(state: ReturnType<typeof fixture>, index: number, value: string) {
  act(() => state.inputs[index].focus());
  fireEvent.input(state.inputs[index], {
    target: { value },
    inputType: 'insertReplacementText'
  });
}

function expectValue(state: ReturnType<typeof fixture>, value: string, focus: number) {
  expect(state.onChange).toHaveBeenCalledExactlyOnceWith(value);
  expect(state.inputs.map(input => input.value).join('')).toBe(value);
  expect(state.formValue()).toBe(value);
  expect(document.activeElement).toBe(state.inputs[focus]);
  if (value.length === state.inputs.length) {
    expect(state.onComplete).toHaveBeenCalledExactlyOnceWith(value);
  } else {
    expect(state.onComplete).not.toHaveBeenCalled();
  }
}

describe.each([false, true])('PinInput multi-character input (controlled=%s)', controlled => {
  describe.each([false, true])('otp=%s', otp => {
    it.each([0, 1, 3])('accepts a complete code delivered to segment %s', index => {
      const state = fixture({ otp }, controlled);
      replace(state, index, '5678');
      const expected = otp ? '5678' : ['5678', '1567', '', '1235'][index];
      expectValue(state, expected, 3);
      expect(state.onInput).toHaveBeenCalledExactlyOnceWith(false);
    });

    it.each([0, 1, 3])('inserts a partial code at segment %s', index => {
      const state = fixture({ otp }, controlled);
      replace(state, index, '56');
      const expected = ['5634', '1564', '', '1235'][index];
      expectValue(state, expected, Math.min(index + 2, 3));
    });

    it('clips excess characters at the available segment boundary', () => {
      const state = fixture({ otp }, controlled);
      replace(state, 2, '567890');
      expectValue(state, otp ? '5678' : '1256', 3);
    });

    it('ignores an input payload without allowed characters', () => {
      const state = fixture({ otp }, controlled);
      replace(state, 1, '- !');
      expect(state.onChange).not.toHaveBeenCalled();
      expect(state.onComplete).not.toHaveBeenCalled();
      expect(state.formValue()).toBe('1234');
      expect(state.inputs.map(input => input.value).join('')).toBe('1234');
      expect(document.activeElement).toBe(state.inputs[1]);
    });
  });

  describe.each([false, true])('mask=%s', mask => {
    it.each([
      { type: 'number' as const, payload: '5-6 7.8', expected: '5678' },
      { type: 'alphabetic' as const, payload: 'E1F2G3H', expected: 'EFGH' },
      { type: 'alphanumeric' as const, payload: 'A-B 1.2', expected: 'AB12' },
      { type: /^[A-F0-9]$/i, payload: 'e-f 3.4', expected: 'ef34' }
    ])(
      'filters a complete $type code before replacing all segments',
      ({ type, payload, expected }) => {
        const state = fixture({ otp: true, mask, type }, controlled);
        replace(state, 2, payload);
        expectValue(state, expected, 3);
        expect(
          state.inputs.every(
            input => input.type === (mask ? 'password' : type === 'number' ? 'tel' : 'text')
          )
        ).toBe(true);
      }
    );
  });

  it.each([1, 6, 8])('fills an empty OTP with length %s', length => {
    const code = '87654321'.slice(0, length);
    const state = fixture({ otp: true, length, defaultValue: '' }, controlled);
    // Length one still exercises a multi-character replacement payload.
    replace(state, 0, length === 1 ? '87' : code);
    expectValue(state, code, length - 1);
  });

  it.each(['g', 'y', 'gy'])('keeps a custom %s pattern state intact during autofill', flags => {
    const pattern = new RegExp('[A-F0-9]', flags);
    pattern.lastIndex = 2;
    const state = fixture({ otp: true, type: pattern }, controlled);
    replace(state, 2, 'A!B@1#2');
    expectValue(state, 'AB12', 3);
    expect(pattern.lastIndex).toBe(2);
  });

  it('retains segment-relative paste behavior for an OTP', async () => {
    const state = fixture({ otp: true }, controlled);
    act(() => state.inputs[2].focus());
    const event = new Event('paste', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'clipboardData', { value: { getData: () => '5678' } });
    act(() => state.inputs[2].dispatchEvent(event));
    await waitFor(() => expect(document.activeElement).toBe(state.inputs[3]));
    expectValue(state, '1256', 3);
    expect(event.defaultPrevented).toBe(true);
    expect(state.onInput).not.toHaveBeenCalled();
  });

  it('filters a partial replacement before deciding whether it is a complete OTP', () => {
    const state = fixture({ otp: true }, controlled);
    replace(state, 1, '5!6?');
    expectValue(state, '1564', 3);
  });

  it.each(['disabled', 'readOnly'] as const)('does not publish a replacement while %s', prop => {
    const state = fixture({ otp: true, [prop]: true }, controlled);
    replace(state, 0, '5678');
    expect(state.onChange).not.toHaveBeenCalled();
    expect(state.onComplete).not.toHaveBeenCalled();
    expect(state.hiddenValue()).toBe('1234');
    expect(state.formValue()).toBe(prop === 'disabled' ? null : '1234');
  });
});

it('leaves an externally controlled value unchanged until its owner accepts the replacement', () => {
  const onChange = vi.fn();
  const onComplete = vi.fn();
  const { container } = render(
    <form>
      <PinInput name="pin" otp value="1234" onChange={onChange} onComplete={onComplete} />
    </form>
  );
  const inputs = container.querySelectorAll<HTMLInputElement>('input:not([type="hidden"])');
  act(() => inputs[2].focus());
  fireEvent.input(inputs[2], { target: { value: '5678' }, inputType: 'insertReplacementText' });
  expect(onChange).toHaveBeenCalledExactlyOnceWith('5678');
  expect(onComplete).toHaveBeenCalledExactlyOnceWith('5678');
  expect(Array.from(inputs, input => input.value).join('')).toBe('1234');
  expect(new FormData(container.querySelector('form')!).get('pin')).toBe('1234');
});
