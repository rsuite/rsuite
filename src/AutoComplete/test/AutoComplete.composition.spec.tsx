import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AutoComplete from '../AutoComplete';

const modes = ['controlled', 'uncontrolled'] as const;
const keys = ['Enter', 'ArrowDown', 'ArrowUp', 'Escape'] as const;
const signals = [
  { name: 'native isComposing', isComposing: true, keyCode: 0 },
  { name: 'legacy keyCode 229', isComposing: false, keyCode: 229 }
] as const;

type Key = (typeof keys)[number];
type Signal = (typeof signals)[number];

const ordinaryKeyCodes: Record<Key, number> = {
  Enter: 13,
  ArrowDown: 40,
  ArrowUp: 38,
  Escape: 27
};

// These are browser-created DOM events, not trusted hardware or OS IME input.
// Guard their actual properties instead of assigning a fake nativeEvent object.
function dispatchKey(input: HTMLInputElement, key: Key, signal?: Signal) {
  const keyCode = signal?.keyCode ?? ordinaryKeyCodes[key];
  const event = new KeyboardEvent('keydown', {
    key,
    keyCode,
    isComposing: signal?.isComposing ?? false,
    bubbles: true,
    cancelable: true
  });

  expect(event.key).toBe(key);
  expect(event.keyCode).toBe(keyCode);
  expect(event.isComposing).toBe(signal?.isComposing ?? false);
  expect(event.isTrusted).toBe(false);

  act(() => {
    input.dispatchEvent(event);
  });

  return event;
}

function renderFixture(mode: (typeof modes)[number], selectOnEnter = true) {
  const onChange = vi.fn();
  const onSelect = vi.fn();
  const onClose = vi.fn();
  const onMenuFocus = vi.fn();
  const onKeyDown = vi.fn();
  const onCompositionStart = vi.fn();
  const onCompositionEnd = vi.fn();

  function Fixture() {
    const [value, setValue] = React.useState('a');

    return (
      <AutoComplete
        data={['a', 'ab', 'ac']}
        {...(mode === 'controlled' ? { value, open: true } : { defaultValue: 'a' })}
        selectOnEnter={selectOnEnter}
        onChange={(nextValue, event) => {
          onChange(nextValue, event);
          if (mode === 'controlled') setValue(nextValue);
        }}
        onSelect={onSelect}
        onClose={onClose}
        onMenuFocus={onMenuFocus}
        onKeyDown={onKeyDown}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
      />
    );
  }

  render(<Fixture />);
  const input = screen.getByRole('combobox') as HTMLInputElement;
  act(() => input.focus());

  expect(document.activeElement).toBe(input);
  expect(input.value).toBe('a');
  expect(input.getAttribute('aria-expanded')).toBe('true');
  expect(screen.getByRole('listbox')).toBeTruthy();

  // A normal key proves the input event reaches the real menu/focus handlers.
  const prime = dispatchKey(input, 'ArrowDown');
  expect(prime.defaultPrevented).toBe(true);
  expect(onMenuFocus).toHaveBeenCalledTimes(1);
  expect(onMenuFocus.mock.calls[0][0]).toBe('ab');
  expect(onKeyDown).toHaveBeenCalledTimes(1);
  expect(onKeyDown.mock.calls[0][0].nativeEvent).toBe(prime);
  const activeId = input.getAttribute('aria-activedescendant');
  expect(activeId).toBeTruthy();
  expect(document.getElementById(activeId!)?.textContent).toBe('ab');

  [onChange, onSelect, onClose, onMenuFocus, onKeyDown].forEach(callback => callback.mockClear());

  return {
    input,
    activeId,
    onChange,
    onSelect,
    onClose,
    onMenuFocus,
    onKeyDown,
    onCompositionStart,
    onCompositionEnd
  };
}

