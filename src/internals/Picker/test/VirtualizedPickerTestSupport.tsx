import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';
import CheckPicker from '../../../CheckPicker';
import InputPicker from '../../../InputPicker';
import TagPicker from '../../../TagPicker';
import type { PickerHandle } from '../types';
import '../../../CheckPicker/styles/index.scss';
import '../../../InputPicker/styles/index.scss';
import '../../../TagPicker/styles/index.scss';

export const pickerCases = [
  { name: 'CheckPicker', Component: CheckPicker, multiple: true, editable: false },
  { name: 'InputPicker', Component: InputPicker, multiple: false, editable: true },
  { name: 'TagPicker', Component: TagPicker, multiple: true, editable: true }
];

export type PickerCase = (typeof pickerCases)[number];

export const data = Array.from({ length: 1000 }, (_, index) => ({
  label: `Option ${index + 1}`,
  value: index + 1
}));

export function pickerElement(testCase: PickerCase, props: Record<string, any> = {}) {
  const Component = testCase.Component as React.ElementType;
  return (
    <Component
      defaultOpen
      virtualized
      searchable={testCase.editable}
      data={data}
      listboxMaxHeight={180}
      listProps={{ itemSize: 36, overscanCount: 0 }}
      {...props}
    />
  );
}

export function mountPicker(testCase: PickerCase, props: Record<string, any> = {}) {
  const ref = React.createRef<PickerHandle>();
  const onChange = vi.fn();
  const onSelect = vi.fn();
  const view = render(pickerElement(testCase, { ref, onChange, onSelect, ...props }));
  if (testCase.editable) act(() => initialTarget().focus());
  return { ref, onChange, onSelect, ...view };
}

export function menu() {
  return within(screen.getByTestId('picker-popup'));
}

export function initialTarget() {
  return screen.getByRole('combobox');
}

export function selectedValue(testCase: PickerCase, value: number) {
  return testCase.multiple ? [value] : value;
}
