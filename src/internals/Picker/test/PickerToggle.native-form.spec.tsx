import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PickerToggle from '../PickerToggle';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import TreePicker from '../../../TreePicker';
import CheckTreePicker from '../../../CheckTreePicker';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import CustomProvider from '../../../CustomProvider';

const data = [
  { value: 0, label: 'Zero' },
  { value: 1, label: 'One' }
];
const pickers: [string, React.ElementType, boolean][] = [
  ['SelectPicker', SelectPicker, false],
  ['CheckPicker', CheckPicker, true],
  ['TreePicker', TreePicker, false],
  ['CheckTreePicker', CheckTreePicker, true],
  ['Cascader', Cascader, false],
  ['MultiCascader', MultiCascader, true]
];

function entries() {
  return new FormData(screen.getByRole('form', { name: 'Settings' }) as HTMLFormElement);
}

describe.each(pickers)('%s native form submission', (_, Picker, multiple) => {
  const value = (number: number) => (multiple ? [number] : number);

  it('omits disabled selections like a disabled native input', () => {
    const onChange = vi.fn();
    render(
      <form aria-label="Settings">
        <input name="native" value="0" disabled readOnly />
        <Picker name="choice" data={data} value={value(0)} disabled onChange={onChange} />
      </form>
    );

    expect(entries().has('native')).toBe(false);
    expect(entries().has('choice')).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('submits an enabled zero selection exactly once', () => {
    render(
      <form aria-label="Settings">
        <Picker name="choice" data={data} value={value(0)} />
      </form>
    );

    expect(entries().getAll('choice')).toEqual(['0']);
  });

  it('continues to submit read-only selections', () => {
    render(
      <form aria-label="Settings">
        <Picker name="choice" data={data} value={value(0)} readOnly />
      </form>
    );

    expect(entries().getAll('choice')).toEqual(['0']);
  });

  it('follows disabled changes and submits the latest selection when enabled again', () => {
    const onChange = vi.fn();
    const form = (disabled: boolean, selected: number) => (
      <form aria-label="Settings">
        <Picker
          name="choice"
          data={data}
          value={value(selected)}
          disabled={disabled}
          onChange={onChange}
        />
      </form>
    );
    const { rerender } = render(form(false, 0));
    expect(entries().getAll('choice')).toEqual(['0']);

    rerender(form(true, 1));
    expect(entries().has('choice')).toBe(false);

    rerender(form(false, 1));
    expect(entries().getAll('choice')).toEqual(['1']);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('PickerToggle native form states', () => {
  it('keeps loading selections in the submission', () => {
    render(
      <form aria-label="Settings">
        <PickerToggle name="choice" inputValue="selected" loading hasValue>
          Selected
        </PickerToggle>
      </form>
    );
    expect(entries().getAll('choice')).toEqual(['selected']);
  });

  it('allows a disabled fieldset to exclude a selection', () => {
    render(
      <form aria-label="Settings">
        <fieldset disabled>
          <SelectPicker name="choice" data={data} value={0} />
        </fieldset>
      </form>
    );
    expect(entries().has('choice')).toBe(false);
  });

  it('honors disabled defaults from CustomProvider', () => {
    render(
      <CustomProvider components={{ SelectPicker: { defaultProps: { disabled: true } } }}>
        <form aria-label="Settings">
          <SelectPicker name="choice" data={data} value={0} />
        </form>
      </CustomProvider>
    );
    expect(entries().has('choice')).toBe(false);
  });
});
