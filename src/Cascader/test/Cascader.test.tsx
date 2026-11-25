import React from 'react';
import { expectType } from 'ts-expect';
import { PickerHandle } from '@/internals/Picker';
import Cascader from '../Cascader';

// Infer value and onChange types from data
const numberValuedData = [{ label: 'One', value: 1 }];

<Cascader data={numberValuedData} value={1} />;
// @ts-expect-error should not accept string value
<Cascader data={numberValuedData} value="1" />;
<Cascader
  data={numberValuedData}
  onChange={newValue => {
    expectType<number | null>(newValue);
  }}
/>;

const stringValuedData = [{ label: 'One', value: 'One' }];

<Cascader data={stringValuedData} value="1" />;
// @ts-expect-error should not accept number value
<Cascader data={stringValuedData} value={1} />;
<Cascader
  data={stringValuedData}
  onChange={newValue => {
    expectType<string | null>(newValue);
  }}
/>;

// Check ref type
const ref = React.useRef<PickerHandle>(null);
<Cascader data={[]} ref={ref} />;
ref.current?.open?.();
const pickerRef = React.createRef<PickerHandle>();

<Cascader ref={pickerRef} data={[]} />;

interface Item<T> {
  label?: React.ReactNode;
  value?: T;
}

// Check renderValue
<Cascader
  data={[]}
  renderValue={(value: string, selectedPaths: Item<string>[]) => {
    console.log(value, selectedPaths);
    return selectedPaths.map(item => item.label).join(' / ');
  }}
/>;
