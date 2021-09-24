import React from 'react';
import { Message, Button, ButtonToolbar, SelectPicker, toaster } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'types', 'icons', 'close', 'full', 'with-toaster']}
      dependencies={{ Message, Button, ButtonToolbar, SelectPicker, toaster }}
    />
  );
}
