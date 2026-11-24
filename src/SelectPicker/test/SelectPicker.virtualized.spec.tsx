import React from 'react';
import SelectPicker, { SelectPickerProps } from '../SelectPicker';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { PickerHandle } from '../../internals/Picker/types';
import type { ListHandle } from '../../internals/Windowing';
import '../styles/index.scss';

const data = Array.from({ length: 1000 }, (_, index) => ({
  label: `Option ${index + 1}`,
  value: index + 1
}));

function mount(props: Partial<SelectPickerProps<number>> = {}) {
  const ref = React.createRef<PickerHandle>();
  const onChange = vi.fn();
  const view = render(
    <SelectPicker
      ref={ref}
      defaultOpen
      virtualized
      searchable={false}
      data={data}
      listboxMaxHeight={180}
      listProps={{ itemSize: 36, overscanCount: 0 }}
      onChange={onChange}
      {...props}
    />
  );
  return { ref, onChange, ...view };
}

function press(key: string) {
  fireEvent.keyDown(screen.getByRole('listbox'), { key });
}

async function expectFocus(value: number | string) {
  await waitFor(() => {
    const option = screen.getByRole('option', { name: `Option ${value}` });
    expect(option).to.have.focus;
    expect(screen.getByRole('combobox')).to.have.attribute('aria-activedescendant', option.id);
  });
}

