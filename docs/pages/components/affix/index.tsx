import * as React from 'react';
import { Affix, Button, ButtonToolbar } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'top', 'container']}
      dependencies={{ ButtonToolbar, Button, Affix }}
    />
  );
}
