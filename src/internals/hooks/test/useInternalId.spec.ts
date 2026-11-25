import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInternalId } from '../useInternalId';

describe('internals/hooks/useInternalId', () => {
  it('Should return a non-empty string', () => {
    const { result } = renderHook(() => useInternalId());

    expect(result.current).to.be.a('string');
    expect(result.current.length).to.be.greaterThan(0);
  });

  it('Should include the provided namespace in the id', () => {
    const { result } = renderHook(() => useInternalId('MyComponent'));

    expect(result.current).to.contain('MyComponent');
  });

  it('Should return a stable id across re-renders', () => {
    const { result, rerender } = renderHook(() => useInternalId('Test'));

    const firstId = result.current;

    act(() => {
      rerender();
    });

    expect(result.current).to.equal(firstId);
  });

  it('Should generate unique ids for different hook instances', () => {
    const { result: result1 } = renderHook(() => useInternalId('Test'));
    const { result: result2 } = renderHook(() => useInternalId('Test'));

    expect(result1.current).to.not.equal(result2.current);
  });

  it('Should work without a namespace argument', () => {
    const { result } = renderHook(() => useInternalId());

    expect(result.current).to.be.a('string');
    expect(result.current.length).to.be.greaterThan(0);
  });
});
