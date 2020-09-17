import * as React from 'react';
import { Button, Toggle, Icon } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'size', 'inner', 'disabled']}
      dependencies={{ Button, Toggle, Icon }}
    />
  );
}
