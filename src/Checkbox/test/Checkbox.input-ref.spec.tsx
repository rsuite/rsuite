import React, { StrictMode } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Checkbox from '..';
import CheckboxGroup from '../../CheckboxGroup';

afterEach(cleanup);

describe('Checkbox inputRef lifecycle', () => {
  it.each([false, true])('retains the ref through controlled updates, StrictMode: %s', strict => {
    const inputRef = vi.fn();
    const fixture = (checked: boolean, indeterminate = false) => {
      const checkbox = (
        <Checkbox inputRef={inputRef} checked={checked} indeterminate={indeterminate}>
          Choice
        </Checkbox>
      );
      return strict ? <StrictMode>{checkbox}</StrictMode> : checkbox;
    };
    const view = render(fixture(false));
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    const initialCalls = inputRef.mock.calls.slice();
    input.focus();

    for (const [checked, indeterminate] of [
      [true, false],
      [false, true],
      [false, false]
    ]) {
      view.rerender(fixture(checked, indeterminate));
      expect(screen.getByRole('checkbox')).toBe(input);
      expect(input.checked).toBe(checked);
      expect(input.indeterminate).toBe(indeterminate);
      expect(input).toHaveFocus();
      expect(inputRef.mock.calls).toEqual(initialCalls);
    }

    view.unmount();
    expect(inputRef.mock.calls).toEqual([...initialCalls, [null]]);
  });

  it.each([false, true])('retains the ref through uncontrolled changes, StrictMode: %s', strict => {
    const inputRef = vi.fn();
    const onChange = vi.fn();
    const checkbox = (
      <Checkbox inputRef={inputRef} onChange={onChange} value="choice">
        Choice
      </Checkbox>
    );
    const view = render(strict ? <StrictMode>{checkbox}</StrictMode> : checkbox);
    const input = screen.getByRole('checkbox');
    const initialCalls = inputRef.mock.calls.slice();

    fireEvent.click(input);
    expect(input).toBeChecked();
    fireEvent.click(input);
    expect(input).not.toBeChecked();
    expect(onChange.mock.calls.map(([value, checked]) => [value, checked])).toEqual([
      ['choice', true],
      ['choice', false]
    ]);
    expect(screen.getByRole('checkbox')).toBe(input);
    expect(inputRef.mock.calls).toEqual(initialCalls);

    view.unmount();
    expect(inputRef.mock.calls).toEqual([...initialCalls, [null]]);
  });

  it('retains the ref when CheckboxGroup updates sibling and own selection', () => {
    const inputRef = vi.fn();
    const onChange = vi.fn();
    render(
      <CheckboxGroup defaultValue={[]} onChange={onChange}>
        <Checkbox inputRef={inputRef} value="first">
          First
        </Checkbox>
        <Checkbox value="second">Second</Checkbox>
      </CheckboxGroup>
    );
    const first = screen.getByRole('checkbox', { name: 'First' });
    const second = screen.getByRole('checkbox', { name: 'Second' });
    expect(inputRef.mock.calls).toEqual([[first]]);

    fireEvent.click(second);
    expect(first).not.toBeChecked();
    expect(second).toBeChecked();
    expect(inputRef.mock.calls).toEqual([[first]]);
    fireEvent.click(first);
    expect(first).toBeChecked();
    expect(onChange.mock.calls.map(([value]) => value)).toEqual([['second'], ['second', 'first']]);
    expect(inputRef.mock.calls).toEqual([[first]]);
  });

  it.skipIf(Number.parseInt(React.version, 10) < 19)(
    'keeps a React 19 cleanup registered until the input actually detaches',
    () => {
      const dispose = vi.fn();
      const inputRef = vi.fn((node: HTMLInputElement | null) => {
        if (node) return dispose;
      });
      const view = render(
        <Checkbox inputRef={inputRef} checked={false}>
          Choice
        </Checkbox>
      );
      const input = screen.getByRole('checkbox');

      view.rerender(
        <Checkbox inputRef={inputRef} checked>
          Updated choice
        </Checkbox>
      );
      expect(screen.getByRole('checkbox')).toBe(input);
      expect(input).toBeChecked();
      expect(dispose).not.toHaveBeenCalled();
      expect(inputRef.mock.calls).toEqual([[input]]);

      view.unmount();
      expect(dispose).toHaveBeenCalledTimes(1);
      expect(inputRef.mock.calls).toEqual([[input]]);
    }
  );

  it('updates object refs when the caller replaces inputRef', () => {
    const first = React.createRef<HTMLInputElement>();
    const second = React.createRef<HTMLInputElement>();
    const view = render(<Checkbox inputRef={first}>Choice</Checkbox>);
    const input = screen.getByRole('checkbox');
    expect(first.current).toBe(input);

    view.rerender(<Checkbox inputRef={second}>Choice</Checkbox>);
    expect(first.current).toBeNull();
    expect(second.current).toBe(input);
    view.unmount();
    expect(second.current).toBeNull();
  });

  it.each(['plaintext', 'checkable'] as const)('tracks actual input removal through %s', mode => {
    const inputRef = vi.fn();
    const fixture = (hidden: boolean) => (
      <Checkbox
        inputRef={inputRef}
        checked
        plaintext={mode === 'plaintext' && hidden}
        checkable={mode !== 'checkable' || !hidden}
      >
        Choice
      </Checkbox>
    );
    const view = render(fixture(false));
    const first = screen.getByRole('checkbox');
    view.rerender(fixture(true));
    expect(screen.queryByRole('checkbox')).toBeNull();
    expect(inputRef.mock.calls).toEqual([[first], [null]]);

    view.rerender(fixture(false));
    const second = screen.getByRole('checkbox');
    expect(second).not.toBe(first);
    expect(inputRef.mock.calls).toEqual([[first], [null], [second]]);
    view.unmount();
    expect(inputRef.mock.calls).toEqual([[first], [null], [second], [null]]);
  });
});
