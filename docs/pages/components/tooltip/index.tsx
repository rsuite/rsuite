import React from 'react';
import { Whisper, Tooltip, ButtonToolbar, Button } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ PreventOverflowContainer, Whisper, Tooltip, ButtonToolbar, Button }}
    />
  );
}
