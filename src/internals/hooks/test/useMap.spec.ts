import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useMap } from '../useMap';

describe('internals/hooks/useMap', () => {
  it('Should return a map-like object with has, get, set, and clear methods', () => {
    const { result } = renderHook(() => useMap<string, number>());

    expect(result.current.has).to.be.a('function');
    expect(result.current.get).to.be.a('function');
    expect(result.current.set).to.be.a('function');
    expect(result.current.clear).to.be.a('function');
  });

  it('Should return false for has() on an empty map', () => {
    const { result } = renderHook(() => useMap<string, number>());

    expect(result.current.has('key')).to.equal(false);
  });

  it('Should return undefined for get() on an empty map', () => {
    const { result } = renderHook(() => useMap<string, number>());

    expect(result.current.get('key')).to.equal(undefined);
  });

  it('Should set and get a value', () => {
    const { result } = renderHook(() => useMap<string, number>());

    act(() => {
      result.current.set('foo', 42);
    });

    expect(result.current.has('foo')).to.equal(true);
    expect(result.current.get('foo')).to.equal(42);
  });

  it('Should return false for has() after clear()', () => {
    const { result } = renderHook(() => useMap<string, number>());

    act(() => {
      result.current.set('foo', 1);
    });

    expect(result.current.has('foo')).to.equal(true);

    act(() => {
      result.current.clear();
    });

    expect(result.current.has('foo')).to.equal(false);
  });

  it('Should overwrite an existing value when set() is called with the same key', () => {
    const { result } = renderHook(() => useMap<string, number>());

    act(() => {
      result.current.set('foo', 1);
    });

    act(() => {
      result.current.set('foo', 99);
    });

    expect(result.current.get('foo')).to.equal(99);
  });

  it('Should handle multiple keys independently', () => {
    const { result } = renderHook(() => useMap<string, number>());

    act(() => {
      result.current.set('a', 1);
      result.current.set('b', 2);
    });

    expect(result.current.get('a')).to.equal(1);
    expect(result.current.get('b')).to.equal(2);
    expect(result.current.has('c')).to.equal(false);
  });
});
