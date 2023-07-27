import React from 'react';
import { expectType } from 'ts-expect';
import { PickerHandle } from '../../Picker';
import SelectPicker from '../SelectPicker';

// Infer value and onChange types from data
const numberValuedData = [{ label: 'One', value: 1 }];

<SelectPicker data={numberValuedData} value={1} />;
<SelectPicker data={numberValuedData} value="1" />;
<SelectPicker
  data={numberValuedData}
  value={1}
  onChange={newValue => {
    expectType<{ label: 'One'; value: 1 } | null>(newValue);
  }}
/>;

const stringValuedData = [{ label: 'One', value: 'One' }];

<SelectPicker data={stringValuedData} value="1" />;
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
<SelectPicker
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
