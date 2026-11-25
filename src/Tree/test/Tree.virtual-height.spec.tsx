import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Tree from '..';
import CheckTree from '../../CheckTree';
import TreePicker from '../../TreePicker';
import CheckTreePicker from '../../CheckTreePicker';
import '../styles/index.scss';
import '../../CheckTree/styles/index.scss';
import '../../TreePicker/styles/index.scss';
import '../../CheckTreePicker/styles/index.scss';

const components = [
  { name: 'Tree', Component: Tree, picker: false },
  { name: 'CheckTree', Component: CheckTree, picker: false },
  { name: 'TreePicker', Component: TreePicker, picker: true },
  { name: 'CheckTreePicker', Component: CheckTreePicker, picker: true }
];

const data = Array.from({ length: 100 }, (_, value) => ({ value, label: `Node ${value}` }));

describe.each(components)('$name virtual height', ({ name, Component, picker }) => {
  const heightProps = (height: number) =>
    picker ? { treeHeight: height, defaultOpen: true, searchable: false } : { height };

  const getViewport = () =>
    screen
      .getByRole('tree')
      .querySelector<HTMLElement>('.rs-tree-virt-list,.rs-check-tree-virt-list')!;

  const expectViewportHeight = (height: number) => {
    const viewport = getViewport();
    expect(viewport.clientHeight).toBe(height);
    const bounds = viewport.getBoundingClientRect();
    const treeBounds = screen.getByRole('tree').getBoundingClientRect();
    expect(bounds.top).toBeGreaterThanOrEqual(treeBounds.top);
    expect(bounds.bottom).toBeLessThanOrEqual(treeBounds.bottom);
  };

  it('updates the viewport when its public height changes without replacing focused rows', async () => {
    const onChange = vi.fn();
    const view = (height: number) => (
      <Component data={data} virtualized onChange={onChange} {...heightProps(height)} />
    );
    const { rerender } = render(view(180));
    const tree = screen.getByRole('tree');
    const viewport = getViewport();
    await waitFor(() => expect(viewport.clientHeight).toBe(180));
    fireEvent.keyDown(tree, { key: 'ArrowDown' });
    const focused = document.activeElement;
    expect(focused).toBe(screen.getByRole('treeitem', { name: 'Node 0' }));

    for (const height of [420, 96, 240]) {
      rerender(view(height));
      expectViewportHeight(height);
      expect(tree.querySelector('.rs-tree-virt-list,.rs-check-tree-virt-list')).toBe(viewport);
      expect(document.activeElement).toBe(focused);
    }
    expect(onChange).not.toHaveBeenCalled();
  });

  it('honors listProps height overrides and resumes the public height when removed', async () => {
    const view = (height: number, override?: number) => (
      <Component
        data={data}
        virtualized
        {...heightProps(height)}
        listProps={override === undefined ? undefined : { height: override }}
      />
    );
    const { rerender } = render(view(180, 420));
    await waitFor(() => expectViewportHeight(420));
    rerender(view(96, 420));
    await waitFor(() => expectViewportHeight(420));
    rerender(view(96));
    await waitFor(() => expectViewportHeight(96));
    rerender(view(0));
    await waitFor(() => expectViewportHeight(0));
    rerender(view(240));
    await waitFor(() => expectViewportHeight(240));
  });

  it('keeps observing a parent whose CSS height changes without a React render', async () => {
    render(<Component data={data} virtualized {...heightProps(180)} />);
    const parent = screen
      .getByRole('tree')
      .querySelector<HTMLElement>('.rs-tree-root,.rs-check-tree-root')!;
    const viewport = getViewport();
    const started = performance.now();
    const elapsedMs = () => Math.round(performance.now() - started);
    const visibility = [{ state: document.visibilityState, elapsedMs: 0 }];
    const recordVisibility = () => {
      if (visibility.length === 8) visibility.shift();
      visibility.push({ state: document.visibilityState, elapsedMs: elapsedMs() });
    };
    const completedHeights: number[] = [];
    document.addEventListener('visibilitychange', recordVisibility);

    try {
      for (const height of [240, 96, 420]) {
        let attempts = 0;
        act(() => {
          parent.style.height = `${height}px`;
        });
        try {
          await waitFor(() => {
            attempts += 1;
            expectViewportHeight(height);
          });
        } catch (error) {
          const layout = (element: HTMLElement) => {
            const style = getComputedStyle(element);
            return {
              connected: element.isConnected,
              inlineHeight: element.style.height,
              computedHeight: style.height,
              clientHeight: element.clientHeight,
              offsetHeight: element.offsetHeight,
              bounds: element.getBoundingClientRect().toJSON(),
              display: style.display,
              visibility: style.visibility,
              paddingTop: style.paddingTop,
              paddingBottom: style.paddingBottom
            };
          };
          // console.error is mocked by the shared setup. Preserve the assertion and its DOM dump.
          console.info(
            '[Tree CSS resize timeout]',
            JSON.stringify({
              component: name,
              expectedHeight: height,
              completedHeights,
              attempts,
              elapsedMs: elapsedMs(),
              visibility,
              documentFocused: document.hasFocus(),
              parent: layout(parent),
              viewport: layout(viewport)
            })
          );
          throw error;
        }
        completedHeights.push(height);
      }
    } finally {
      document.removeEventListener('visibilitychange', recordVisibility);
    }
  });

  it('preserves scrolling and an offscreen row brought into focus when resizing', async () => {
    const onChange = vi.fn();
    const view = (height: number) => (
      <Component
        data={data}
        virtualized
        listProps={{ itemSize: 36 }}
        onChange={onChange}
        {...heightProps(height)}
      />
    );
    const { rerender } = render(view(180));
    const viewport = getViewport();
    fireEvent.scroll(viewport, { target: { scrollTop: 40 * 36 } });
    const row = await screen.findByRole('treeitem', { name: 'Node 40' });
    act(() => row.focus());
    const scrollTop = viewport.scrollTop;
    expect(scrollTop).toBeGreaterThan(0);
    for (const height of [420, 96]) {
      rerender(view(height));
      await waitFor(() => expectViewportHeight(height));
      expect(getViewport()).toBe(viewport);
      expect(viewport.scrollTop).toBe(scrollTop);
      expect(document.activeElement).toBe(row);
      const bounds = viewport.getBoundingClientRect();
      const rowBounds = row.getBoundingClientRect();
      expect(rowBounds.top).toBeGreaterThanOrEqual(bounds.top);
      expect(rowBounds.bottom).toBeLessThanOrEqual(bounds.bottom);
    }
    expect(onChange).not.toHaveBeenCalled();
  });
});
