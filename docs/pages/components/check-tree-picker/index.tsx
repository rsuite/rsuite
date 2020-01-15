import * as React from 'react';
import { CheckTreePicker, Button, Icon, Toggle } from 'rsuite';
import { getCity } from '@/resources/data';
import DefaultPage from '@/components/Page';

export default function Page() {
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
      dependencies={{ CheckTreePicker, Button, Icon, Toggle }}
      getDependencies={getCity}
    />
  );
}
