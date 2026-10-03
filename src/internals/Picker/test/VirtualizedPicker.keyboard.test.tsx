import { act, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import {
  initialTarget,
  menu,
  mountPicker,
  pickerCases,
  selectedValue
} from './VirtualizedPickerTestSupport';

async function expectFocus(value: number) {
  await waitFor(() => {
    const option = menu().getByRole('option', { name: `Option ${value}` });
    const combobox = screen.getByRole('combobox');
    expect(combobox.tagName === 'INPUT' ? combobox : option).to.have.focus;
    expect(combobox).to.have.attr('aria-activedescendant', option.id);
  });
}

// Native keyboard tests run serially with the other *.keyboard.test.tsx suites.
describe.each(pickerCases)('$name virtualized native keyboard', testCase => {
  it('keeps focus through consecutive arrows beyond the mounted rows and selects the intended item', async () => {
    const { onChange } = mountPicker(testCase);
    await act(async () => {
      if (!testCase.editable) initialTarget().focus();
      await userEvent.keyboard('{ArrowDown}');
    });
    await expectFocus(1);

    await act(async () => {
      await userEvent.keyboard('{ArrowUp}');
    });
    await expectFocus(1000);
    await act(async () => {
      await userEvent.keyboard('{ArrowDown}');
    });
    await expectFocus(1);

    for (let index = 1; index < 20; index++) {
      await act(async () => {
        await userEvent.keyboard('{ArrowDown}');
      });
    }
    await expectFocus(20);

    await act(async () => {
      await userEvent.keyboard('{Enter}');
    });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      selectedValue(testCase, 20),
      expect.anything()
    );
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;

    if (testCase.multiple) {
      expect(menu().getByRole('option', { name: 'Option 20' })).to.have.attribute(
        'aria-selected',
        'true'
      );
      await act(async () => {
        await userEvent.keyboard('{Enter}');
      });
      expect(onChange).toHaveBeenLastCalledWith([], expect.anything());
      expect(onChange).toHaveBeenCalledTimes(2);
      await expectFocus(20);
      expect(menu().getByRole('option', { name: 'Option 20' })).to.have.attribute(
        'aria-selected',
        'false'
      );
    } else {
      expect(screen.getByRole('combobox')).to.have.focus;
    }
  });

  it('jumps over disabled rows when every initially mounted option is disabled', async () => {
    const { onChange } = mountPicker(testCase, {
      disabledItemValues: Array.from({ length: 12 }, (_, index) => index + 1)
    });
    await act(async () => {
      if (!testCase.editable) initialTarget().focus();
      await userEvent.keyboard('{ArrowDown}');
    });
    await expectFocus(13);
    await act(async () => {
      await userEvent.keyboard('{Enter}');
    });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      selectedValue(testCase, 13),
      expect.anything()
    );
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
  });
});
