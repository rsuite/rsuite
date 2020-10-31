import React from 'react';
import { ButtonToolbar, Button, Whisper, Popover, Dropdown } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ PreventOverflowContainer, ButtonToolbar, Button, Whisper, Popover, Dropdown }}
    />
  );
}
