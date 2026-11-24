import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import PinInput, { type PinInputProps } from '../PinInput';
import '../styles/index.scss';

type Options = Partial<PinInputProps> & {
  controlled?: boolean;
  outside?: boolean;
  cancelReset?: boolean;
  fieldsetDisabled?: boolean;
};

function fixture(options: Options = {}) {
  const onChange = vi.fn();
  const onComplete = vi.fn();
  const onReset = vi.fn();
  const onSubmit = vi.fn();
  function Example({ options }: { options: Options }) {
    const {
      controlled,
      outside,
      cancelReset,
      fieldsetDisabled,
      defaultValue = '1234',
      ...props
    } = options;
    const pin = (
      <PinInput
        name="pin"
        defaultValue={defaultValue}
        {...(controlled ? { value: '5678' } : {})}
        {...props}
        onChange={onChange}
        onComplete={onComplete}
      />
    );
    return (
      <>
        <form
          id="first"
          onReset={event => {
            onReset(event.nativeEvent.isTrusted);
            if (cancelReset) event.preventDefault();
          }}
          onSubmit={event => {
            event.preventDefault();
            onSubmit(new FormData(event.currentTarget).getAll('pin'), event.nativeEvent.isTrusted);
          }}
        >
          <fieldset disabled={fieldsetDisabled}>{outside ? null : pin}</fieldset>
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </form>
        <form id="second" />
        {outside ? pin : null}
      </>
    );
  }
  const view = render(<Example options={options} />);
  const first = view.container.querySelector<HTMLFormElement>('#first')!;
  const second = view.container.querySelector<HTMLFormElement>('#second')!;
  const inputs = () => Array.from(view.container.querySelectorAll<HTMLInputElement>('input'));
  const segments = () => inputs().filter(input => input.type !== 'hidden');
  const hidden = () => inputs().find(input => input.type === 'hidden')!;
  const value = () =>
    segments()
      .map(input => input.value)
      .join('');
  return {
    ...view,
    first,
    second,
    inputs,
    segments,
    hidden,
    value,
    onChange,
    onComplete,
    onReset,
    onSubmit,
    update: (next: Options) => view.rerender(<Example options={next} />),
    edit: () => {
      fireEvent.change(segments()[0], { target: { value: '9' } });
      onChange.mockClear();
      onComplete.mockClear();
    }
  };
}

async function reset(state: ReturnType<typeof fixture>, form = state.first) {
  await act(async () => form.reset());
}

describe.each([false, true])('PinInput native forms (controlled=%s)', controlled => {
  it.each([
    { disabled: false, readOnly: false },
    { disabled: true, readOnly: false },
    { disabled: false, readOnly: true }
  ])('submits successful controls with disabled=$disabled readOnly=$readOnly', props => {
    const state = fixture({ controlled, ...props });
    expect(new FormData(state.first).getAll('pin')).toEqual(
      props.disabled ? [] : [controlled ? '5678' : '1234']
    );
    expect(state.hidden().disabled).toBe(props.disabled);
    expect(state.onChange).not.toHaveBeenCalled();
    expect(state.onComplete).not.toHaveBeenCalled();
  });

  it('inherits disabled fieldset exclusion', () => {
    const state = fixture({ controlled, fieldsetDisabled: true });
    expect(new FormData(state.first).getAll('pin')).toEqual([]);
    expect(state.inputs().every(input => input.matches(':disabled'))).toBe(true);
  });

  it('updates form participation when disabled changes', () => {
    const state = fixture({ controlled, disabled: true });
    expect(new FormData(state.first).getAll('pin')).toEqual([]);
    state.update({ controlled, disabled: false });
    expect(new FormData(state.first).getAll('pin')).toEqual([controlled ? '5678' : '1234']);
    state.update({ controlled, readOnly: true });
    expect(new FormData(state.first).getAll('pin')).toEqual([controlled ? '5678' : '1234']);
  });

  it('submits one unmasked value while the segments are masked', () => {
    const state = fixture({ controlled, mask: true });
    expect(state.segments().every(input => input.type === 'password')).toBe(true);
    expect(new FormData(state.first).getAll('pin')).toEqual([controlled ? '5678' : '1234']);
  });

  it.each([false, true])('associates all controls with an explicit owner (outside=%s)', outside => {
    const state = fixture({ controlled, outside, form: 'second' });
    expect(state.inputs().every(input => input.form === state.second)).toBe(true);
    expect(new FormData(state.first).getAll('pin')).toEqual([]);
    expect(new FormData(state.second).getAll('pin')).toEqual([controlled ? '5678' : '1234']);
    expect(state.container.querySelector('.rs-pin-input')).not.toHaveAttribute('form');
  });

  it.each([false, true])('resets without value callbacks (outside=%s)', async outside => {
    const state = fixture({ controlled, outside, form: outside ? 'first' : undefined });
    state.edit();
    expect(state.value()).toBe(controlled ? '5678' : '9234');
    await reset(state);
    expect(state.value()).toBe(controlled ? '5678' : '1234');
    expect(new FormData(state.first).getAll('pin')).toEqual([controlled ? '5678' : '1234']);
    expect(state.onChange).not.toHaveBeenCalled();
    expect(state.onComplete).not.toHaveBeenCalled();
  });

  it.each([false, true])('honors reset cancellation (outside=%s)', async outside => {
    const state = fixture({
      controlled,
      outside,
      form: outside ? 'first' : undefined,
      cancelReset: true
    });
    state.edit();
    await reset(state);
    expect(state.value()).toBe(controlled ? '5678' : '9234');
    expect(new FormData(state.first).getAll('pin')).toEqual([controlled ? '5678' : '9234']);
    expect(state.onChange).not.toHaveBeenCalled();
    expect(state.onComplete).not.toHaveBeenCalled();
  });

  it('honors a trusted native reset button', async () => {
    const state = fixture({ controlled });
    state.edit();
    await act(async () => userEvent.click(state.getByRole('button', { name: 'Reset' })));
    await waitFor(() => expect(state.value()).toBe(controlled ? '5678' : '1234'));
    expect(state.onReset).toHaveBeenCalledExactlyOnceWith(true);
    expect(state.onChange).not.toHaveBeenCalled();
    expect(state.onComplete).not.toHaveBeenCalled();
  });

  it.each([false, true])('submits with native Enter (outside=%s)', async outside => {
    const state = fixture({ controlled, outside, form: outside ? 'first' : undefined });
    act(() => state.segments()[0].focus());
    await act(async () => userEvent.keyboard('{Enter}'));
    expect(state.onSubmit).toHaveBeenCalledExactlyOnceWith([controlled ? '5678' : '1234'], true);
    expect(state.onChange).not.toHaveBeenCalled();
    expect(state.onComplete).not.toHaveBeenCalled();
  });
});

