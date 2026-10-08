import React from 'react';
import SelectPicker from '../SelectPicker';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { expect, it, vi } from 'vitest';
import type { PickerHandle } from '@/internals/Picker/types';
import '../styles/index.scss';

function expectActiveOption(value: number, focused = true) {
  const option = screen.getByRole('option', { name: `Option ${value}` });
  const combobox = screen.getByRole('combobox');
  const popup = document.getElementById(combobox.getAttribute('aria-controls')!);
  const activeId = combobox.getAttribute('aria-activedescendant');
  expect(activeId).toBe(option.id);
  expect(document.getElementById(activeId!)).toBe(option);
  expect(popup).to.contain(option);
  expect(
    Array.from(document.querySelectorAll('[id]')).filter(node => node.id === activeId)
  ).toHaveLength(1);
  const bounds = option.getBoundingClientRect();
  const viewport = option.closest('.rs-virt-list')?.getBoundingClientRect();
  expect(bounds.height).toBeGreaterThan(0);
  if (viewport) {
    expect(Math.round(bounds.top)).toBeGreaterThanOrEqual(Math.round(viewport.top));
    expect(Math.round(bounds.bottom)).toBeLessThanOrEqual(Math.round(viewport.bottom));
  }
  if (focused) expect(option).to.have.focus;
}

// Exercise native keys against a complete virtualized option list.
it('Should retain focus across consecutive native Arrow keys and select beyond the virtual window', async () => {
  const onChange = vi.fn();
  const onEntered = vi.fn();
  render(
    <SelectPicker
      onEntered={onEntered}
      defaultOpen
      virtualized
      searchable={false}
      data={Array.from({ length: 1000 }, (_, index) => ({
        label: `Option ${index + 1}`,
        value: index + 1
      }))}
      listboxMaxHeight={180}
      listProps={{ itemSize: 36, overscanCount: 0 }}
      onChange={onChange}
    />
  );

  await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
  await act(async () => {
    // Focus the toggle once; all subsequent keys must follow the option's native focus.
    screen.getByRole('combobox').focus();
    await userEvent.keyboard('{ArrowDown}');
  });
  expect(screen.getByRole('option', { name: 'Option 1' })).to.have.focus;
  expectActiveOption(1);

  await act(async () => {
    await userEvent.keyboard('{ArrowUp}');
  });
  await waitFor(() => expect(screen.getByRole('option', { name: 'Option 1000' })).to.have.focus);
  expectActiveOption(1000);
  await act(async () => {
    await userEvent.keyboard('{ArrowDown}');
  });
  await waitFor(() => expect(screen.getByRole('option', { name: 'Option 1' })).to.have.focus);
  expectActiveOption(1);

  await act(async () => {
    await userEvent.keyboard('{ArrowDown}');
  });
  expect(screen.getByRole('option', { name: 'Option 2' })).to.have.focus;

  for (let index = 0; index < 18; index++) {
    await act(async () => {
      await userEvent.keyboard('{ArrowDown}');
    });
    expectActiveOption(index + 3);
  }
  expect(screen.getByRole('option', { name: 'Option 20' })).to.have.focus;
  expectActiveOption(20);

  await act(async () => {
    await userEvent.keyboard('{Enter}');
  });
  expect(onChange).toHaveBeenCalledExactlyOnceWith(20, expect.anything());
  expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
  expect(screen.getByRole('combobox')).to.have.focus;
});

it('Should focus an offscreen selected option when it is the only enabled value', async () => {
  const ref = React.createRef<PickerHandle>();
  const onSelect = vi.fn();
  const onEntered = vi.fn();
  render(
    <SelectPicker
      onEntered={onEntered}
      ref={ref}
      defaultOpen
      defaultValue={500}
      virtualized
      searchable={false}
      data={Array.from({ length: 1000 }, (_, index) => ({
        label: `Option ${index + 1}`,
        value: index + 1
      }))}
      disabledItemValues={Array.from({ length: 1000 }, (_, index) => index + 1).filter(
        value => value !== 500
      )}
      listboxMaxHeight={180}
      listProps={{ itemSize: 36, overscanCount: 0 }}
      onSelect={onSelect}
    />
  );
  await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
  act(() => ref.current?.list?.scrollToItem?.(0));
  await waitFor(() => expect(screen.getByRole('option', { name: 'Option 1' })).to.exist);

  await act(async () => {
    screen.getByRole('combobox').focus();
    await userEvent.keyboard('{ArrowDown}');
  });
  await waitFor(() => expect(screen.getByRole('option', { name: 'Option 500' })).to.have.focus);
  expectActiveOption(500);
  await act(async () => {
    await userEvent.keyboard('{ArrowUp}{Enter}');
  });
  expect(onSelect).toHaveBeenCalledExactlyOnceWith(
    500,
    expect.objectContaining({ value: 500 }),
    expect.anything()
  );
  expect(onSelect.mock.calls[0][2].nativeEvent.isTrusted).to.be.true;
  await waitFor(() => expect(screen.getByRole('combobox')).to.have.focus);
});

