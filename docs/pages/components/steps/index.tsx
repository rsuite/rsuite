import * as React from 'react';
import { Steps, Icon, ButtonGroup, Button, Panel } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'title', 'description', 'vertical', 'status', 'size', 'icon', 'dynamic']}
      dependencies={{ Steps, Icon, ButtonGroup, Button, Panel }}
    />
  );
}
