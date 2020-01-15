import * as React from 'react';
import { ButtonToolbar, Button, Whisper, Popover } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'placement', 'trigger', 'container']}
      dependencies={{ PreventOverflowContainer, ButtonToolbar, Button, Whisper, Popover }}
    />
  );
}
