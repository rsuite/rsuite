import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import TreePicker from '..';
import type { PickerHandle } from '@/internals/Picker';
import '../styles/index.scss';

const pickerProps = {
  id: 'selected-tree-picker',
  valueKey: 'nodeId',
  childrenKey: 'nodes',
  searchable: false,
  treeHeight: 180,
  listProps: { height: 180, itemSize: 36 }
};

const values = [0, '', 'selected-value'];

function makeData(count: number, selectedIndex: number, value: string | number) {
  return Array.from({ length: count }, (_, index) => ({
    label: index === selectedIndex ? 'Selected node' : `Node ${index}`,
    nodeId: index === selectedIndex ? value : `node-${index}`
  }));
}

async function key(name: string) {
  await act(async () => {
    await userEvent.keyboard(`{${name}}`);
  });
}

async function open(onEntered: ReturnType<typeof vi.fn>, count: number) {
  await act(async () => {
    await userEvent.click(screen.getByRole('combobox'));
  });
  await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(count));
}

async function close() {
  await key('Escape');
  await waitFor(() => expect(screen.queryByRole('tree')).to.be.null);
}

async function expectSelectedFocus(virtualized: boolean) {
  await waitFor(() => {
    const selected = screen.getByRole('treeitem', { name: 'Selected node' });
    expect(selected).to.have.focus;
    expect(selected).to.have.attribute('aria-selected', 'true');
    const descendant = screen.getByRole('combobox').getAttribute('aria-activedescendant');
    if (descendant) {
      expect(descendant).to.equal(selected.id);
      expect(document.getElementById(descendant)).to.equal(selected);
    }
    if (virtualized) {
      const viewport = document.querySelector<HTMLElement>('.rs-tree-virt-list')!;
      const bounds = selected.getBoundingClientRect();
      const view = viewport.getBoundingClientRect();
      expect(bounds.bottom).to.be.greaterThan(view.top);
      expect(bounds.top).to.be.lessThan(view.bottom);
    }
  });
}

async function trustedKeys(action: () => Promise<void>) {
  const events: KeyboardEvent[] = [];
  const capture = (event: KeyboardEvent) => events.push(event);
  document.addEventListener('keydown', capture, true);
  try {
    await action();
    expect(events.length).to.be.greaterThan(0);
    expect(events.every(event => event.isTrusted)).to.be.true;
  } finally {
    document.removeEventListener('keydown', capture, true);
  }
}

