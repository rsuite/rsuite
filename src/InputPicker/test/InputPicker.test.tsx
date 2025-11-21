import React from 'react';
import InputPicker from '../InputPicker';
import type { PickerHandle } from '@/internals/Picker';

<InputPicker caretAs={() => <div />} data={[]} />;

// Check ref type
const ref = React.useRef<PickerHandle>(null);
<InputPicker data={[]} ref={ref} />;
ref.current?.open?.();
interface Item<T> {
  label?: React.ReactNode;
  value?: T;
}

// Check renderValue
<InputPicker
  data={[]}
  renderValue={(value: string, item: Item<string>) => {
    console.log(value, item);
    return item.label;
  }}
/>;
