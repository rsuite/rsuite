import React from 'react';
import MultiCascader from '../';

interface Item<T> {
  label?: React.ReactNode;
  value?: T;
}

<MultiCascader
  data={[]}
  renderValue={(value: string[], selectedPaths: Item<string>[]) => {
    console.log(value, selectedPaths);
    return selectedPaths.map(item => item.label).join(' / ');
  }}
/>;
