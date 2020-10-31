import React from 'react';
import { Steps, Icon, ButtonGroup, Button, Panel } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Steps, Icon, ButtonGroup, Button, Panel }} />;
}