it('uses the latest defaultValue on an uncontrolled reset', async () => {
  const state = fixture();
  state.edit();
  state.update({ defaultValue: '56' });
  expect(state.value()).toBe('9234');
  await reset(state);
  expect(state.value()).toBe('56');
  expect(new FormData(state.first).get('pin')).toBe('56');
  expect(state.onChange).not.toHaveBeenCalled();
  expect(state.onComplete).not.toHaveBeenCalled();
});

it('clears an uncontrolled PIN with an empty default on reset', async () => {
  const state = fixture({ defaultValue: '' });
  state.edit();
  expect(state.value()).toBe('9');
  await reset(state);
  expect(state.value()).toBe('');
  expect(new FormData(state.first).get('pin')).toBe('');
  expect(state.onChange).not.toHaveBeenCalled();
});

it('ignores a queued reset after the form owner changes', async () => {
  const state = fixture({ outside: true, form: 'first' });
  state.edit();
  act(() => state.first.reset());
  state.update({ outside: true, form: 'second' });
  await act(async () => Promise.resolve());
  expect(state.value()).toBe('9234');
  expect(new FormData(state.second).get('pin')).toBe('9234');
  await reset(state, state.first);
  expect(state.value()).toBe('9234');
  await reset(state, state.second);
  expect(state.value()).toBe('1234');
  expect(state.onChange).not.toHaveBeenCalled();
  expect(state.onComplete).not.toHaveBeenCalled();
});

it('allows a bubbling listener to cancel the reset after the input subscription', async () => {
  const state = fixture();
  state.edit();
  const cancel = (event: Event) => event.preventDefault();
  document.addEventListener('reset', cancel);
  try {
    await reset(state);
    expect(state.value()).toBe('9234');
    expect(new FormData(state.first).get('pin')).toBe('9234');
    expect(state.onChange).not.toHaveBeenCalled();
  } finally {
    document.removeEventListener('reset', cancel);
  }
});

describe.each([false, true])('PinInput autofill and native forms (controlled=%s)', controlled => {
  it.each([false, true])('resets and submits an autofilled OTP (outside=%s)', async outside => {
    const state = fixture({ controlled, outside, form: 'first', otp: true });
    act(() => state.segments()[2].focus());
    fireEvent.input(state.segments()[2], {
      target: { value: '9876' },
      inputType: 'insertReplacementText'
    });
    expect(state.onChange).toHaveBeenCalledExactlyOnceWith('9876');
    expect(state.onComplete).toHaveBeenCalledExactlyOnceWith('9876');
    expect(state.value()).toBe(controlled ? '5678' : '9876');
    expect(new FormData(state.first).getAll('pin')).toEqual([controlled ? '5678' : '9876']);
    state.onChange.mockClear();
    state.onComplete.mockClear();

    await act(async () => {
      await userEvent.click(state.first.querySelector<HTMLButtonElement>('button[type="reset"]')!);
    });
    await waitFor(() => expect(state.value()).toBe(controlled ? '5678' : '1234'));
    expect(state.onReset).toHaveBeenCalledExactlyOnceWith(true);
    expect(state.onChange).not.toHaveBeenCalled();
    expect(state.onComplete).not.toHaveBeenCalled();

    await act(async () => {
      await userEvent.click(state.segments()[0]);
      await userEvent.keyboard('{Enter}');
    });
    expect(state.onSubmit).toHaveBeenCalledExactlyOnceWith([controlled ? '5678' : '1234'], true);
    expect(state.onChange).not.toHaveBeenCalled();
    expect(state.onComplete).not.toHaveBeenCalled();
  });
});
