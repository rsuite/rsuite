import React from 'react';
import { ButtonToolbar, Button, Whisper } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ ButtonToolbar, Button, Whisper }} />;
}
