import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  data,
  menu,
  mountPicker,
  pickerCases,
  pickerElement,
  selectedValue
} from './VirtualizedPickerTestSupport';

function press(key: string) {
  const combobox = screen.getByRole('combobox');
  fireEvent.keyDown(combobox.tagName === 'INPUT' ? combobox : menu().getByRole('listbox'), { key });
}

async function expectFocus(value: number) {
  await waitFor(() => {
    const option = menu().getByRole('option', { name: `Option ${value}` });
    const combobox = screen.getByRole('combobox');
    expect(combobox.tagName === 'INPUT' ? combobox : option).to.have.focus;
    expect(screen.getByRole('combobox')).to.have.attribute('aria-activedescendant', option.id);
  });
}

describe.each(pickerCases)('$name virtualized keyboard collection', testCase => {
  it('wraps across the full list and skips disabled options outside the rendered window', async () => {
    mountPicker(testCase, { disabledItemValues: [1, 1000] });
    press('ArrowDown');
    await expectFocus(2);
    press('ArrowUp');
    await expectFocus(999);
    press('ArrowUp');
    await expectFocus(998);
    press('ArrowDown');
    press('ArrowDown');
    await expectFocus(2);
  });

  it('navigates from a selected value after it is scrolled out of view', async () => {
    const { ref } = mountPicker(testCase, { defaultValue: selectedValue(testCase, 500) });
    expect(menu().getByRole('option', { name: 'Option 500' })).to.have.attribute(
      'aria-selected',
      'true'
    );
    act(() => ref.current?.list?.scrollToItem?.(0));
    await waitFor(() => expect(menu().getAllByRole('option')[0]).to.have.text('Option 1'));
    press('ArrowDown');
    await expectFocus(501);
  });

  it('uses the current filtered and sorted order', async () => {
    mountPicker(testCase, {
      searchable: true,
      defaultValue: selectedValue(testCase, 1000),
      sort: () => (a, b) => b.value - a.value,
      searchBy: (keyword, _label, item) => !keyword || Number(item.value) >= 990
    });
    press('ArrowDown');
    await expectFocus(999);
    const search = testCase.editable ? screen.getByRole('combobox') : screen.getByRole('searchbox');
    fireEvent.change(search, { target: { value: 'last' } });
    press('ArrowUp');
    await expectFocus(991);
    expect(menu().queryByRole('option', { name: 'Option 989' })).to.be.null;
  });

  it('skips folded groups, group headers, and disabled options', async () => {
    mountPicker(testCase, {
      data: data.map(item => ({ ...item, group: item.value <= 25 ? 'A' : 'B' })),
      groupBy: 'group',
      defaultValue: selectedValue(testCase, 1),
      disabledItemValues: [26]
    });
    fireEvent.click(menu().getByText('A'));
    press('ArrowDown');
    await expectFocus(27);
    press('ArrowUp');
    await expectFocus(1000);
  });

  it('keeps controlled selection unchanged until the owner accepts the requested item', async () => {
    const { onChange, onSelect, rerender } = mountPicker(testCase, {
      value: selectedValue(testCase, 500),
      ...(testCase.name === 'CheckPicker' ? { countable: false } : {})
    });
    press('ArrowDown');
    await expectFocus(501);
    press('Enter');
    const nextValue = testCase.multiple ? [500, 501] : 501;
    expect(onChange).toHaveBeenCalledExactlyOnceWith(nextValue, expect.anything());
    expect(onSelect).toHaveBeenCalledExactlyOnceWith(
      nextValue,
      expect.objectContaining({ value: 501 }),
      expect.anything()
    );
    expect(screen.getByTestId('picker').textContent).toContain('Option 500');
    expect(screen.getByTestId('picker').textContent).not.toContain('Option 501');
    rerender(
      pickerElement(testCase, {
        value: nextValue,
        onChange,
        onSelect,
        ...(testCase.name === 'CheckPicker' ? { countable: false } : {})
      })
    );
    expect(screen.getByTestId('picker').textContent).toContain('Option 501');
  });
});

it('CheckPicker preserves sticky selected-item order when wrapping beyond the mounted rows', async () => {
  const testCase = pickerCases[0];
  mountPicker(testCase, { sticky: true, defaultValue: [500] });
  press('ArrowDown');
  await expectFocus(1);
  press('ArrowUp');
  await expectFocus(500);
  press('ArrowUp');
  await expectFocus(1000);
});
