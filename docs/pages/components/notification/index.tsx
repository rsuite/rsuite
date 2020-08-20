import React from 'react';
import { Notification, Button, ButtonToolbar, SelectPicker, toaster } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  //   , 'custom', 'close', 'duration'
  return (
    <DefaultPage
      examples={['basic', 'type', 'with-toaster']}
      dependencies={{ Notification, Button, ButtonToolbar, SelectPicker, toaster }}
    />
  );
}