describe('SelectPicker virtualized keyboard navigation', () => {
  it('Should keep mounted option nodes when their focus changes', async () => {
    mount();
    const first = screen.getByRole('option', { name: 'Option 1' });
    press('ArrowDown');
    await expectFocus(1);
    expect(screen.getByRole('option', { name: 'Option 1' })).to.equal(first);

    press('ArrowDown');
    await expectFocus(2);
    expect(screen.getByRole('option', { name: 'Option 1' })).to.equal(first);
  });

  it('Should navigate and select beyond the rendered window', async () => {
    const { onChange } = mount();
    for (let index = 0; index < 20; index++) {
      press('ArrowDown');
    }
    await expectFocus(20);
    const list = document.querySelector('.rs-virt-list') as HTMLElement;
    const option = screen.getByRole('option', { name: 'Option 20' });
    expect(list.scrollTop).to.be.greaterThan(0);
    expect(option.getBoundingClientRect().top).to.be.at.least(list.getBoundingClientRect().top);
    expect(Math.round(option.getBoundingClientRect().bottom)).to.be.at.most(
      Math.round(list.getBoundingClientRect().bottom)
    );

    press('Enter');
    expect(onChange).toHaveBeenCalledExactlyOnceWith(20, expect.anything());
  });

  it('Should wrap across the entire list in both directions', async () => {
    mount();
    press('ArrowDown');
    press('ArrowUp');
    await expectFocus(1000);
    press('ArrowUp');
    await expectFocus(999);
    press('ArrowDown');
    press('ArrowDown');
    await expectFocus(1);
  });

  it('Should navigate from the selected value after it is scrolled out of view', async () => {
    const { ref } = mount({ defaultValue: 500 });
    expect(screen.getByRole('option', { selected: true })).to.have.text('Option 500');
    act(() => ref.current?.list?.scrollToItem?.(0));
    await waitFor(() => expect(screen.getAllByRole('option')[0]).to.have.text('Option 1'));
    press('ArrowDown');
    await expectFocus(501);
  });

  it('Should skip disabled options even when none of the enabled options are mounted', async () => {
    mount({ disabledItemValues: [...Array.from({ length: 12 }, (_, index) => index + 1), 1000] });
    press('ArrowDown');
    await expectFocus(13);
    press('ArrowUp');
    await expectFocus(999);
  });

  it('Should navigate in the filtered and sorted order', async () => {
    mount({
      searchable: true,
      defaultValue: 1000,
      sort: () => (a, b) => b.value - a.value,
      searchBy: (keyword, _label, item) => !keyword || Number(item.value) >= 990
    });
    press('ArrowDown');
    await expectFocus(999);

    const search = screen.getByRole('searchbox');
    search.focus();
    fireEvent.change(search, { target: { value: 'last' } });
    expect(search).to.have.focus;
    press('ArrowUp');
    await expectFocus(991);
  });

  it('Should skip group headers, folded options and disabled options', async () => {
    mount({
      data: data.map(item => ({ ...item, group: item.value <= 25 ? 'A' : 'B' })),
      groupBy: 'group',
      defaultValue: 1,
      disabledItemValues: [26]
    });
    fireEvent.click(screen.getByText('A'));
    press('ArrowDown');
    await expectFocus(27);
    press('ArrowUp');
    await expectFocus(1000);
  });

  it('Should use updated data when the focused item is removed', async () => {
    const { rerender } = mount({ defaultValue: 500 });
    rerender(
      <SelectPicker
        defaultOpen
        virtualized
        data={[{ label: 'Option 1001', value: 1001 }]}
        listboxMaxHeight={180}
      />
    );
    press('ArrowDown');
    await expectFocus(1001);
  });

  it('Should preserve list props and report the new visible range', async () => {
    const onItemsRendered = vi.fn();
    const onScroll = vi.fn();
    const itemKey = vi.fn((index, items) => items[index].value);
    const listRef = React.createRef<ListHandle>();
    const { ref } = mount({
      listProps: {
        itemSize: 60,
        itemKey,
        onItemsRendered,
        onScroll,
        overscanCount: 0,
        ref: listRef
      }
    });
    expect(ref.current?.list).to.equal(listRef.current);
    for (let index = 0; index < 10; index++) press('ArrowDown');
    await expectFocus(10);
    expect(screen.getByRole('option', { name: 'Option 10' })).to.have.style('height', '60px');
    expect(itemKey).toHaveBeenCalledWith(expect.any(Number), data);
    expect(onItemsRendered).toHaveBeenLastCalledWith(
      expect.objectContaining({ visibleStopIndex: 9 })
    );
    expect(onScroll).toHaveBeenCalledWith(
      expect.objectContaining({ scrollUpdateWasRequested: true })
    );
  });

  it.each([0, ''])('Should navigate from the valid value %j', async value => {
    render(
      <SelectPicker
        defaultOpen
        defaultValue={value}
        virtualized
        data={[{ value, label: `Option ${value}` }, ...data]}
      />
    );
    press('ArrowDown');
    await expectFocus(1);
  });

  it.each(['quoted"value', 'backslash\\value'])(
    'Should focus the unmounted option with the literal value %j',
    async value => {
      render(
        <SelectPicker<number | string>
          defaultOpen
          defaultValue={1}
          virtualized
          data={[...data, { value, label: `Option ${value}` }]}
          disabledItemValues={data.slice(1).map(item => item.value)}
          listboxMaxHeight={180}
        />
      );
      press('ArrowDown');
      await expectFocus(value);
    }
  );

  it('Should keep the controlled selection and focus when reopened', async () => {
    const onChange = vi.fn();
    function ControlledPicker() {
      const [value, setValue] = React.useState(500);
      return (
        <SelectPicker
          defaultOpen
          virtualized
          data={data}
          value={value}
          listboxMaxHeight={180}
          onChange={(value, event) => {
            setValue(value!);
            onChange(value, event);
          }}
        />
      );
    }
    render(<ControlledPicker />);
    press('ArrowDown');
    await expectFocus(501);
    press('Enter');
    expect(onChange).toHaveBeenCalledExactlyOnceWith(501, expect.anything());
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
    await waitFor(() =>
      expect(screen.getByRole('option', { selected: true })).to.have.text('Option 501')
    );
    press('ArrowDown');
    await expectFocus(502);
  });

  it('Should retain keyboard focus when the controlled selection changes', async () => {
    const renderPicker = (value: number) => (
      <SelectPicker defaultOpen virtualized value={value} data={data} listboxMaxHeight={180} />
    );
    const { rerender } = render(renderPicker(1));
    press('ArrowDown');
    await expectFocus(2);
    rerender(renderPicker(3));
    expect(screen.getByRole('option', { selected: true })).to.have.text('Option 3');
    await expectFocus(2);
    press('ArrowDown');
    await expectFocus(3);
  });

  it('Should clean up the custom list ref and clear the public handle on unmount', async () => {
    const cleanups: ReturnType<typeof vi.fn>[] = [];
    let currentList: ListHandle | null = null;
    const listRef = vi.fn((list: ListHandle | null) => {
      if (!list) return;
      currentList = list;
      const cleanup = vi.fn(() => {
        currentList = null;
      });
      cleanups.push(cleanup);
      return cleanup;
    });
    const { ref, unmount } = mount({ listProps: { itemSize: 36, ref: listRef } });
    const picker = ref.current!;
    for (let index = 0; index < 20; index++) press('ArrowDown');
    await expectFocus(20);
    expect(picker.list).to.equal(currentList);

    unmount();

    expect(currentList).to.equal(null);
    expect(cleanups.length).to.be.greaterThan(0);
    cleanups.forEach(cleanup => expect(cleanup).toHaveBeenCalledTimes(1));
    expect(listRef).not.toHaveBeenCalledWith(null);
    expect(() => picker.list).to.throw('The list is not found');
  });

  it('Should detach a custom list callback ref with null when it returns no cleanup', async () => {
    let currentList: ListHandle | null = null;
    const listRef = vi.fn((list: ListHandle | null) => {
      currentList = list;
    });
    const { ref, unmount } = mount({ listProps: { itemSize: 36, ref: listRef } });
    press('ArrowDown');
    await expectFocus(1);
    expect(ref.current?.list).to.equal(currentList);

    unmount();

    expect(currentList).to.equal(null);
    const attachments = listRef.mock.calls.filter(([list]) => list !== null);
    const detachments = listRef.mock.calls.filter(([list]) => list === null);
    expect(attachments.length).to.be.greaterThan(0);
    expect(detachments).to.have.length(attachments.length);
  });
});