it('Should cancel a queued keyboard request when an event handler focuses another control', async () => {
  const buttonRef = React.createRef<HTMLButtonElement>();
  const onEntered = vi.fn();
  render(
    <div onKeyDown={() => buttonRef.current?.focus()}>
      <SelectPicker
        onEntered={onEntered}
        open
        defaultValue={1}
        virtualized
        searchable={false}
        data={Array.from({ length: 1000 }, (_, index) => ({
          label: `Option ${index + 1}`,
          value: index + 1
        }))}
        disabledItemValues={Array.from({ length: 1000 }, (_, index) => index + 1).filter(
          value => value !== 1 && value !== 500
        )}
        listboxMaxHeight={180}
        listProps={{ itemSize: 36, overscanCount: 0 }}
      />
      <button ref={buttonRef}>Next control</button>
    </div>
  );
  await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
  await act(async () => {
    screen.getByRole('option', { name: 'Option 1' }).focus();
    await userEvent.keyboard('{ArrowDown}');
  });
  expect(screen.getByRole('button', { name: 'Next control' })).to.have.focus;
  expectActiveOption(1, false);
  expect(screen.getByRole('option', { name: 'Option 1' })).to.exist;
  expect(screen.queryByRole('option', { name: 'Option 500' })).to.be.null;
  expect(document.querySelector('.rs-virt-list')?.scrollTop).to.equal(0);
});

it('Should discard a queued request when its option is removed before the commit', async () => {
  const onSelect = vi.fn();
  const onEntered = vi.fn();
  const data = Array.from({ length: 1000 }, (_, index) => ({
    label: `Option ${index + 1}`,
    value: index + 1
  }));
  function Fixture() {
    const [items, setItems] = React.useState(data);
    return (
      <div
        onKeyDown={event => {
          if (event.key === 'ArrowUp') setItems(data.slice(0, 20));
        }}
      >
        <SelectPicker
          onEntered={onEntered}
          defaultOpen
          defaultValue={1}
          virtualized
          searchable={false}
          data={items}
          listboxMaxHeight={180}
          listProps={{ itemSize: 36, overscanCount: 0 }}
          onSelect={onSelect}
        />
      </div>
    );
  }
  render(<Fixture />);
  await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
  await act(async () => {
    screen.getByRole('option', { name: 'Option 1' }).focus();
    await userEvent.keyboard('{ArrowUp}');
  });
  expect(screen.getByRole('option', { name: 'Option 1' })).to.have.focus;
  expect(screen.getByRole('option', { name: 'Option 1' })).to.have.attribute('aria-setsize', '20');
  expectActiveOption(1);
  expect(document.querySelector('.rs-virt-list')?.scrollTop).to.equal(0);
  expect(screen.queryByRole('option', { name: 'Option 1000' })).to.be.null;

  await act(async () => {
    await userEvent.keyboard('{ArrowDown}');
  });
  await waitFor(() => expect(screen.getByRole('option', { name: 'Option 2' })).to.have.focus);
  expectActiveOption(2);
  await act(async () => {
    await userEvent.keyboard('{Enter}');
  });
  expect(onSelect).toHaveBeenCalledExactlyOnceWith(
    2,
    expect.objectContaining({ value: 2 }),
    expect.anything()
  );
  expect(onSelect.mock.calls[0][2].nativeEvent.isTrusted).to.be.true;
});

it('cancels a queued request when its option becomes disabled before commit', async () => {
  const onEntered = vi.fn();
  const onSelect = vi.fn();
  const data = Array.from({ length: 1000 }, (_, index) => ({
    label: `Option ${index + 1}`,
    value: index + 1
  }));
  function Fixture() {
    const [disabled, setDisabled] = React.useState(false);
    return (
      <div onKeyDown={event => event.key === 'ArrowUp' && setDisabled(true)}>
        <SelectPicker
          defaultOpen
          defaultValue={1}
          virtualized
          searchable={false}
          data={data}
          disabledItemValues={disabled ? [1000] : []}
          listboxMaxHeight={180}
          listProps={{ itemSize: 36, overscanCount: 0 }}
          onSelect={onSelect}
          onEntered={onEntered}
        />
      </div>
    );
  }
  render(<Fixture />);
  await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
  await act(async () => {
    screen.getByRole('option', { name: 'Option 1' }).focus();
    await userEvent.keyboard('{ArrowUp}');
  });
  expectActiveOption(1);
  expect(document.querySelector('.rs-virt-list')?.scrollTop).toBe(0);
  expect(onSelect).not.toHaveBeenCalled();
  await act(() => userEvent.keyboard('{ArrowDown}'));
  expectActiveOption(2);
  await act(() => userEvent.keyboard('{Enter}'));
  expect(onSelect).toHaveBeenCalledExactlyOnceWith(2, data[1], expect.anything());
  expect(onSelect.mock.calls[0][2].nativeEvent.isTrusted).toBe(true);
});

it('preserves ordinary list wrapping with native keys', async () => {
  const onEntered = vi.fn();
  const onChange = vi.fn();
  render(
    <SelectPicker
      defaultOpen
      virtualized={false}
      searchable={false}
      data={Array.from({ length: 1000 }, (_, index) => ({
        value: index + 1,
        label: `Option ${index + 1}`
      }))}
      onEntered={onEntered}
      onChange={onChange}
    />
  );
  await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
  await act(async () => {
    screen.getByRole('combobox').focus();
    await userEvent.keyboard('{ArrowDown}');
  });
  expectActiveOption(1);
  await act(() => userEvent.keyboard('{ArrowUp}'));
  const option = screen.getByRole('option', { name: 'Option 1000' });
  expect(option).to.have.focus;
  expect(screen.getByRole('combobox')).to.have.attribute('aria-activedescendant', option.id);
  await act(() => userEvent.keyboard('{Enter}'));
  expect(onChange).toHaveBeenCalledExactlyOnceWith(1000, expect.anything());
  expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
});
