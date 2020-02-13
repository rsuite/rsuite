import * as React from 'react';
import { Notification, Button, ButtonToolbar } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'status', 'placement', 'custom', 'close', 'duration']}
      dependencies={{ Notification, Button, ButtonToolbar }}
    />
  );
}
