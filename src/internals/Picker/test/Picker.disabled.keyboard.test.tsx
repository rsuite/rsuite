import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import TreePicker from '../../../TreePicker';
import CheckTreePicker from '../../../CheckTreePicker';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import InputPicker from '../../../InputPicker';
import TagPicker from '../../../TagPicker';
import '../../../SelectPicker/styles/index.scss';
import '../../../CheckPicker/styles/index.scss';
import '../../../TreePicker/styles/index.scss';
import '../../../CheckTreePicker/styles/index.scss';
import '../../../Cascader/styles/index.scss';
import '../../../MultiCascader/styles/index.scss';
import '../../../InputPicker/styles/index.scss';
import '../../../TagPicker/styles/index.scss';

const data = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' }
];
const pickers: [string | undefined, React.ElementType][] = [
  SelectPicker,
  CheckPicker,
  TreePicker,
  CheckTreePicker,
  Cascader,
  MultiCascader,
  InputPicker,
  TagPicker
].map(Picker => [Picker.displayName, Picker]);
let keys: KeyboardEvent[];
const recordKey = (event: KeyboardEvent) => keys.push(event);
beforeEach(() => {
  keys = [];
  document.addEventListener('keydown', recordKey, true);
});
afterEach(() => {
  document.removeEventListener('keydown', recordKey, true);
  expect(keys.length).toBeGreaterThan(0);
  expect(keys.every(event => event.isTrusted)).toBe(true);
});
const press = (key: string) => act(async () => userEvent.keyboard(`{${key}}`));

describe('Picker dynamically disabled keyboard selection', () => {
  it.each(pickers)('%s keeps selection locked and resumes when enabled', async (_name, Picker) => {
    const onChange = vi.fn();
    const onKeyDown = vi.fn();
    const { rerender } = render(<Picker data={data} defaultOpen onChange={onChange} />);
    const combo = screen.getByRole('combobox');
    act(() => combo.focus());
    await press('ArrowDown');
    const alpha = await screen.findByRole(
      /Tree|Cascader/.test(_name || '') ? 'treeitem' : 'option',
      { name: 'Alpha' }
    );
    await waitFor(() => expect(alpha).toHaveFocus());
    rerender(<Picker data={data} defaultOpen disabled onChange={onChange} onKeyDown={onKeyDown} />);
    expect(alpha).toHaveFocus();
    await press('ArrowDown');
    expect(alpha).toHaveFocus();
    await press('Enter');
    expect(onKeyDown).toHaveBeenCalledTimes(2);
    expect(onKeyDown.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
    expect(alpha).toHaveFocus();
    rerender(<Picker data={data} defaultOpen onChange={onChange} onKeyDown={onKeyDown} />);
    await press('Enter');
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toEqual(
      /^(Check|Multi|Tag)/.test(_name || '') ? ['alpha'] : 'alpha'
    );
    expect(onKeyDown).toHaveBeenCalledTimes(3);
    expect(onChange.mock.invocationCallOrder[0]).toBeLessThan(
      onKeyDown.mock.invocationCallOrder[2]
    );
  });

  it.each(pickers)('%s preserves a nonempty value on disabled Backspace', async (_name, Picker) => {
    const onChange = vi.fn();
    const onKeyDown = vi.fn();
    const defaultValue = /^(Check|Multi|Tag)/.test(_name || '') ? ['beta'] : 'beta';
    const { rerender } = render(
      <Picker data={data} defaultOpen defaultValue={defaultValue} onChange={onChange} />
    );
    const combo = screen.getByRole('combobox');
    act(() => combo.focus());
    await press('ArrowDown');
    const alpha = await screen.findByRole(
      /Tree|Cascader/.test(_name || '') ? 'treeitem' : 'option',
      { name: 'Alpha' }
    );
    await waitFor(() => expect(alpha).toHaveFocus());
    rerender(
      <Picker
        data={data}
        defaultOpen
        defaultValue={defaultValue}
        disabled
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
    await press('Backspace');
    expect(onKeyDown).toHaveBeenCalledOnce();
    expect(onKeyDown.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('combobox').closest('[data-picker]')).toHaveTextContent('Beta');
  });

  it.each(pickers)('%s selects normally while enabled', async (_name, Picker) => {
    const onChange = vi.fn();
    render(<Picker data={data} defaultOpen onChange={onChange} />);
    act(() => screen.getByRole('combobox').focus());
    await press('ArrowDown');
    const alpha = await screen.findByRole(
      /Tree|Cascader/.test(_name || '') ? 'treeitem' : 'option',
      { name: 'Alpha' }
    );
    await waitFor(() => expect(alpha).toHaveFocus());
    await press('Enter');
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toEqual(
      /^(Check|Multi|Tag)/.test(_name || '') ? ['alpha'] : 'alpha'
    );
    expect(onChange.mock.calls.every(call => call[1].nativeEvent.isTrusted)).toBe(true);
  });
});
