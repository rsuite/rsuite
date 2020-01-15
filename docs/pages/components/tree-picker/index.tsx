import * as React from 'react';
import { TreePicker, Button, Icon } from 'rsuite';
import DefaultPage from '@/components/Page';
import { getCity } from '@/resources/data';

export default function Page() {
  return (
    <DefaultPage
      examples={[
        'basic',
        'appearance',
        'size',
        'placement',
        'disabled',
        'searchable',
        'custom',
        'async',
        'virtualized'
      ]}
      dependencies={{ TreePicker, Button, Icon }}
      getDependencies={getCity}
    />
  );
}
