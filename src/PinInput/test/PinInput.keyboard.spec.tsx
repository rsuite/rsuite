import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import PinInput, { type PinInputProps } from '../PinInput';
import '../styles/index.scss';

const types: { name: string; type: PinInputProps['type']; value: string }[] = [
  { name: 'numeric', type: 'number', value: '1234' },
  { name: 'alphabetic', type: 'alphabetic', value: 'ABCD' },
  { name: 'alphanumeric', type: 'alphanumeric', value: 'AB12' },
  { name: 'custom pattern', type: /./, value: 'AB12' }
];

function fixture(type: PinInputProps['type'], value: string, controlled: boolean, cancel = false) {
  const onChange = vi.fn();
  const onComplete = vi.fn();
  const onKeyDown = vi.fn();
  const onInput = vi.fn();
  const onSubmit = vi.fn();
  render(
    <form
      aria-label="PIN form"
      onSubmit={event => {
        event.preventDefault();
        onSubmit(new FormData(event.currentTarget).get('pin'));
      }}
    >
      <PinInput
        name="pin"
        type={type}
        {...(controlled ? { value } : { defaultValue: value })}
        onChange={onChange}
        onComplete={onComplete}
        onKeyDown={onKeyDown}
        onInput={onInput}
        onKeyDownCapture={cancel ? event => event.preventDefault() : undefined}
      />
      <button type="submit">Submit</button>
    </form>
  );
  const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
  act(() => inputs[1].focus());
  return { inputs, onChange, onComplete, onKeyDown, onInput, onSubmit };
}

function expectUnchanged(state: ReturnType<typeof fixture>, value: string, event?: KeyboardEvent) {
  expect(state.inputs.map(input => input.value).join('')).toBe(value);
  expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('pin')).toBe(value);
  expect(state.onChange).not.toHaveBeenCalled();
  expect(state.onComplete).not.toHaveBeenCalled();
  if (event) {
    expect(state.onKeyDown).toHaveBeenCalledTimes(1);
    expect(state.onKeyDown.mock.calls[0][0].nativeEvent).toBe(event);
  }
}

async function native(action: () => Promise<unknown>) {
  await act(async () => {
    await action();
  });
}

