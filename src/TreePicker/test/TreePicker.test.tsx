import React from 'react';
import TreePicker from '../TreePicker';

<TreePicker caretAs={() => <div />} data={[]} />;

<TreePicker
  data={[]}
  listProps={{
    itemSize: 30,
    onItemsRendered: () => {
      console.log('onItemsRendered');
    },
    onScroll: () => {
      console.log('onScroll');
    }
  }}
/>;
