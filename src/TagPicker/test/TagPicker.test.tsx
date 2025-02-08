import React from 'react';
import TagPicker from '../';

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
