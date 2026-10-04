import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import InputPicker from '../../../InputPicker';
import TagPicker from '../../../TagPicker';
import '../../../SelectPicker/styles/index.scss';
import '../../../CheckPicker/styles/index.scss';
import '../../../InputPicker/styles/index.scss';
import '../../../TagPicker/styles/index.scss';

export const typedPickerCases = [
  { name: 'SelectPicker', Component: SelectPicker, multiple: false, editable: false },
  { name: 'CheckPicker', Component: CheckPicker, multiple: true, editable: false },
  { name: 'InputPicker', Component: InputPicker, multiple: false, editable: true },
  { name: 'TagPicker', Component: TagPicker, multiple: true, editable: true }
];
export type TypedPickerCase = (typeof typedPickerCases)[number];

export function mountTypedPicker(
  testCase: TypedPickerCase,
  options: {
    customKeys?: boolean;
    virtualized?: boolean;
    distant?: boolean;
    disabledNumber?: boolean;
  } = {}
) {
  const { customKeys, virtualized, distant, disabledNumber } = options;
  const fillers = distant
    ? Array.from({ length: 50 }, (_, index) => ({
        label: `Disabled ${index}`,
        value: `disabled-${index}`
      }))
    : [];
  const data = [
    { label: 'Number zero', value: 0 },
    ...fillers,
    { label: 'Disabled neighbor', value: 'disabled' },
    { label: 'String zero', value: '0' },
    { label: 'Last control', value: 'last' }
  ];
  const onChange = vi.fn();
  const Component = testCase.Component as React.ElementType;
  const view = render(
    <Component
      defaultOpen
      id="typed-picker"
      data={customKeys ? data.map(item => ({ code: item.value, title: item.label })) : data}
      valueKey={customKeys ? 'code' : 'value'}
      labelKey={customKeys ? 'title' : 'label'}
      disabledItemValues={[
        'disabled',
        ...fillers.map(item => item.value),
        ...(disabledNumber ? [0] : [])
      ]}
      virtualized={virtualized}
      listboxMaxHeight={180}
      listProps={{ itemSize: 36, overscanCount: 0 }}
      onChange={onChange}
    />
  );
  return { ...view, onChange };
}

export function typedMenu() {
  return within(screen.getByTestId('picker-popup'));
}

export function expectTypedValue(testCase: TypedPickerCase, value: string | number) {
  return testCase.multiple ? [value] : value;
}
