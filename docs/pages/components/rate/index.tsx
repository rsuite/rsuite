import * as React from 'react';
import { Badge, Button, Toggle, Rate, Icon } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={[
        'basic',
        'half-select',
        'disabled',
        'character',
        'vertical',
        'size',
        'color',
        'custom-character'
      ]}
      dependencies={{ Badge, Button, Toggle, Rate, Icon }}
    />
  );
}
