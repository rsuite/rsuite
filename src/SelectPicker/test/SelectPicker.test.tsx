import React from 'react';
import { expectType } from 'ts-expect';
import SelectPicker from '../SelectPicker';

// Infer value and onChange types from data
const numberValuedData = [{ label: 'One', value: 1 }];

<SelectPicker data={numberValuedData} value={1} />;
// @ts-expect-error should not accept string value
<SelectPicker data={numberValuedData} value="1" />;
<SelectPicker
  data={numberValuedData}
  onChange={newValue => {
    expectType<number>(newValue);
  }}
/>;

const stringValuedData = [{ label: 'One', value: 'One' }];

<SelectPicker data={stringValuedData} value="1" />;
// @ts-expect-error should not accept number value
<SelectPicker data={stringValuedData} value={1} />;
<SelectPicker
  data={stringValuedData}
  onChange={newValue => {
    expectType<string>(newValue);
  }}
/>;
