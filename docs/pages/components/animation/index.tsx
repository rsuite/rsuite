import * as React from 'react';
import { Animation, Button, ButtonToolbar } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['fade', 'collapse', 'bounce', 'slide', 'transition']}
      dependencies={{ Button, ButtonToolbar, ...Animation }}
    />
  );
}
