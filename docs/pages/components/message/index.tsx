import * as React from 'react';
import { Message, Button, ButtonToolbar } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'types', 'description', 'icons', 'close', 'full']}
      dependencies={{ Message, Button, ButtonToolbar }}
    />
  );
}