describe.each(modes)('AutoComplete composition dispatch (%s)', mode => {
  describe.each(signals)('$name', signal => {
    it.each(keys)('leaves %s to composition and reports the public event once', key => {
      const fixture = renderFixture(mode);
      const { input, activeId, onChange, onSelect, onClose, onMenuFocus, onKeyDown } = fixture;
      const event = dispatchKey(input, key, signal);

      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onKeyDown.mock.calls[0][0].nativeEvent).toBe(event);
      expect(onKeyDown.mock.calls[0][0].target).toBe(input);
      expect(event.defaultPrevented).toBe(false);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
      expect(onMenuFocus).not.toHaveBeenCalled();
      expect(input.value).toBe('a');
      expect(input.getAttribute('aria-activedescendant')).toBe(activeId);
      expect(input.getAttribute('aria-expanded')).toBe('true');
      expect(screen.getByRole('listbox')).toBeTruthy();
      expect(document.activeElement).toBe(input);
    });
  });

  it('keeps ordinary arrows and Enter functional', () => {
    const { input, onChange, onSelect, onMenuFocus, onKeyDown } = renderFixture(mode);
    const down = dispatchKey(input, 'ArrowDown');
    const up = dispatchKey(input, 'ArrowUp');
    const enter = dispatchKey(input, 'Enter');

    expect(down.defaultPrevented).toBe(true);
    expect(up.defaultPrevented).toBe(true);
    expect(enter.defaultPrevented).toBe(true);
    expect(onMenuFocus.mock.calls.map(call => call[0])).toEqual(['ac', 'ab']);
    expect(onKeyDown.mock.calls.map(call => call[0].nativeEvent)).toEqual([down, up, enter]);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0]).toBe('ab');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe('ab');
    expect(input.value).toBe('ab');
  });

  it('keeps ordinary Escape close and public callback behavior', () => {
    const { input, onChange, onSelect, onClose, onKeyDown } = renderFixture(mode);
    const event = dispatchKey(input, 'Escape');

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.calls[0][0].nativeEvent).toBe(event);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('preserves selectOnEnter=false for an ordinary Enter', () => {
    const { input, onChange, onSelect, onClose, onKeyDown } = renderFixture(mode, false);
    const event = dispatchKey(input, 'Enter');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.calls[0][0].nativeEvent).toBe(event);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    expect(input.value).toBe('a');
  });

  it('forwards composition boundaries and accepts an ordinary Enter after composition end', () => {
    const { input, onChange, onSelect, onCompositionStart, onCompositionEnd } = renderFixture(mode);
    const start = new CompositionEvent('compositionstart', { bubbles: true, data: 'あ' });
    const end = new CompositionEvent('compositionend', { bubbles: true, data: 'あ' });

    act(() => {
      input.dispatchEvent(start);
    });

    expect(onCompositionStart).toHaveBeenCalledTimes(1);
    expect(onCompositionStart.mock.calls[0][0].nativeEvent).toBe(start);
    dispatchKey(input, 'Enter', signals[0]);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    act(() => {
      input.dispatchEvent(end);
    });

    expect(onCompositionEnd).toHaveBeenCalledTimes(1);
    expect(onCompositionEnd.mock.calls[0][0].nativeEvent).toBe(end);
    dispatchKey(input, 'Enter');
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('ab');
  });
});

describe.each(signals)('AutoComplete public composition callback control ($name)', signal => {
  it('allows the public handler to prevent default without selecting', () => {
    const { input, onChange, onSelect, onClose, onKeyDown } = renderFixture('controlled');
    onKeyDown.mockImplementation(event => event.preventDefault());
    const event = dispatchKey(input, 'Enter', signal);

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.calls[0][0].nativeEvent).toBe(event);
    expect(event.defaultPrevented).toBe(true);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    expect(input.value).toBe('a');
  });
});

describe.each(['empty options', 'disabled', 'readOnly'] as const)(
  'AutoComplete inactive overlay controls (%s)',
  state => {
    it.each(keys)('preserves the closed overlay gate for %s', key => {
      const onChange = vi.fn();
      const onSelect = vi.fn();
      const onClose = vi.fn();
      const onMenuFocus = vi.fn();
      const onKeyDown = vi.fn();

      render(
        <>
          <button>Outside action</button>
          <AutoComplete
            data={[]}
            defaultValue="a"
            disabled={state === 'disabled'}
            readOnly={state === 'readOnly'}
            onChange={onChange}
            onSelect={onSelect}
            onClose={onClose}
            onMenuFocus={onMenuFocus}
            onKeyDown={onKeyDown}
          />
        </>
      );

      const input = screen.getByRole('combobox') as HTMLInputElement;
      const outside = screen.getByRole('button', { name: 'Outside action' });
      act(() => {
        outside.focus();
        input.focus();
      });

      expect(input.disabled).toBe(state === 'disabled');
      expect(input.readOnly).toBe(state === 'readOnly');
      expect(document.activeElement).toBe(state === 'disabled' ? outside : input);
      expect(input.value).toBe('a');
      expect(input.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('listbox')).toBeNull();
      const activeId = input.getAttribute('aria-activedescendant');

      // The documented disabled/readOnly example uses empty data. These controls
      // verify native attributes/focus and no-overlay behavior, without assuming
      // readOnly itself suppresses a popup when nonempty data is supplied.
      // No open prop or synthetic focus is used to force an otherwise locked popup.
      // Preserve the existing no-overlay public callback gate, rather than extending it.
      for (const signal of [undefined, ...signals]) {
        const event = dispatchKey(input, key, signal);
        expect(event.defaultPrevented).toBe(false);
        expect(onKeyDown).not.toHaveBeenCalled();
        expect(onSelect).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
        expect(onMenuFocus).not.toHaveBeenCalled();
        expect(input.value).toBe('a');
        expect(input.getAttribute('aria-activedescendant')).toBe(activeId);
        expect(input.getAttribute('aria-expanded')).toBe('false');
        expect(screen.queryByRole('listbox')).toBeNull();
        expect(document.activeElement).toBe(state === 'disabled' ? outside : input);
      }
    });
  }
);
