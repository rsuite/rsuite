import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUpdatedRef } from '../useUpdatedRef';

describe('internals/hooks/useUpdatedRef', () => {
  it('Should return a ref with the initial value', () => {
    const { result } = renderHook(() => useUpdatedRef('initial'));

    expect(result.current.current).to.equal('initial');
  });

  it('Should update ref.current synchronously when value changes', () => {
    const { result, rerender } = renderHook(({ value }) => useUpdatedRef(value), {
      initialProps: { value: 'first' }
    });

    expect(result.current.current).to.equal('first');

    act(() => {
      rerender({ value: 'second' });
    });

    expect(result.current.current).to.equal('second');
  });

  it('Should maintain stable ref identity across re-renders', () => {
    const { result, rerender } = renderHook(({ value }) => useUpdatedRef(value), {
      initialProps: { value: 'a' }
    });

    const firstRef = result.current;

    act(() => {
      rerender({ value: 'b' });
    });

    expect(result.current).to.equal(firstRef);
  });

  it('Should work with object values', () => {
    const obj1 = { key: 'value1' };
    const obj2 = { key: 'value2' };

    const { result, rerender } = renderHook(({ value }) => useUpdatedRef(value), {
      initialProps: { value: obj1 }
    });

    expect(result.current.current).to.equal(obj1);

    act(() => {
      rerender({ value: obj2 });
    });

    expect(result.current.current).to.equal(obj2);
  });
});
