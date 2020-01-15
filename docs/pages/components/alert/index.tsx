import * as React from 'react';
import { Alert, Button, ButtonToolbar } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'duration', 'close']}
      dependencies={{ ButtonToolbar, Button, Alert }}
    />
  );
}
