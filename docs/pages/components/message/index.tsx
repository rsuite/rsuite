import React from 'react';
import { Message, Button, ButtonToolbar, SelectPicker, toaster } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Message, Button, ButtonToolbar, SelectPicker, toaster }} />;
}
