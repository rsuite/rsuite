import React from 'react';
import { ButtonToolbar, Button, Whisper, Popover, Dropdown, Loader, Toggle } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        ButtonToolbar,
        Button,
        Whisper,
        Popover,
        Dropdown,
        Loader,
        Toggle
      }}
    />
  );
}
