import * as React from 'react';
import { ButtonToolbar, Button, IconButton, Drawer, Icon, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ ButtonToolbar, Button, IconButton, Drawer, Icon, RadioGroup, Radio }}
    />
  );
}
