import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
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
function viewport() {
  return document.querySelector<HTMLElement>('.rs-tree-virt-list,.rs-check-tree-virt-list')!;
}
async function key(key: string) {
  await act(async () => {
    await userEvent.keyboard(`{${key}}`);
  });
}
async function expectVisibleFocus(label: string) {
  await waitFor(() => {
    const row = screen.getByRole('treeitem', { name: label });
    expect(row).to.have.focus;
    const bounds = row.getBoundingClientRect();
    const view = viewport().getBoundingClientRect();
    expect(bounds.bottom).to.be.greaterThan(view.top);
    expect(bounds.top).to.be.lessThan(view.bottom);
  });
}
async function trustedKeys(action: () => Promise<void>) {
  const keys: KeyboardEvent[] = [];
  const capture = (event: KeyboardEvent) => keys.push(event);
  document.addEventListener('keydown', capture, true);
  try {
    await action();
    expect(keys.length).to.be.greaterThan(0);
    expect(keys.every(event => event.isTrusted)).to.be.true;
  } finally {
    document.removeEventListener('keydown', capture, true);
  }
}

describe.each(components)('$name virtual native navigation', ({ Component, multiple }) => {
  it.each(['Home', 'End'])('scrolls and focuses %s before a trusted Enter', async navigation => {
    const onChange = vi.fn();
    const data = makeData().map((node, index) => ({ ...node, nodeId: index === 999 ? '' : index }));
    render(
      <Component
        {...treeProps}
        data={data}
        onChange={onChange}
        listProps={{
          height: 180,
          itemSize: 36,
          initialScrollOffset: navigation === 'Home' ? 35820 : 0
        }}
      />
    );
    act(() =>
      screen.getByRole('treeitem', { name: navigation === 'Home' ? 'Node 999' : 'Node 0' }).focus()
    );
    await trustedKeys(async () => {
      await key(navigation);
      await expectVisibleFocus(navigation === 'Home' ? 'Node 0' : 'Node 999');
      if (navigation === 'Home') expect(viewport().scrollTop).to.equal(0);
      else expect(viewport().scrollTop).to.be.greaterThan(0);
      await key('Enter');
    });
    const expected = navigation === 'Home' ? 0 : '';
    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      multiple ? [expected] : expected,
      expect.anything()
    );
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
  });

  it('keeps consecutive End/Home/ArrowDown jumps visible and selects the final focused value', async () => {
    const onChange = vi.fn();
    render(<Component {...treeProps} data={makeData()} onChange={onChange} />);
    act(() => screen.getByRole('treeitem', { name: 'Node 0' }).focus());
    await trustedKeys(async () => {
      await key('End');
      await expectVisibleFocus('Node 999');
      await key('Home');
      await expectVisibleFocus('Node 0');
      await key('ArrowDown');
      await expectVisibleFocus('Node 1');
      await key('Enter');
    });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(multiple ? [1] : 1, expect.anything());
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
  });
});

describe.each(components.slice(0, 2))(
  '$name virtual native lifecycle',
  ({ Component, multiple }) => {
    it('focuses a mouse-selected row and continues with ArrowDown and Enter', async () => {
      const onChange = vi.fn();
      render(<Component {...treeProps} data={makeData()} onChange={onChange} />);
      await act(async () => {
        await userEvent.click(screen.getByRole('treeitem', { name: 'Node 2' }));
      });
      await expectVisibleFocus('Node 2');
      expect(onChange).toHaveBeenCalledExactlyOnceWith(multiple ? [2] : 2, expect.anything());
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
      await trustedKeys(async () => {
        await key('ArrowDown');
        await expectVisibleFocus('Node 3');
        await key('Enter');
      });
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][0]).to.deep.equal(multiple ? [2, 3] : 3);
      expect(onChange.mock.calls[1][1].nativeEvent.isTrusted).to.be.true;
    });

    it('preserves external focus chosen by a mouse selection callback', async () => {
      const outside = React.createRef<HTMLDivElement>();
      const onChange = vi.fn<(value: any, event: React.SyntheticEvent) => void>(() =>
        outside.current?.focus()
      );
      render(
        <>
          <Component {...treeProps} data={makeData()} onChange={onChange} />
          <div tabIndex={-1} ref={outside}>
            Outside
          </div>
        </>
      );
      await act(async () => {
        await userEvent.click(screen.getByRole('treeitem', { name: 'Node 2' }));
      });
      expect(outside.current).to.have.focus;
      expect(onChange).toHaveBeenCalledExactlyOnceWith(multiple ? [2] : 2, expect.anything());
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
    });

    it('respects external focus ownership transferred in the same native key event', async () => {
      const outside = React.createRef<HTMLDivElement>();
      render(
        <div
          onKeyDown={event => {
            if (event.key === 'End') outside.current?.focus();
          }}
        >
          <Component {...treeProps} data={makeData()} />
          <div tabIndex={-1} ref={outside}>
            Outside
          </div>
        </div>
      );
      act(() => screen.getByRole('treeitem', { name: 'Node 0' }).focus());
      await trustedKeys(async () => {
        await key('End');
      });
      expect(outside.current).to.have.focus;
      expect(viewport().scrollTop).to.equal(0);
      expect(screen.queryByRole('treeitem', { name: 'Node 999' })).to.be.null;
    });

    it.each(['remove', 'reorder'])(
      'cancels a stale destination when its owner performs a same-key %s',
      async operation => {
        const onChange = vi.fn();
        function Owner() {
          const [data, setData] = React.useState(makeData);
          return (
            <div
              onKeyDown={event => {
                if (event.key === 'End')
                  setData(previous =>
                    operation === 'remove'
                      ? previous.slice(0, 999)
                      : [...previous.slice(0, 500), previous[999], ...previous.slice(500, 999)]
                  );
              }}
            >
              <Component {...treeProps} data={data} onChange={onChange} />
            </div>
          );
        }
        render(<Owner />);
        act(() => screen.getByRole('treeitem', { name: 'Node 0' }).focus());
        await trustedKeys(async () => {
          await key('End');
          await expectVisibleFocus('Node 0');
          expect(viewport().scrollTop).to.equal(0);
          await key('ArrowDown');
          await expectVisibleFocus('Node 1');
          await key('Enter');
        });
        expect(onChange).toHaveBeenCalledExactlyOnceWith(multiple ? [1] : 1, expect.anything());
        expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
      }
    );
  }
);

