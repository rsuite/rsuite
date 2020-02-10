import * as React from 'react';
import { ButtonToolbar, Button, DOMHelper } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={[
        'class-helper',
        'style-helper',
        'event-helper',
        'scroll-helper',
        'query',
        'dom-mouse-move-tracker'
      ]}
      dependencies={{ ButtonToolbar, Button, ...DOMHelper }}
    />
  );
}