describe.each([false, true])('TreePicker selected focus virtual=%s', virtualized => {
  it.each(values)('restores initial defaultOpen %j', async value => {
    const onEntered = vi.fn();
    render(
      <TreePicker
        {...pickerProps}
        data={makeData(virtualized ? 1000 : 5, virtualized ? 700 : 2, value)}
        defaultValue={value}
        defaultOpen
        virtualized={virtualized}
        onEntered={onEntered}
      />
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
    await expectSelectedFocus(virtualized);
  });

  it.each(values)(
    'restores %j on open and reopen before continuing native navigation',
    async value => {
      const position = virtualized ? 700 : 2;
      const onEntered = vi.fn();
      const onChange = vi.fn();
      render(
        <TreePicker
          {...pickerProps}
          data={makeData(virtualized ? 1000 : 5, position, value)}
          defaultValue={value}
          virtualized={virtualized}
          onEntered={onEntered}
          onChange={onChange}
        />
      );
      await open(onEntered, 1);
      await expectSelectedFocus(virtualized);
      await trustedKeys(async () => {
        await close();
        await open(onEntered, 2);
        await expectSelectedFocus(virtualized);
        await key('ArrowDown');
        await waitFor(
          () => expect(screen.getByRole('treeitem', { name: `Node ${position + 1}` })).to.have.focus
        );
        await key('Enter');
      });
      expect(onChange).toHaveBeenCalledExactlyOnceWith(`node-${position + 1}`, expect.anything());
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
    }
  );

  it('starts at the first row when there is no selected value', async () => {
    const onEntered = vi.fn();
    render(
      <TreePicker
        {...pickerProps}
        data={makeData(virtualized ? 1000 : 5, 2, 0)}
        virtualized={virtualized}
        onEntered={onEntered}
      />
    );
    await open(onEntered, 1);
    await close();
    await open(onEntered, 2);
    await trustedKeys(async () => {
      await key('ArrowDown');
    });
    expect(screen.getByRole('treeitem', { name: 'Node 0' })).to.have.focus;
  });

  it.each(['onEnter', 'onEntered'] as const)(
    'preserves external focus chosen by %s',
    async callback => {
      const outside = React.createRef<HTMLButtonElement>();
      const onEntered = vi.fn();
      const callbacks = {
        [callback]: () => outside.current?.focus(),
        onEntered: () => {
          if (callback === 'onEntered') outside.current?.focus();
          onEntered();
        }
      };
      render(
        <>
          <TreePicker
            {...pickerProps}
            data={makeData(virtualized ? 1000 : 5, virtualized ? 700 : 2, 'selected-value')}
            defaultValue="selected-value"
            virtualized={virtualized}
            {...callbacks}
          />
          <button ref={outside}>Outside</button>
        </>
      );
      await open(onEntered, 1);
      expect(outside.current).to.have.focus;
      expect(screen.getByRole('combobox')).not.to.have.attribute('aria-activedescendant');
      if (virtualized) {
        expect(document.querySelector<HTMLElement>('.rs-tree-virt-list')?.scrollTop).to.equal(0);
        expect(screen.queryByRole('treeitem', { name: 'Selected node' })).to.be.null;
      }
    }
  );
});

describe('TreePicker controlled selected focus', () => {
  it.each(['new roots', 'shared root', 'changed child value'])(
    'uses new owner data and value committed by onEntered (%s)',
    async mode => {
      const onEntered = vi.fn();
      const onChange = vi.fn();
      const replacement = makeData(1000, 700, 0);
      const initialChildren = makeData(
        mode === 'changed child value' ? 1000 : 5,
        mode === 'changed child value' ? 700 : 2,
        'initial-value'
      );
      const parent = { label: 'Parent', nodeId: 'parent', nodes: initialChildren };
      function App() {
        const [data, setData] = React.useState(mode === 'new roots' ? initialChildren : [parent]);
        const [value, setValue] = React.useState<string | number>('initial-value');
        return (
          <TreePicker
            {...pickerProps}
            data={data}
            value={value}
            virtualized
            defaultExpandItemValues={['parent']}
            onChange={onChange}
            onEntered={() => {
              if (mode === 'changed child value') {
                parent.nodes[700].nodeId = 0;
                setData([parent]);
              } else if (mode === 'shared root') {
                parent.nodes = replacement;
                setData([parent]);
              } else setData(replacement);
              setValue(0);
              onEntered();
            }}
          />
        );
      }
      render(<App />);
      await open(onEntered, 1);
      await expectSelectedFocus(true);
      await trustedKeys(async () => {
        await key('ArrowDown');
        expect(screen.getByRole('treeitem', { name: 'Node 701' })).to.have.focus;
        await key('Enter');
      });
      expect(onChange).toHaveBeenCalledExactlyOnceWith('node-701', expect.anything());
    }
  );

  it.each([false, true])(
    'cancels selected restore closed by the entered owner layout virtual=%s',
    async virtualized => {
      const onEntered = vi.fn();
      const data = makeData(virtualized ? 1000 : 5, virtualized ? 700 : 2, 0);
      const lateFocus: string[] = [];
      const scrollOffsets: number[] = [];
      let cancelled = false;
      const capture = (event: FocusEvent) => {
        const target = event.target as HTMLElement;
        if (cancelled && target.getAttribute('role') === 'treeitem')
          lateFocus.push(target.textContent!);
      };
      function App() {
        const [open, setOpen] = React.useState(false);
        const [entered, setEntered] = React.useState(false);
        React.useLayoutEffect(() => {
          if (entered) {
            cancelled = true;
            setOpen(false);
          }
        }, [entered]);
        return (
          <TreePicker
            {...pickerProps}
            data={data}
            value={0}
            open={open}
            virtualized={virtualized}
            onOpen={() => setOpen(true)}
            onEntered={() => {
              setEntered(true);
              onEntered();
            }}
            listProps={{
              height: 180,
              itemSize: 36,
              onScroll: ({ scrollOffset }) => {
                if (cancelled) scrollOffsets.push(scrollOffset);
              }
            }}
          />
        );
      }
      document.addEventListener('focusin', capture, true);
      try {
        render(<App />);
        await open(onEntered, 1);
        await waitFor(() => expect(screen.queryByRole('tree')).to.be.null);
        expect(lateFocus).to.deep.equal([]);
        expect(scrollOffsets.every(offset => offset === 0)).to.be.true;
      } finally {
        document.removeEventListener('focusin', capture, true);
      }
    }
  );

  it.each(['close', 'value', 'owner', 'focus'] as const)(
    'cancels a selected wait job after the owner changes %s',
    async action => {
      const onEntered = vi.fn();
      const replacement = makeData(1000, 700, 0);
      const initialData = makeData(5, 2, 'initial-value');
      const outside = React.createRef<HTMLButtonElement>();
      const lateFocus: string[] = [];
      const offsets: number[] = [];
      let cancelled = false;
      const capture = (event: FocusEvent) => {
        const target = event.target as HTMLElement;
        if (cancelled && target.getAttribute('role') === 'treeitem')
          lateFocus.push(target.textContent!);
      };
      function App() {
        const [data, setData] = React.useState(initialData);
        const [value, setValue] = React.useState<string | number>('initial-value');
        const [open, setOpen] = React.useState(false);
        React.useLayoutEffect(() => {
          if (data !== replacement) return;
          cancelled = true;
          if (action === 'close') setOpen(false);
          if (action === 'value') setValue('node-2');
          if (action === 'owner') setData([...replacement]);
          if (action === 'focus') outside.current?.focus();
        }, [data]);
        return (
          <>
            <TreePicker
              {...pickerProps}
              data={data}
              value={value}
              open={open}
              virtualized
              onOpen={() => setOpen(true)}
              onEntered={() => {
                setData(replacement);
                setValue(0);
                onEntered();
              }}
              listProps={{
                height: 180,
                itemSize: 36,
                onScroll: ({ scrollOffset }) => {
                  if (cancelled) offsets.push(scrollOffset);
                }
              }}
            />
            <button ref={outside}>Outside</button>
          </>
        );
      }
      document.addEventListener('focusin', capture, true);
      try {
        render(<App />);
        await open(onEntered, 1);
        if (action === 'close') await waitFor(() => expect(screen.queryByRole('tree')).to.be.null);
        else {
          await waitFor(() => expect(screen.getByRole('treeitem', { name: 'Node 0' })).to.exist);
          if (action === 'focus') expect(outside.current).to.have.focus;
          else if (action === 'value') expect(screen.getByRole('combobox')).to.have.text('Node 2');
        }
        expect(lateFocus).to.deep.equal([]);
        expect(offsets.every(offset => offset === 0)).to.be.true;
        expect(screen.getByRole('combobox')).not.to.have.attribute('aria-activedescendant');
      } finally {
        document.removeEventListener('focusin', capture, true);
      }
    }
  );

  it.each(['close', 'imperative close', 'value'] as const)(
    'cancels selected focus when scrolling reveals an owner %s change',
    async action => {
      const onEntered = vi.fn();
      const initialData = makeData(1000, 700, 0);
      const picker = React.createRef<PickerHandle>();
      const lateFocus: string[] = [];
      let cancelled = false;
      const capture = (event: FocusEvent) => {
        const target = event.target as HTMLElement;
        if (cancelled && target.getAttribute('role') === 'treeitem')
          lateFocus.push(target.textContent!);
      };
      function App() {
        const [value, setValue] = React.useState<string | number>(0);
        const [open, setOpen] = React.useState(false);
        return (
          <TreePicker
            {...pickerProps}
            ref={picker}
            data={initialData}
            value={value}
            open={action === 'imperative close' ? undefined : open}
            virtualized
            onOpen={() => setOpen(true)}
            onEntered={onEntered}
            listProps={{
              height: 180,
              itemSize: 36,
              onItemsRendered: ({ visibleStartIndex, visibleStopIndex }) => {
                if (!cancelled && visibleStartIndex <= 700 && visibleStopIndex >= 700) {
                  cancelled = true;
                  if (action === 'close') setOpen(false);
                  else if (action === 'imperative close') picker.current?.close?.();
                  else setValue('node-2');
                }
              }
            }}
          />
        );
      }
      document.addEventListener('focusin', capture, true);
      try {
        render(<App />);
        await open(onEntered, 1);
        await waitFor(() => expect(cancelled).to.be.true);
        if (action !== 'value') await waitFor(() => expect(screen.queryByRole('tree')).to.be.null);
        else await waitFor(() => expect(screen.getByRole('combobox')).to.have.text('Node 2'));
        expect(lateFocus).to.deep.equal([]);
      } finally {
        document.removeEventListener('focusin', capture, true);
      }
    }
  );

  it('starts at the first row when a controlled reopen clears the selection before exit completes', async () => {
    let closePicker!: () => void;
    const onEntered = vi.fn();
    const data = makeData(1000, 2, 'initial-value');
    function App() {
      const [open, setOpen] = React.useState(true);
      const [value, setValue] = React.useState<string | null>('initial-value');
      closePicker = () => setOpen(false);
      return (
        <TreePicker
          {...pickerProps}
          data={data}
          value={value}
          open={open}
          virtualized
          onEntered={onEntered}
          onExit={() => {
            setValue(null);
            setOpen(true);
          }}
        />
      );
    }
    render(<App />);
    await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
    await expectSelectedFocus(true);
    const previousRow = screen.getByRole('treeitem', { name: 'Selected node' });
    await act(async () => {
      closePicker();
    });
    await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(2));
    expect(screen.getByRole('treeitem', { name: 'Selected node' })).to.equal(previousRow);
    expect(screen.getByRole('combobox')).to.have.focus;
    expect(screen.getByRole('combobox')).not.to.have.attribute('aria-activedescendant');
    await trustedKeys(async () => {
      await key('ArrowDown');
    });
    expect(screen.getByRole('treeitem', { name: 'Node 0' })).to.have.focus;
  });

  it.each([0, ''])('restores controlled %j through controlled open and close', async value => {
    const onEntered = vi.fn();
    function App() {
      const [open, setOpen] = React.useState(false);
      return (
        <TreePicker
          {...pickerProps}
          data={makeData(1000, 700, value)}
          value={value}
          virtualized
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onEntered={onEntered}
        />
      );
    }
    render(<App />);
    await open(onEntered, 1);
    await expectSelectedFocus(true);
    await close();
    await open(onEntered, 2);
    await expectSelectedFocus(true);
  });

  it.each(['onEnter', 'onEntered'] as const)(
    'uses the latest value changed by %s',
    async callback => {
      const data = makeData(1000, 700, 0);
      const onEntered = vi.fn();
      function App() {
        const [value, setValue] = React.useState<string | number>('node-2');
        const callbacks = {
          [callback]: () => setValue(0),
          onEntered: () => {
            if (callback === 'onEntered') setValue(0);
            onEntered();
          }
        };
        return <TreePicker {...pickerProps} data={data} value={value} virtualized {...callbacks} />;
      }
      render(<App />);
      await open(onEntered, 1);
      await expectSelectedFocus(true);
      expect(screen.getByRole('combobox')).to.have.text('Selected node');
    }
  );

  it.each(['imperative', 'controlled'])(
    'does not focus or scroll after onEntered closes the picker (%s)',
    async mode => {
      const picker = React.createRef<PickerHandle>();
      const onEntered = vi.fn();
      const lateFocus: string[] = [];
      const scrollOffsets: number[] = [];
      let observeExit = false;
      const captureFocus = (event: FocusEvent) => {
        const target = event.target as HTMLElement;
        if (observeExit && target.getAttribute('role') === 'treeitem') {
          lateFocus.push(target.getAttribute('aria-label')!);
        }
      };
      document.addEventListener('focusin', captureFocus, true);
      function App() {
        const [open, setOpen] = React.useState(false);
        const closeOnEntered = () => {
          observeExit = true;
          if (mode === 'controlled') setOpen(false);
          else picker.current?.close?.();
          onEntered();
        };
        return (
          <TreePicker
            {...pickerProps}
            ref={picker}
            data={makeData(1000, 700, 'selected-value')}
            defaultValue="selected-value"
            virtualized
            open={mode === 'controlled' ? open : undefined}
            onOpen={() => setOpen(true)}
            onEntered={closeOnEntered}
            listProps={{
              height: 180,
              itemSize: 36,
              onScroll: ({ scrollOffset }) => {
                if (observeExit) scrollOffsets.push(scrollOffset);
              }
            }}
          />
        );
      }
      try {
        render(<App />);
        await open(onEntered, 1);
        await waitFor(() => expect(screen.queryByRole('tree')).to.be.null);
        expect(lateFocus).to.deep.equal([]);
        expect(scrollOffsets.every(offset => offset === 0)).to.be.true;
        expect(screen.getByRole('combobox')).to.have.focus;
        expect(screen.getByRole('combobox')).not.to.have.attribute('aria-activedescendant');
      } finally {
        document.removeEventListener('focusin', captureFocus, true);
      }
    }
  );

  it.each([false, true])(
    'restores loaded children when pending owner roots are copied: %s',
    async copyRoots => {
      let resolveChildren!: (data: any[]) => void;
      const data = [{ label: 'Parent', nodeId: 'parent', nodes: [] }];
      const getChildren = vi.fn(
        () =>
          new Promise<any[]>(resolve => {
            resolveChildren = resolve;
          })
      );
      const onEntered = vi.fn();
      let copyOwnerRoots!: () => void;
      function App() {
        const [roots, setRoots] = React.useState(data);
        copyOwnerRoots = () => setRoots(previous => [...previous]);
        return (
          <TreePicker
            {...pickerProps}
            data={roots}
            defaultValue=""
            virtualized
            getChildren={getChildren}
            onEntered={onEntered}
          />
        );
      }
      render(<App />);
      await open(onEntered, 1);
      await act(async () => {
        await userEvent.click(screen.getByRole('button', { name: 'Expand Parent' }));
      });
      expect(getChildren).toHaveBeenCalledTimes(1);
      if (copyRoots)
        await act(async () => {
          copyOwnerRoots();
        });
      await act(async () => {
        resolveChildren(makeData(1000, 700, ''));
      });
      await waitFor(() =>
        expect(screen.getByRole('button', { name: 'Collapse Parent' })).not.to.have.attribute(
          'aria-busy'
        )
      );
      await close();
      await open(onEntered, 2);
      await expectSelectedFocus(true);
      expect(getChildren).toHaveBeenCalledTimes(1);
    }
  );
});

