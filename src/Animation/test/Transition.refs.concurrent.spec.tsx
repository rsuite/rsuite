import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Transition from '../Transition';

afterEach(() => {
  cleanup();
  expect(vi.mocked(console.error).mock.calls).toEqual([]);
});

describe('Animation child refs during concurrent rendering', () => {
  it('keeps the committed ref attached after abandoning a suspended ref change', async () => {
    const attached = vi.fn();
    const abandoned = vi.fn();
    const suspended = vi.fn();
    const pending = new Promise<never>(() => {});
    const Child = React.forwardRef<HTMLDivElement, { version: number }>(({ version }, ref) => {
      if (version === 1) {
        suspended();
        throw pending;
      }
      return <div ref={ref}>Version {version}</div>;
    });
    let update: React.Dispatch<React.SetStateAction<number>>;
    const Fixture = () => {
      const [version, setVersion] = React.useState(0);
      update = setVersion;
      return (
        <React.Suspense fallback={<div>Loading</div>}>
          <Transition in>
            <Child version={version} ref={version === 1 ? abandoned : attached} />
          </Transition>
        </React.Suspense>
      );
    };
    const { unmount } = render(<Fixture />);
    const node = screen.getByText('Version 0');
    expect(attached.mock.calls).toEqual([[node]]);

    await act(async () => {
      React.startTransition(() => update(1));
    });
    expect(suspended).toHaveBeenCalled();
    expect(screen.queryByText('Loading')).toBeNull();
    expect(screen.getByText('Version 0')).toBe(node);

    act(() => update(2));
    expect(screen.getByText('Version 2')).toBe(node);
    expect(attached.mock.calls).toEqual([[node]]);
    expect(abandoned).not.toHaveBeenCalled();
    unmount();
    expect(attached.mock.calls).toEqual([[node], [null]]);
  });

  it('balances StrictMode attachment and cleanup without detaching during animation commits', () => {
    const supportsCleanup = Number.parseInt(React.version, 10) >= 19;
    const active = new Set<HTMLDivElement>();
    const cleaned = vi.fn();
    const childRef = vi.fn((node: HTMLDivElement | null) => {
      if (node) {
        active.add(node);
        if (supportsCleanup) {
          return () => {
            active.delete(node);
            cleaned(node);
          };
        }
      } else {
        active.clear();
      }
    });
    const content = (open: boolean) => (
      <React.StrictMode>
        <Transition in={open} reduceMotion>
          <div ref={childRef} />
        </Transition>
      </React.StrictMode>
    );
    const { container, rerender, unmount } = render(content(true));
    const node = container.firstElementChild;
    expect([...active]).toEqual([node]);
    const attachments = childRef.mock.calls.length;
    const cleanups = cleaned.mock.calls.length;
    rerender(content(false));
    rerender(content(true));
    expect(childRef).toHaveBeenCalledTimes(attachments);
    expect(cleaned).toHaveBeenCalledTimes(cleanups);
    expect([...active]).toEqual([node]);
    unmount();
    expect(active.size).toBe(0);
    if (supportsCleanup) {
      expect(cleaned).toHaveBeenCalledTimes(attachments);
      expect(childRef.mock.calls.every(([value]) => value === node)).toBe(true);
    } else {
      expect(childRef.mock.calls).toEqual([[node], [null]]);
    }
  });
});