describe.each([false, true])('PinInput keyboard boundaries (controlled=%s)', controlled => {
  describe.each(types)('$name', ({ type, value }) => {
    it.each(['Tab', 'Enter', 'Home', 'End', 'Shift', 'Dead', 'F1', 'F12'])(
      'does not insert the named key %s',
      key => {
        const state = fixture(type, value, controlled);
        const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
        act(() => state.inputs[1].dispatchEvent(event));
        expectUnchanged(state, value, event);
        expect(event.defaultPrevented).toBe(false);
        expect(document.activeElement).toBe(state.inputs[1]);
      }
    );

    it.each(['ctrlKey', 'metaKey', 'altKey'] as const)(
      'does not insert a character from a %s shortcut',
      modifier => {
        const state = fixture(type, value, controlled);
        const event = new KeyboardEvent('keydown', {
          key: type === 'number' ? '5' : 'A',
          [modifier]: true,
          bubbles: true,
          cancelable: true
        });
        act(() => state.inputs[1].dispatchEvent(event));
        expectUnchanged(state, value, event);
        expect(event.defaultPrevented).toBe(false);
        expect(document.activeElement).toBe(state.inputs[1]);
      }
    );

    describe.each(['isComposing', 'keyCode'] as const)('%s composition key events', composition => {
      it.each(['5', 'Backspace', 'ArrowLeft', 'ArrowRight'])(
        'does not edit or move between slots on %s',
        key => {
          const state = fixture(type, value, controlled);
          const event = new KeyboardEvent('keydown', {
            key,
            ...(composition === 'isComposing' ? { isComposing: true } : { keyCode: 229 }),
            bubbles: true,
            cancelable: true
          });
          act(() => state.inputs[1].dispatchEvent(event));
          expectUnchanged(state, value, event);
          expect(event.defaultPrevented).toBe(false);
          expect(document.activeElement).toBe(state.inputs[1]);
        }
      );
    });
  });

  it.each(['5', 'Backspace', 'ArrowLeft', 'ArrowRight'])(
    'honors capture cancellation of %s',
    key => {
      const state = fixture('number', '1234', controlled, true);
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
      act(() => state.inputs[1].dispatchEvent(event));
      expectUnchanged(state, '1234', event);
      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(state.inputs[1]);
    }
  );

  it.each([false, true])('preserves native Tab navigation (shift=%s)', async shift => {
    const state = fixture('alphanumeric', 'AB12', controlled);
    await native(() => userEvent.tab({ shift }));
    expectUnchanged(state, 'AB12');
    expect(document.activeElement).toBe(state.inputs[shift ? 0 : 2]);
    const events = state.onKeyDown.mock.calls.map(([event]) => event.nativeEvent as KeyboardEvent);
    expect(events.some(event => event.key === 'Tab')).toBe(true);
    expect(events.every(event => event.isTrusted && !event.defaultPrevented)).toBe(true);
  });

  it('submits the unchanged PIN on native Enter without false completion', async () => {
    const state = fixture('alphanumeric', 'AB12', controlled);
    await native(() => userEvent.keyboard('{Enter}'));
    expectUnchanged(state, 'AB12');
    expect(state.onSubmit).toHaveBeenCalledExactlyOnceWith('AB12');
    expect(state.onKeyDown).toHaveBeenCalledTimes(1);
    expect(state.onKeyDown.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
    expect(state.onKeyDown.mock.calls[0][0].defaultPrevented).toBe(false);
  });

  it.each(['Control', 'Meta'])(
    'leaves native %s+A editing shortcuts to the input',
    async modifier => {
      const state = fixture('alphanumeric', 'AB12', controlled);
      await native(() => userEvent.keyboard(`{${modifier}>}a{/${modifier}}`));
      expectUnchanged(state, 'AB12');
      expect(document.activeElement).toBe(state.inputs[1]);
      const events = state.onKeyDown.mock.calls.map(
        ([event]) => event.nativeEvent as KeyboardEvent
      );
      expect(events.some(event => event.key.toLowerCase() === 'a')).toBe(true);
      expect(events.every(event => event.isTrusted && !event.defaultPrevented)).toBe(true);
    }
  );
});

describe('PinInput ordinary keyboard controls', () => {
  it('publishes native Delete as one value change', async () => {
    const state = fixture('number', '1234', false);
    act(() => {
      state.inputs[3].focus();
      state.inputs[3].select();
    });
    expect(state.inputs[3].selectionStart).toBe(0);
    expect(state.inputs[3].selectionEnd).toBe(1);
    await native(() => userEvent.keyboard('{Delete}'));
    expect(state.onChange).toHaveBeenCalledExactlyOnceWith('123');
    expect(state.onComplete).not.toHaveBeenCalled();
    expect(state.inputs[3]).toHaveValue('');
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('pin')).toBe('123');
    expect(state.onInput.mock.calls.every(([event]) => event.nativeEvent.isTrusted)).toBe(true);
  });

  it.each([false, true])('publishes an empty input event (controlled=%s)', controlled => {
    const state = fixture('number', '1234', controlled);
    fireEvent.change(state.inputs[1], { target: { value: '' } });
    expect(state.onChange).toHaveBeenCalledExactlyOnceWith('134');
    expect(state.onComplete).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(state.inputs[1]);
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('pin')).toBe(
      controlled ? '1234' : '134'
    );
  });

  it('commits consecutive native digits once per input and completes once', async () => {
    const state = fixture('number', '', false);
    act(() => state.inputs[0].focus());
    await native(() => userEvent.keyboard('1234'));
    expect(state.onChange.mock.calls).toEqual([['1'], ['12'], ['123'], ['1234']]);
    expect(state.onComplete).toHaveBeenCalledExactlyOnceWith('1234');
    expect(state.onInput).toHaveBeenCalledTimes(4);
    expect(state.onInput.mock.calls.every(([event]) => event.nativeEvent.isTrusted)).toBe(true);
    expect(document.activeElement).toBe(state.inputs[3]);
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('pin')).toBe('1234');
  });

  it('overwrites a filled slot through one native input event', async () => {
    const state = fixture('number', '1234', false);
    await native(() => userEvent.keyboard('5'));
    expect(state.onChange).toHaveBeenCalledExactlyOnceWith('1534');
    expect(state.onComplete).toHaveBeenCalledExactlyOnceWith('1534');
    expect(state.onInput).toHaveBeenCalledTimes(1);
    expect(state.onInput.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
    expect(state.onKeyDown.mock.calls[0][0].defaultPrevented).toBe(false);
  });

  describe.each(['g', 'y', 'gy'])('stateful custom pattern flags=%s', flags => {
    it('validates consecutive native input without changing the supplied lastIndex', async () => {
      const pattern = new RegExp('[A-F0-9]', flags);
      pattern.lastIndex = 2;
      const state = fixture(pattern, '', false);
      act(() => state.inputs[0].focus());
      await native(() => userEvent.keyboard('1234'));
      expect(state.onChange.mock.calls).toEqual([['1'], ['12'], ['123'], ['1234']]);
      expect(state.onComplete).toHaveBeenCalledExactlyOnceWith('1234');
      expect(pattern.lastIndex).toBe(2);
    });

    it('filters every pasted character without changing the supplied lastIndex', () => {
      const pattern = new RegExp('[A-F0-9]', flags);
      pattern.lastIndex = 1;
      const state = fixture(pattern, '', false);
      const event = new Event('paste', { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'clipboardData', {
        value: { getData: () => '1!A@2#B' }
      });
      act(() => state.inputs[0].dispatchEvent(event));
      expect(state.onChange).toHaveBeenCalledExactlyOnceWith('1A2B');
      expect(state.onComplete).toHaveBeenCalledExactlyOnceWith('1A2B');
      expect(pattern.lastIndex).toBe(1);
    });
  });

  it('accepts a native shifted letter without inserting the Shift key name', async () => {
    const state = fixture('alphabetic', '', false);
    act(() => state.inputs[0].focus());
    await native(() => userEvent.keyboard('{Shift>}A{/Shift}'));
    expect(state.onChange).toHaveBeenCalledExactlyOnceWith('A');
    expect(state.onComplete).not.toHaveBeenCalled();
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('pin')).toBe('A');
    expect(state.onKeyDown.mock.calls.every(([event]) => event.nativeEvent.isTrusted)).toBe(true);
  });

  it('retains native Backspace deletion and arrow navigation', async () => {
    const state = fixture('alphanumeric', 'AB12', false);
    act(() => state.inputs[3].focus());
    await native(() => userEvent.keyboard('{Backspace}'));
    expect(state.onChange).toHaveBeenCalledExactlyOnceWith('AB1');
    expect(document.activeElement).toBe(state.inputs[3]);
    await native(() => userEvent.keyboard('{ArrowLeft}'));
    expect(document.activeElement).toBe(state.inputs[2]);
    await native(() => userEvent.keyboard('{ArrowRight}'));
    expect(document.activeElement).toBe(state.inputs[3]);
    expect(state.onChange).toHaveBeenCalledTimes(1);
    expect(state.onComplete).not.toHaveBeenCalled();
  });
});
