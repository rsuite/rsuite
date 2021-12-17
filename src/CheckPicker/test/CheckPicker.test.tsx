import React from 'react';
import { expectType } from 'ts-expect';
import CheckPicker from '../CheckPicker';

// Infer value and onChange types from data
const numberValuedData = [{ label: 'One', value: 1 }];

<CheckPicker data={numberValuedData} value={[1]} />;
// @ts-expect-error should not accept single value
<CheckPicker data={numberValuedData} value={1} />;
// @ts-expect-error should not accept string value
<CheckPicker data={numberValuedData} value={['1']} />;
<CheckPicker
  data={numberValuedData}
  onChange={newValue => {
    expectType<number[]>(newValue);
  }}
/>;

const stringValuedData = [{ label: 'One', value: 'One' }];

<CheckPicker data={stringValuedData} value={['1']} />;
// @ts-expect-error should not accept single value
<CheckPicker data={numberValuedData} value="1" />;
// @ts-expect-error should not accept number value
<CheckPicker data={stringValuedData} value={[1]} />;
<CheckPicker
  data={stringValuedData}
  onChange={newValue => {
    expectType<string[]>(newValue);
  }}
/>;
