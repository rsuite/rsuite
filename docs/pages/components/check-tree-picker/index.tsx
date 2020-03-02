import * as React from 'react';
import { CheckTreePicker, Button, Icon, Toggle } from 'rsuite';

import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('city-simplified');
  return (
    <DefaultPage
      examples={[
        'basic',
        'appearance',
        'size',
        'cascade',
        'placement',
        'disabled',
        'custom',
        'async',
        'virtualized'
      ]}
      dependencies={{ data, CheckTreePicker, Button, Icon, Toggle }}
    />
  );
}
