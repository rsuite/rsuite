import React from 'react';
import InputPicker from '../InputPicker';

<InputPicker caretAs={() => <div />} data={[]} />;

interface Item<T> {
  label?: React.ReactNode;
  value?: T;
}

<InputPicker
  data={[]}
  renderValue={(value: string, item: Item<string>) => {
    console.log(value, item);
    return item.label;
  }}
/>;
