import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Tree from '..';
import CheckTree from '../../CheckTree';
import TreePicker from '../../TreePicker';
import CheckTreePicker from '../../CheckTreePicker';
import type { ListHandle } from '@/internals/Windowing';
import '../styles/index.scss';
import '../../CheckTree/styles/index.scss';
import '../../TreePicker/styles/index.scss';
import '../../CheckTreePicker/styles/index.scss';

const components = [
  { name: 'Tree', Component: Tree, multiple: false },
  { name: 'CheckTree', Component: CheckTree, multiple: true },
  { name: 'TreePicker', Component: TreePicker, multiple: false },
  { name: 'CheckTreePicker', Component: CheckTreePicker, multiple: true }
];

const makeData = () =>
  Array.from({ length: 1000 }, (_, index) => ({ label: `Node ${index}`, nodeId: index }));
const treeProps = {
  valueKey: 'nodeId',
  virtualized: true,
  defaultOpen: true,
  searchable: false,
  height: 180,
  treeHeight: 180,
  listProps: { height: 180, itemSize: 36 }
};
function getViewport() {
  return document.querySelector<HTMLElement>('.rs-tree-virt-list,.rs-check-tree-virt-list')!;
}
function expectVisibleFocus(label: string) {
  const row = screen.getByRole('treeitem', { name: label });
  expect(row).to.have.focus;
  const viewportBounds = getViewport().getBoundingClientRect();
  const bounds = row.getBoundingClientRect();
  expect(bounds.bottom).to.be.greaterThan(viewportBounds.top);
  expect(bounds.top).to.be.lessThan(viewportBounds.bottom);
}

describe.each(components)('$name virtual focus', ({ Component, multiple }) => {
  it('scrolls across windows with End and Home using a custom valueKey', () => {
    const onChange = vi.fn();
    render(<Component {...treeProps} data={makeData()} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'End' });
    expectVisibleFocus('Node 999');
    expect(getViewport().scrollTop).to.be.greaterThan(0);
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'Home' });
    expectVisibleFocus('Node 0');
    expect(getViewport().scrollTop).to.equal(0);
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(multiple ? [0] : 0, expect.anything());
  });

  it('preserves mounted row identity when keyboard focus changes', () => {
    render(<Component {...treeProps} data={makeData()} />);
    const first = screen.getByRole('treeitem', { name: 'Node 0' });
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
    expect(screen.getByRole('treeitem', { name: 'Node 0' })).to.equal(first);
    expectVisibleFocus('Node 1');
  });

  it('uses actual visible row indexes while skipping disabled and collapsed nodes', () => {
    const disabled = [
      ...Array.from({ length: 100 }, (_, index) => index),
      ...Array.from({ length: 20 }, (_, index) => 980 + index),
      1001
    ];
    const data = [
      ...makeData(),
      { label: 'Collapsed', nodeId: 1001, children: [{ label: 'Hidden child', nodeId: 1002 }] }
    ];
    render(<Component {...treeProps} data={data} disabledItemValues={disabled} />);
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'End' });
    expectVisibleFocus('Node 979');
    expect(screen.queryByRole('treeitem', { name: 'Hidden child' })).to.be.null;
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'Home' });
    expectVisibleFocus('Node 100');
  });

  it('navigates the current searched row collection after a query change', () => {
    const data = makeData();
    const { rerender } = render(<Component {...treeProps} data={data} searchKeyword="Node 1" />);
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'End' });
    expectVisibleFocus('Node 199');
    rerender(<Component {...treeProps} data={data} searchKeyword="Node 99" />);
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'End' });
    expectVisibleFocus('Node 999');
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'Home' });
    expectVisibleFocus('Node 99');
  });

  it('selects an empty string value after an offscreen End jump', () => {
    const onChange = vi.fn();
    const data = makeData().map((node, index) => ({ ...node, nodeId: index === 999 ? '' : index }));
    render(<Component {...treeProps} data={data} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'End' });
    expectVisibleFocus('Node 999');
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(multiple ? [''] : '', expect.anything());
  });
});

