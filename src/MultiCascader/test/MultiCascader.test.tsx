import React from 'react';
import MultiCascader from '../MultiCascader';
import type { PickerHandle } from '@/internals/Picker';

// Check ref type
const ref = React.useRef<PickerHandle>(null);
<MultiCascader data={[]} ref={ref} />;
ref.current?.open?.();

interface Item<T> {
  label?: React.ReactNode;
  value?: T;
}

// Check renderValue
<MultiCascader
  data={[]}
  renderValue={(value: string[], selectedPaths: Item<string>[]) => {
    console.log(value, selectedPaths);
    return selectedPaths.map(item => item.label).join(' / ');
  }}
/>;
