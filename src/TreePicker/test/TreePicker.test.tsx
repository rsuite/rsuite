import React from 'react';
import TreePicker from '../TreePicker';
import type { PickerHandle } from '@/internals/Picker';

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

// Check ref type
const ref = React.useRef<PickerHandle>();
<TreePicker data={[]} ref={ref} />;
ref.current?.open?.();
