import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useFocusItemValue from '../hooks/useFocusItemValue';
import getOptionKey from '../getOptionKey';

function menuFor(values: unknown[]) {
  const menu = document.createElement('div');
  for (const value of values) {
    const row = document.createElement('div');
    row.dataset.key = String(value);
    row.dataset.pickerKey = getOptionKey(value);
    row.setAttribute('aria-disabled', 'false');
    menu.append(row);
  }
  return menu;
}

const down = () => ({ key: 'ArrowDown', preventDefault: vi.fn() });

describe('useFocusItemValue', () => {
  it('bounds data reads for ordinary-list keyboard navigation', () => {
    const size = 256;
    let reads = 0;
    const data = Array.from({ length: size }, (_, value) => ({
      get value() {
        reads++;
        return value;
      }
    }));
    const callback = vi.fn();
    const target = menuFor(Array.from({ length: size }, (_, index) => index));
    const { result } = renderHook(() =>
      useFocusItemValue(0, {
        data,
        target,
        focusToOption: false,
        callback
      })
    );
    reads = 0;
    act(() => result.current.onKeyDown(down()));
    expect(result.current.focusItemValue).toBe(1);
    expect(callback).toHaveBeenCalledOnce();
    expect(reads).toBeLessThanOrEqual(size * 4);
  });

  it('follows current DOM order while distinguishing numbers and strings', () => {
    const target = menuFor(['0', 0, 'number:0', 'last']);
    target.children[2].setAttribute('aria-disabled', 'true');
    const data = [{ value: 0 }, { value: 'number:0' }, { value: 'last' }, { value: '0' }];
    const { result } = renderHook(() =>
      useFocusItemValue<string | number, { value: string | number }>('0', {
        data,
        target,
        focusToOption: false
      })
    );
    act(() => result.current.onKeyDown(down()));
    expect(result.current.focusItemValue).toBe(0);
    act(() => result.current.onKeyDown(down()));
    expect(result.current.focusItemValue).toBe('last');
    act(() => result.current.onKeyDown(down()));
    expect(result.current.focusItemValue).toBe('0');
    target.prepend(target.lastElementChild!);
    act(() => result.current.onKeyDown(down()));
    expect(result.current.focusItemValue).toBe(0);
  });

  it('sees in-place data and rendered-option changes on the next key', () => {
    const target = menuFor([1, 2]);
    const data = [{ value: 1 }, { value: 2 }];
    const { result } = renderHook(() =>
      useFocusItemValue(1, { data, target, focusToOption: false })
    );
    act(() => result.current.onKeyDown(down()));
    expect(result.current.focusItemValue).toBe(2);
    data[0].value = 3;
    const row = target.firstElementChild as HTMLElement;
    row.dataset.key = '3';
    row.dataset.pickerKey = getOptionKey(3);
    act(() => result.current.onKeyDown(down()));
    expect(result.current.focusItemValue).toBe(3);
  });
});
