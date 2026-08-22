import React from 'react';
import { Button, ButtonToolbar, Panel, Text } from 'rsuite';
import DefaultPage from '@/components/layout/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Button, ButtonToolbar, Panel, Text }} />;
}
