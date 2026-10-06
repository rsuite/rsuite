import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from '@vitest/browser/context';
import Tabs from '../Tabs';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

const mounts: { root: Root; container: HTMLDivElement }[] = [];

function mount(element: React.ReactNode) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  mounts.push({ root, container });
  flushSync(() => root.render(element));
  return container;
}

afterEach(() => {
  mounts.splice(0).forEach(({ root, container }) => {
    flushSync(() => root.unmount());
    container.remove();
  });
});

const selectedKeys = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>('[role="tab"][aria-selected="true"]')).map(
    tab => tab.dataset.eventKey
  );

const keysObserved = (container: HTMLElement) => {
  const events: { key: string; trusted: boolean; target: string | undefined }[] = [];
  container.addEventListener('keydown', event => {
    events.push({
      key: event.key,
      trusted: event.isTrusted,
      target: (event.target as HTMLElement).dataset.eventKey
    });
  });
  return events;
};

const directions = [
  { label: 'horizontal LTR', rtl: false, vertical: false, forward: 'ArrowRight' },
  { label: 'horizontal RTL', rtl: true, vertical: false, forward: 'ArrowLeft' },
  { label: 'vertical RTL', rtl: true, vertical: true, forward: 'ArrowDown' }
];

describe('Tabs native focus origin', () => {
  it.each(directions)(
    'moves from the focused tab while controlled selection is retained: $label',
    async ({ rtl, vertical, forward }) => {
      const onSelect = vi.fn();
      const container = mount(
        <CustomProvider rtl={rtl}>
          <Tabs activeKey="a" vertical={vertical} onSelect={onSelect}>
            <Tabs.Tab eventKey="a" title="A">
              Panel A
            </Tabs.Tab>
            <Tabs.Tab eventKey="b" title="B">
              Panel B
            </Tabs.Tab>
            <Tabs.Tab eventKey="c" title="C">
              Panel C
            </Tabs.Tab>
          </Tabs>
        </CustomProvider>
      );
      const tabs = Array.from(container.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
      const observed = keysObserved(container);
      tabs[0].focus();
      expect(document.activeElement).toBe(tabs[0]);

      await userEvent.keyboard(`{${forward}}`);
      expect(document.activeElement).toBe(tabs[1]);
      expect(selectedKeys(container)).toEqual(['a']);
      expect(onSelect.mock.calls.map(([key]) => key)).toEqual(['b']);

      await userEvent.keyboard(`{${forward}}`);
      expect({
        focused: (document.activeElement as HTMLElement).dataset.eventKey,
        selected: selectedKeys(container),
        requested: onSelect.mock.calls.map(([key]) => key),
        observed
      }).toEqual({
        focused: 'c',
        selected: ['a'],
        requested: ['b', 'c'],
        observed: [
          { key: forward, trusted: true, target: 'a' },
          { key: forward, trusted: true, target: 'b' }
        ]
      });
    }
  );

  it.each(directions.slice(0, 2))(
    'keeps uncontrolled selection and focus together: $label',
    async ({ rtl, forward }) => {
      const onSelect = vi.fn();
      const container = mount(
        <CustomProvider rtl={rtl}>
          <Tabs defaultActiveKey="a" onSelect={onSelect}>
            <Tabs.Tab eventKey="a" title="A">
              Panel A
            </Tabs.Tab>
            <Tabs.Tab eventKey="b" title="B">
              Panel B
            </Tabs.Tab>
            <Tabs.Tab eventKey="c" title="C">
              Panel C
            </Tabs.Tab>
          </Tabs>
        </CustomProvider>
      );
      const tabs = Array.from(container.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
      const observed = keysObserved(container);
      tabs[0].focus();
      await userEvent.keyboard(`{${forward}}`);
      expect(document.activeElement).toBe(tabs[1]);
      await expect.poll(() => selectedKeys(container)).toEqual(['b']);

      await userEvent.keyboard(`{${forward}}`);
      expect(document.activeElement).toBe(tabs[2]);
      await expect.poll(() => selectedKeys(container)).toEqual(['c']);
      expect(onSelect.mock.calls.map(([key]) => key)).toEqual(['b', 'c']);
      expect(observed).toEqual([
        { key: forward, trusted: true, target: 'a' },
        { key: forward, trusted: true, target: 'b' }
      ]);
    }
  );

  it('skips disabled tabs and wraps from the last enabled tab', async () => {
    const onSelect = vi.fn();
    const container = mount(
      <Tabs defaultActiveKey="a" onSelect={onSelect}>
        <Tabs.Tab eventKey="a" title="A">
          Panel A
        </Tabs.Tab>
        <Tabs.Tab eventKey="b" title="B" disabled>
          Panel B
        </Tabs.Tab>
        <Tabs.Tab eventKey="c" title="C">
          Panel C
        </Tabs.Tab>
        <Tabs.Tab eventKey="d" title="D">
          Panel D
        </Tabs.Tab>
      </Tabs>
    );
    const tabs = Array.from(container.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const observed = keysObserved(container);
    tabs[0].focus();

    for (const [tab, key] of [
      [tabs[2], 'c'],
      [tabs[3], 'd'],
      [tabs[0], 'a']
    ] as const) {
      await userEvent.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(tab);
      await expect.poll(() => selectedKeys(container)).toEqual([key]);
    }
    expect(tabs[1].getAttribute('aria-disabled')).toBe('true');
    expect(tabs[1].getAttribute('data-disabled')).toBe('true');
    expect(onSelect.mock.calls.map(([key]) => key)).toEqual(['c', 'd', 'a']);
    expect(observed).toEqual([
      { key: 'ArrowRight', trusted: true, target: 'a' },
      { key: 'ArrowRight', trusted: true, target: 'c' },
      { key: 'ArrowRight', trusted: true, target: 'd' }
    ]);
  });
});
