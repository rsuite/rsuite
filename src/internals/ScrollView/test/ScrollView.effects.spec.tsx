import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ScrollView from '../ScrollView';

const Activity = (
  React as typeof React & {
    Activity?: React.ComponentType<{
      mode: 'visible' | 'hidden';
      children: React.ReactNode;
    }>;
  }
).Activity;
const NativeObserver = MutationObserver;
let observers: MutationObserver[];
let active: Set<MutationObserver>;
let deliveries: number;

beforeEach(() => {
  observers = [];
  active = new Set();
  deliveries = 0;
  // Preserve native observation and delivery while tracking resource ownership.
  class TrackedObserver extends NativeObserver {
    constructor(callback: MutationCallback) {
      super((records, observer) => {
        deliveries++;
        callback(records, observer);
      });
      observers.push(this);
    }

    observe(target: Node, options?: MutationObserverInit) {
      super.observe(target, options);
      active.add(this);
    }

    disconnect() {
      super.disconnect();
      active.delete(this);
    }
  }
  vi.stubGlobal('MutationObserver', TrackedObserver);
});

afterEach(() => {
  cleanup();
  observers.forEach(observer => observer.disconnect());
  vi.unstubAllGlobals();
});

async function mutate(element: HTMLElement, value: string) {
  await act(async () => {
    element.setAttribute('data-mutation', value);
    await Promise.resolve();
  });
}

describe('ScrollView observer lifecycle', () => {
  it.each([false, true])('releases native observation on unmount (StrictMode=%s)', async strict => {
    const content = (
      <ScrollView scrollShadow>
        <div>Content</div>
      </ScrollView>
    );
    const view = render(strict ? <React.StrictMode>{content}</React.StrictMode> : content);
    const element = screen.getByTestId('scroll-view');
    await mutate(element, 'mounted');
    expect(deliveries).toBeGreaterThan(0);
    expect(active.size).toBe(1);

    view.unmount();
    const before = deliveries;
    await mutate(element, 'unmounted');
    expect(deliveries).toBe(before);
    expect(active.size).toBe(0);
  });

  it('does not observe content when scroll shadows are disabled', async () => {
    render(
      <ScrollView>
        <div>Content</div>
      </ScrollView>
    );
    await mutate(screen.getByTestId('scroll-view'), 'disabled');
    expect(active.size).toBe(0);
    expect(deliveries).toBe(0);
  });

  it.skipIf(!Activity)(
    'disconnects while Activity is hidden and reconnects the preserved node',
    async () => {
      const Boundary = Activity!;
      const ui = (mode: 'visible' | 'hidden') => (
        <React.StrictMode>
          <Boundary mode={mode}>
            <ScrollView scrollShadow>
              <div>Content</div>
            </ScrollView>
          </Boundary>
        </React.StrictMode>
      );
      const view = render(ui('visible'));
      const element = screen.getByTestId('scroll-view');
      view.rerender(ui('hidden'));
      expect(getComputedStyle(element).display).toBe('none');
      const before = deliveries;
      await mutate(element, 'hidden');
      expect(deliveries).toBe(before);
      expect(active.size).toBe(0);

      view.rerender(ui('visible'));
      expect(screen.getByTestId('scroll-view')).toBe(element);
      expect(active.size).toBe(1);
      const visible = deliveries;
      await mutate(element, 'visible');
      expect(deliveries).toBeGreaterThan(visible);
      view.unmount();
      expect(active.size).toBe(0);
    }
  );
});
