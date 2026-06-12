import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEnsuredRef } from '../useEnsuredRef';

describe('internals/hooks/useEnsuredRef', () => {
  it('Should return a new ref when no ref is provided (null)', () => {
    const { result } = renderHook(() => useEnsuredRef<HTMLDivElement>(null));

    expect(result.current).to.be.an('object');
    expect(result.current).to.have.property('current');
  });

  it('Should return a new ref when no ref is provided (undefined)', () => {
    const { result } = renderHook(() => useEnsuredRef<HTMLDivElement>(undefined));

    expect(result.current).to.be.an('object');
    expect(result.current).to.have.property('current');
  });

  it('Should return the provided ref when one is given', () => {
    const externalRef = React.createRef<HTMLDivElement>();

    const { result } = renderHook(() => useEnsuredRef<HTMLDivElement>(externalRef));

    expect(result.current).to.equal(externalRef);
  });

  it('Should return a stable fallback ref across re-renders', () => {
    const { result, rerender } = renderHook(() => useEnsuredRef<HTMLDivElement>(null));

    const firstRef = result.current;

    rerender();

    expect(result.current).to.equal(firstRef);
  });

  it('Should return the same external ref across re-renders', () => {
    const externalRef = React.createRef<HTMLDivElement>();

    const { result, rerender } = renderHook(() => useEnsuredRef<HTMLDivElement>(externalRef));

    const firstRef = result.current;

    rerender();

    expect(result.current).to.equal(externalRef);
    expect(result.current).to.equal(firstRef);
  });
});
