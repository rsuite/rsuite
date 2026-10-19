import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Toggle from '../Toggle';

function assertUncontrolledReset(initialChecked: boolean) {
  const onChange = vi.fn();
  function View({ tick }: { tick: number }) {
    return (
      <form data-parent-tick={tick}>
        <Toggle name="choice" defaultChecked={initialChecked} onChange={onChange} />
      </form>
    );
  }
  const mounted = render(<View tick={0} />);
  const form = mounted.container.querySelector('form')!;
  const input = mounted.getByRole('switch') as HTMLInputElement;
  const expectedDefaultValue = initialChecked ? ['on'] : [];

  expect(input.checked).toBe(initialChecked);
  expect(input.defaultChecked).toBe(initialChecked);
  expect(new FormData(form).getAll('choice')).toEqual(expectedDefaultValue);

  fireEvent.click(input);
  expect(input.checked).toBe(!initialChecked);
  expect(input.getAttribute('aria-checked')).toBe(String(!initialChecked));
  expect(new FormData(form).getAll('choice')).toEqual(initialChecked ? [] : ['on']);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenNthCalledWith(1, !initialChecked, expect.any(Object));

  act(() => form.reset());
  expect(input.checked).toBe(initialChecked);
  expect(input.defaultChecked).toBe(initialChecked);
  expect(new FormData(form).getAll('choice')).toEqual(expectedDefaultValue);
  expect(onChange).toHaveBeenCalledTimes(1);

  mounted.rerender(<View tick={1} />);
  expect(mounted.getByRole('switch')).toBe(input);
  expect(form.getAttribute('data-parent-tick')).toBe('1');
  expect(input.checked).toBe(initialChecked);
  expect(input.defaultChecked).toBe(initialChecked);
  expect(new FormData(form).getAll('choice')).toEqual(expectedDefaultValue);
  expect(onChange).toHaveBeenCalledTimes(1);
  mounted.unmount();
}

describe('Toggle native reset retention', () => {
  it('TNR-01 preserves native default true after click reset and parent render', () => {
    assertUncontrolledReset(true);
  });

  it('TNR-02 preserves native default false after click reset and parent render', () => {
    assertUncontrolledReset(false);
  });

  it('TNR-03 retains controlled ownership without checked and defaultChecked warnings', () => {
    const onChange = vi.fn();
    function View({ tick, checked }: { tick: number; checked: boolean }) {
      return (
        <form data-parent-tick={tick}>
          <Toggle name="choice" checked={checked} defaultChecked={!checked} onChange={onChange} />
        </form>
      );
    }
    const mounted = render(<View tick={0} checked />);
    const form = mounted.container.querySelector('form')!;
    const input = mounted.getByRole('switch') as HTMLInputElement;

    fireEvent.click(input);
    expect(input.checked).toBe(true);
    expect(new FormData(form).getAll('choice')).toEqual(['on']);
    expect(onChange).toHaveBeenNthCalledWith(1, false, expect.any(Object));

    act(() => form.reset());
    mounted.rerender(<View tick={1} checked />);
    expect(input.checked).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('true');
    expect(new FormData(form).getAll('choice')).toEqual(['on']);
    expect(onChange).toHaveBeenCalledTimes(1);

    mounted.rerender(<View tick={2} checked={false} />);
    fireEvent.click(input);
    expect(input.checked).toBe(false);
    expect(input.getAttribute('aria-checked')).toBe('false');
    expect(new FormData(form).getAll('choice')).toEqual([]);
    expect(onChange).toHaveBeenNthCalledWith(2, true, expect.any(Object));
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(console.error).not.toHaveBeenCalled();
    mounted.unmount();
  });

  it('TNR-04 rejects readOnly and loading changes to native checked and FormData', () => {
    for (const lockedProp of ['readOnly', 'loading'] as const) {
      for (const initialChecked of [false, true]) {
        const onChange = vi.fn();
        const onClick = vi.fn();
        function View({ tick }: { tick: number }) {
          return (
            <form data-parent-tick={tick}>
              <Toggle
                name="choice"
                label="Choice"
                defaultChecked={initialChecked}
                onChange={onChange}
                onClick={onClick}
                {...{ [lockedProp]: true }}
              />
            </form>
          );
        }
        const mounted = render(<View tick={0} />);
        const form = mounted.container.querySelector('form')!;
        const input = mounted.getByRole('switch') as HTMLInputElement;
        const expectedValue = initialChecked ? ['on'] : [];

        fireEvent.click(input);
        expect(input.checked).toBe(initialChecked);
        expect(input.getAttribute('aria-checked')).toBe(String(initialChecked));
        expect(new FormData(form).getAll('choice')).toEqual(expectedValue);
        expect(onChange).not.toHaveBeenCalled();
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0].target).toBe(input);
        expect(onClick.mock.calls[0][0].nativeEvent.target).toBe(input);
        expect(onClick.mock.calls[0][0].defaultPrevented).toBe(true);

        act(() => form.reset());
        mounted.rerender(<View tick={1} />);
        fireEvent.click(mounted.getByText('Choice'));
        expect(input.checked).toBe(initialChecked);
        expect(input.getAttribute('aria-checked')).toBe(String(initialChecked));
        expect(new FormData(form).getAll('choice')).toEqual(expectedValue);
        expect(onChange).not.toHaveBeenCalled();
        expect(onClick).toHaveBeenCalledTimes(2);
        expect(onClick.mock.calls[1][0].target).toBe(input);
        mounted.unmount();
      }
    }
  });

  it('TNR-05 preserves reset native values when readOnly or loading is enabled before activation', () => {
    for (const lockedProp of ['readOnly', 'loading'] as const) {
      for (const initialChecked of [false, true]) {
        const onChange = vi.fn();
        function View({ tick, locked }: { tick: number; locked: boolean }) {
          return (
            <form data-parent-tick={tick}>
              <Toggle
                name="choice"
                label="Choice"
                defaultChecked={initialChecked}
                onChange={onChange}
                {...{ [lockedProp]: locked }}
              />
            </form>
          );
        }
        const mounted = render(<View tick={0} locked={false} />);
        const form = mounted.container.querySelector('form')!;
        const input = mounted.getByRole('switch') as HTMLInputElement;
        const expectedValue = initialChecked ? ['on'] : [];

        fireEvent.click(input);
        expect(input.checked).toBe(!initialChecked);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenNthCalledWith(1, !initialChecked, expect.any(Object));
        act(() => form.reset());
        expect(input.checked).toBe(initialChecked);
        expect(new FormData(form).getAll('choice')).toEqual(expectedValue);

        mounted.rerender(<View tick={1} locked />);
        expect(input.checked).toBe(initialChecked);
        fireEvent.click(input);
        expect(input.checked).toBe(initialChecked);
        expect(new FormData(form).getAll('choice')).toEqual(expectedValue);
        fireEvent.click(mounted.getByText('Choice'));
        expect(input.checked).toBe(initialChecked);
        expect(new FormData(form).getAll('choice')).toEqual(expectedValue);
        expect(onChange).toHaveBeenCalledTimes(1);
        mounted.unmount();
      }
    }
  });
});
