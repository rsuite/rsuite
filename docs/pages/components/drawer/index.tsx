import * as React from 'react';
import { ButtonToolbar, Button, IconButton, Drawer, Icon, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'backdrop', 'placement', 'size', 'full']}
      dependencies={{ ButtonToolbar, Button, IconButton, Drawer, Icon, RadioGroup, Radio }}
    />
  );
}
