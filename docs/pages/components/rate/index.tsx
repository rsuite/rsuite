import * as React from 'react';
import { Badge, Button, Toggle, Icon } from 'rsuite';
import Rate from '../../../../src/Rate';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={[
        'basic',
        'size',
        'color',
        'half-select',
        'disabled',
        'readonly',
        'vertical',
        'character',
        'custom-character'
      ]}
      dependencies={{ Badge, Button, Toggle, Rate, Icon }}
    />
  );
}
