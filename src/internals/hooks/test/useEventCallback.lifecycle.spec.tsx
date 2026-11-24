import React, { StrictMode, Suspense, startTransition, useLayoutEffect, useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useEventCallback from '../useEventCallback';

describe('useEventCallback commit lifecycle', () => {
  it('updates before a parent layout effect while keeping its identity in StrictMode', () => {
    let callback: () => number;
    const calls: number[] = [];
    function Child({ value }: { value: number }) {
      callback = useEventCallback(() => value);
      return null;
    }
    function Parent({ value }: { value: number }) {
      useLayoutEffect(() => {
        calls.push(callback());
      }, [value]);
      return <Child value={value} />;
    }
    const { rerender } = render(
      <StrictMode>
        <Parent value={1} />
      </StrictMode>
    );
    const initial = callback!;
    expect(calls.at(-1)).toBe(1);
    rerender(
      <StrictMode>
        <Parent value={2} />
      </StrictMode>
    );
    expect(calls.at(-1)).toBe(2);
    expect(callback!).toBe(initial);
    expect(initial()).toBe(2);
  });

  it('ignores an abandoned suspended render and publishes the next committed callback', async () => {
    let callback: () => string;
    let update: (value: string) => void;
    let suspendedRenders = 0;
    const pending = new Promise<void>(() => {});
    function Child({ value }: { value: string }) {
      callback = useEventCallback(() => value);
      if (value === 'suspended') {
        suspendedRenders++;
        throw pending;
      }
      return <span>{value}</span>;
    }
    function Fixture() {
      const [value, setValue] = useState('initial');
      update = setValue;
      return (
        <Suspense fallback="Loading">
          <Child value={value} />
        </Suspense>
      );
    }
    render(<Fixture />);
    const initial = callback!;
    await act(async () => {
      startTransition(() => update('suspended'));
    });
    expect(suspendedRenders).toBeGreaterThan(0);
    expect(screen.getByText('initial')).toBeTruthy();
    expect(initial()).toBe('initial');
    act(() => update('committed'));
    expect(screen.getByText('committed')).toBeTruthy();
    expect(callback!).toBe(initial);
    expect(initial()).toBe('committed');
  });
});