describe.each(components.slice(0, 2))(
  '$name virtual pending focus guards',
  ({ Component, multiple }) => {
    it('mounts the numeric End destination before selecting it with trusted Enter', async () => {
      const onChange = vi.fn();
      render(<Component {...treeProps} data={makeData()} onChange={onChange} />);
      act(() => screen.getByRole('treeitem', { name: 'Node 0' }).focus());
      expect(screen.queryByRole('treeitem', { name: 'Node 999' })).to.be.null;
      await trustedKeys(async () => {
        await key('End');
        await expectVisibleFocus('Node 999');
        const destination = screen.getByRole('treeitem', { name: 'Node 999' });
        expect(destination.isConnected).to.be.true;
        expect(destination).to.have.attribute('aria-level', '1');
        expect(destination).to.have.attribute('aria-posinset', '1000');
        expect(destination).to.have.attribute('aria-setsize', '1000');
        expect(viewport().scrollTop).to.be.greaterThan(0);
        expect(onChange).not.toHaveBeenCalled();
        await key('Enter');
      });
      expect(onChange).toHaveBeenCalledExactlyOnceWith(multiple ? [999] : 999, expect.anything());
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
    });

    it('cancels a mounted destination when the same native key changes the owner query', async () => {
      const onChange = vi.fn();
      const data = Array.from({ length: 10 }, (_, index) => ({
        nodeId: index + 1,
        label: index === 0 ? 'Source row' : index === 9 ? 'Old destination' : `Middle row ${index}`
      }));
      function Owner() {
        const [query, setQuery] = React.useState('');
        return (
          <div
            onKeyDown={event => {
              if (event.key === 'End') setQuery('Source row');
            }}
          >
            <Component
              {...treeProps}
              data={data}
              searchKeyword={query}
              onChange={onChange}
              height={360}
              treeHeight={360}
              listProps={{ height: 360, itemSize: 36 }}
            />
          </div>
        );
      }
      render(<Owner />);
      act(() => screen.getByRole('treeitem', { name: 'Source row' }).focus());
      expect(screen.getByRole('treeitem', { name: 'Old destination' }).isConnected).to.be.true;
      const focused: string[] = [];
      const capture = (event: FocusEvent) => {
        if (event.target instanceof HTMLElement && event.target.getAttribute('role') === 'treeitem')
          focused.push(event.target.getAttribute('aria-label') || event.target.textContent || '');
      };
      document.addEventListener('focusin', capture, true);
      try {
        await trustedKeys(async () => {
          await key('End');
          await expectVisibleFocus('Source row');
          expect(screen.queryByRole('treeitem', { name: 'Old destination' })).to.be.null;
          expect(focused.some(label => label.includes('Old destination'))).to.be.false;
          expect(onChange).not.toHaveBeenCalled();
          await key('Enter');
        });
      } finally {
        document.removeEventListener('focusin', capture, true);
      }
      expect(onChange).toHaveBeenCalledExactlyOnceWith(multiple ? [1] : 1, expect.anything());
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
    });
  }
);

describe.each(components.slice(2))(
  '$name virtual cancelled focus bookkeeping',
  ({ Component, multiple }) => {
    it('restores the source active descendant when the same native key removes the destination', async () => {
      const onChange = vi.fn();
      function Owner() {
        const [data, setData] = React.useState(() =>
          Array.from({ length: 1000 }, (_, index) => ({
            label: `Row ${index + 1}`,
            nodeId: index + 1
          }))
        );
        return (
          <div
            onKeyDown={event => {
              if (event.key === 'End') setData(previous => previous.slice(0, 999));
            }}
          >
            <Component {...treeProps} searchable data={data} onChange={onChange} />
          </div>
        );
      }
      render(<Owner />);
      act(() => screen.getByRole('treeitem', { name: 'Row 1' }).focus());
      await trustedKeys(async () => {
        await key('Home');
        await expectVisibleFocus('Row 1');
        const before = screen.getByRole('combobox').getAttribute('aria-activedescendant');
        expect(before).to.be.a('string').and.not.empty;
        await key('End');
        await expectVisibleFocus('Row 1');
        expect(viewport().scrollTop).to.equal(0);
        expect(screen.queryByRole('treeitem', { name: 'Row 1000' })).to.be.null;
        expect(onChange).not.toHaveBeenCalled();
        expect(screen.getByRole('combobox').getAttribute('aria-activedescendant')).to.equal(before);
        if (!multiple) {
          await act(async () => {
            await userEvent.click(screen.getByRole('searchbox'));
          });
          await key('Enter');
          expect(onChange).toHaveBeenCalledExactlyOnceWith(1, expect.anything());
          expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
        } else {
          await key('Enter');
          expect(onChange).toHaveBeenCalledExactlyOnceWith([1], expect.anything());
          expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
        }
      });
    });
  }
);
