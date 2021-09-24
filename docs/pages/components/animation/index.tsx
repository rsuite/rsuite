import React from 'react';
import { Animation, Button, ButtonToolbar } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Button, ButtonToolbar, Animation }} />;
}