describe.each([false, true])('TreePicker selected eligibility virtual=%s', virtualized => {
  it.each(['disabled', 'filtered', 'folded', 'unloaded'])(
    'keeps %s selections without focusing or expanding hidden rows',
    async condition => {
      const value = 'selected-value';
      const data =
        condition === 'folded' || condition === 'unloaded'
          ? [
              {
                label: 'Parent',
                nodeId: 'parent',
                nodes: condition === 'unloaded' ? [] : [{ label: 'Selected node', nodeId: value }]
              }
            ]
          : makeData(virtualized ? 1000 : 5, virtualized ? 700 : 2, value);
      const onEntered = vi.fn();
      const onChange = vi.fn();
      const onExpand = vi.fn();
      const getChildren = vi.fn(() => Promise.resolve([{ label: 'Selected node', nodeId: value }]));
      render(
        <TreePicker
          {...pickerProps}
          data={data}
          defaultValue={value}
          virtualized={virtualized}
          disabledItemValues={condition === 'disabled' ? [value] : []}
          searchKeyword={condition === 'filtered' ? 'Node 0' : undefined}
          onEntered={onEntered}
          onChange={onChange}
          onExpand={onExpand}
          getChildren={condition === 'unloaded' ? getChildren : undefined}
        />
      );
      await open(onEntered, 1);
      await close();
      await open(onEntered, 2);
      expect(screen.getByRole('combobox')).to.have.focus;
      expect(screen.getByRole('combobox')).not.to.have.attribute('aria-activedescendant');
      expect(onChange).not.toHaveBeenCalled();
      expect(onExpand).not.toHaveBeenCalled();
      expect(getChildren).not.toHaveBeenCalled();
      if (condition === 'folded' || condition === 'unloaded') {
        expect(screen.getByRole('button', { name: 'Expand Parent' })).to.exist;
        expect(screen.queryByRole('treeitem', { name: 'Selected node' })).to.be.null;
      } else {
        expect(screen.getByRole('combobox')).to.have.text('Selected node');
        if (virtualized)
          expect(document.querySelector<HTMLElement>('.rs-tree-virt-list')?.scrollTop).to.equal(0);
      }
    }
  );
});
