import React from 'react';
import SelectPicker from '../SelectPicker';
import { expectType } from 'ts-expect';
import type { PickerHandle } from '@/internals/Picker';

// Infer value and onChange types from data
const numberValuedData = [{ label: 'One', value: 1 }];

<SelectPicker data={numberValuedData} value={1} />;
// @ts-expect-error should not accept string value
<SelectPicker data={numberValuedData} value="1" />;
<SelectPicker
  data={numberValuedData}
  onChange={newValue => {
    expectType<number | null>(newValue);
  }}
/>;

const stringValuedData = [{ label: 'One', value: 'One' }];

<SelectPicker data={stringValuedData} value="1" />;
// @ts-expect-error should not accept number value
<SelectPicker data={stringValuedData} value={1} />;
<SelectPicker
  data={stringValuedData}
  onChange={newValue => {
    expectType<string | null>(newValue);
  }}
/>;

const pickerRef = React.createRef<PickerHandle>();

<SelectPicker ref={pickerRef} data={[]} />;

// With a label
<SelectPicker label="User" data={[]} />;

type SortDirection = 'asc' | 'desc';
<SelectPicker<SortDirection>
  data={[
    {
      label: 'Ascending',
      value: 'asc'
    },
    {
      label: 'Descending',
      value: 'desc'
    }
  ]}
  value="asc"
  onChange={value => {
    expectType<SortDirection | null>(value);
  }}
/>;

<SelectPicker caretAs={() => <div />} data={[]} />;

// Override the default value of listProps.
<SelectPicker data={[]} virtualized listProps={{ rowHeight: 70 }} />;

// Check ref type
const ref = React.useRef<PickerHandle>();
<SelectPicker data={[]} ref={ref} />;
ref.current?.open?.();
