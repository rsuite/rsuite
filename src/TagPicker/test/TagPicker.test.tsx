import React from 'react';
import TagPicker from '../TagPicker';
import type { PickerHandle } from '@/internals/Picker';

// Check ref type
const ref = React.useRef<PickerHandle>(null);
<TagPicker data={[]} ref={ref} />;
ref.current?.open?.();

interface Item<T> {
  label?: React.ReactNode;
  value?: T;
}

<TagPicker
  data={[]}
  renderValue={(value: string[], items: Item<string>[]) => {
    console.log(value, items);
    return value.map(v => items.find(item => item.value === v)?.label).join(', ');
  }}
/>;