describe.each(components.slice(0, 2))(
  '$name virtual focus lifecycle',
  ({ Component, multiple }) => {
    it('lets a later connected external target own focus before the jump commits', () => {
      const outsideRef = React.createRef<HTMLDivElement>();
      render(
        <div
          onKeyDown={event => {
            if (event.key === 'End') outsideRef.current?.focus();
          }}
        >
          <Component {...treeProps} data={makeData()} />
          <div ref={outsideRef} tabIndex={-1}>
            Outside
          </div>
        </div>
      );
      act(() => screen.getByRole('treeitem', { name: 'Node 0' }).focus());
      fireEvent.keyDown(screen.getByRole('treeitem', { name: 'Node 0' }), { key: 'End' });
      expect(outsideRef.current).to.have.focus;
      expect(getViewport().scrollTop).to.equal(0);
      expect(screen.queryByRole('treeitem', { name: 'Node 999' })).to.be.null;
    });

    it('cancels a destination removed by the same keyboard interaction', async () => {
      function ControlledTree() {
        const [data, setData] = React.useState(makeData);
        return (
          <div
            onKeyDown={event => {
              if (event.key === 'End') setData(previous => previous.slice(0, 999));
            }}
          >
            <Component {...treeProps} data={data} />
          </div>
        );
      }
      render(<ControlledTree />);
      const source = screen.getByRole('treeitem', { name: 'Node 0' });
      act(() => source.focus());
      fireEvent.keyDown(source, { key: 'End' });
      await waitFor(() => expect(screen.queryByRole('treeitem', { name: 'Node 999' })).to.be.null);
      expect(source).to.have.focus;
      expect(getViewport().scrollTop).to.equal(0);
      fireEvent.keyDown(source, { key: 'ArrowDown' });
      expectVisibleFocus('Node 1');
    });

    it.each(['clone', 'reorder', 'reparent'])(
      'validates the latest owner location during a same-key %s',
      operation => {
        function Owner() {
          const [data, setData] = React.useState(makeData);
          return (
            <div
              onKeyDown={event => {
                if (event.key === 'End')
                  setData(previous =>
                    operation === 'clone'
                      ? previous.map(node => ({ ...node }))
                      : operation === 'reparent'
                        ? [
                            ...previous.slice(0, 999),
                            { label: 'New parent', nodeId: 1000, children: [previous[999]] }
                          ]
                        : [...previous.slice(0, 500), previous[999], ...previous.slice(500, 999)]
                  );
              }}
            >
              <Component {...treeProps} data={data} />
            </div>
          );
        }
        render(<Owner />);
        const source = screen.getByRole('treeitem', { name: 'Node 0' });
        act(() => source.focus());
        fireEvent.keyDown(source, { key: 'End' });
        if (operation === 'clone') {
          expectVisibleFocus('Node 999');
        } else {
          expectVisibleFocus('Node 0');
          expect(getViewport().scrollTop).to.equal(0);
          fireEvent.keyDown(source, { key: 'ArrowDown' });
          expectVisibleFocus('Node 1');
        }
      }
    );

    it('keeps nested custom children keys and disabled rows in the actual virtual indexes', () => {
      const data = Array.from({ length: 300 }, (_, index) => ({
        label: `Group ${index}`,
        nodeId: `group-${index}`,
        nodes: [
          { label: `Child ${index}`, nodeId: index === 299 ? '' : `child-${index}` },
          { label: `Disabled child ${index}`, nodeId: `disabled-${index}` }
        ]
      }));
      render(
        <Component
          {...treeProps}
          data={data}
          childrenKey="nodes"
          expandItemValues={['group-299']}
          disabledItemValues={['disabled-299']}
        />
      );
      fireEvent.keyDown(screen.getByRole('tree'), { key: 'End' });
      expectVisibleFocus('Child 299');
      fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowLeft' });
      expectVisibleFocus('Group 299');
      fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowRight' });
      expectVisibleFocus('Child 299');
      expect(screen.queryByRole('treeitem', { name: 'Child 298' })).to.be.null;
    });

    it('delivers the new range to a replaced onItemsRendered callback in the same commit', () => {
      const data = makeData();
      const callbackA = vi.fn();
      const callbackB = vi.fn();
      const { rerender } = render(
        <Component
          {...treeProps}
          data={data}
          listProps={{ height: 180, itemSize: 36, onItemsRendered: callbackA }}
        />
      );
      callbackA.mockClear();
      rerender(
        <Component
          {...treeProps}
          data={data}
          listProps={{ height: 72, itemSize: 36, onItemsRendered: callbackB }}
        />
      );
      expect(callbackA).not.toHaveBeenCalled();
      expect(callbackB).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ visibleStartIndex: 0, visibleStopIndex: 1 })
      );
    });

    it('navigates virtual children loaded asynchronously with Home, End and ArrowDown', async () => {
      const data = [{ label: 'Root', nodeId: 'root', children: [] }];
      const getChildren = vi.fn(async () => makeData());
      const onChange = vi.fn();
      render(
        <Component {...treeProps} data={data} getChildren={getChildren} onChange={onChange} />
      );
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Expand Root' }));
      });
      await waitFor(() => expect(screen.getByRole('treeitem', { name: 'Node 0' })).to.exist);
      expect(getChildren).toHaveBeenCalledTimes(1);
      fireEvent.keyDown(screen.getByRole('tree'), { key: 'End' });
      expectVisibleFocus('Node 999');
      fireEvent.keyDown(screen.getByRole('tree'), { key: 'Home' });
      expectVisibleFocus('Root');
      fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
      expectVisibleFocus('Node 0');
      fireEvent.keyDown(screen.getByRole('tree'), { key: 'Enter' });
      expect(onChange).toHaveBeenCalledExactlyOnceWith(multiple ? [0] : 0, expect.anything());
    });

    it('composes public and custom list refs and preserves their detach contract', () => {
      const listRef = React.createRef<ListHandle>();
      const handles: ListHandle[] = [];
      const cleanups = vi.fn();
      const nullCalls = vi.fn();
      const customRef = (handle: ListHandle | null) => {
        if (!handle) {
          nullCalls();
          return;
        }
        handles.push(handle);
        if (Number(React.version.split('.')[0]) >= 19) return () => cleanups(handle);
      };
      const onItemsRendered = vi.fn();
      const onScroll = vi.fn();
      const { unmount } = render(
        <Component
          {...treeProps}
          data={makeData()}
          listRef={listRef}
          listProps={{ height: 180, itemSize: 36, ref: customRef, onItemsRendered, onScroll }}
        />
      );
      expect(handles.at(-1)).to.equal(listRef.current);
      expect(listRef.current?.scrollToItem).to.be.a('function');
      fireEvent.keyDown(screen.getByRole('tree'), { key: 'End' });
      expectVisibleFocus('Node 999');
      expect(handles.at(-1)).to.equal(listRef.current);
      expect(onItemsRendered.mock.calls.at(-1)?.[0].visibleStopIndex).to.equal(999);
      expect(onScroll.mock.calls.at(-1)?.[0].scrollOffset).to.be.greaterThan(0);
      const attached = handles.length;
      unmount();
      expect(listRef.current).to.be.null;
      if (Number(React.version.split('.')[0]) >= 19) {
        expect(cleanups).toHaveBeenCalledTimes(attached);
        expect(nullCalls).not.toHaveBeenCalled();
      } else {
        expect(nullCalls).toHaveBeenCalledTimes(attached);
        expect(cleanups).not.toHaveBeenCalled();
      }
    });
  }
);
