import { act, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  expectTypedValue,
  mountTypedPicker,
  typedMenu,
  typedPickerCases
} from './TypedPickerTestSupport';

let nativeKeys: KeyboardEvent[];
const recordKey = (event: KeyboardEvent) => nativeKeys.push(event);
beforeEach(() => {
  nativeKeys = [];
  document.addEventListener('keydown', recordKey, true);
});
afterEach(() => {
  document.removeEventListener('keydown', recordKey, true);
  expect(nativeKeys.length).to.be.greaterThan(0);
  expect(nativeKeys.every(event => event.isTrusted)).to.be.true;
});

describe.each(typedPickerCases)('$name native typed option navigation', testCase => {
  it.each([
    { name: 'regular', customKeys: false },
    { name: 'custom valueKey', customKeys: true },
    { name: 'mounted virtual', virtualized: true },
    { name: 'distant virtual', virtualized: true, distant: true },
    { name: 'disabled numeric', disabledNumber: true }
  ])('preserves focus and selects string zero in $name data', async options => {
    const { onChange } = mountTypedPicker(testCase, options);
    const combobox = screen.getByRole('combobox');
    await act(async () => {
      combobox.focus();
      await userEvent.keyboard('{ArrowDown}');
    });
    if (!options.disabledNumber) {
      await act(async () => userEvent.keyboard('{ArrowDown}'));
    }
    await waitFor(() => {
      const string = typedMenu().getByRole('option', { name: 'String zero' });
      expect(testCase.editable ? combobox : string).to.have.focus;
      expect(combobox).to.have.attr('aria-activedescendant', string.id);
      expect(document.getElementById(string.id)).to.equal(string);
      const ids = typedMenu()
        .getAllByRole('option')
        .map(option => option.id);
      expect(new Set(ids).size).to.equal(ids.length);
    });
    await act(async () => userEvent.keyboard('{Enter}'));
    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      expectTypedValue(testCase, '0'),
      expect.anything()
    );
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
  });
});
