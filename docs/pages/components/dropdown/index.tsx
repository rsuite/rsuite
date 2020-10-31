import React from 'react';
import {
  Dropdown,
  Button,
  Icon,
  ButtonToolbar,
  IconButton,
  ButtonGroup,
  Popover,
  Whisper
} from 'rsuite';
import Link from 'next/link';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Dropdown,
        Button,
        Icon,
        ButtonToolbar,
        IconButton,
        ButtonGroup,
        Popover,
        Whisper,
        Link
      }}
    />
  );
}
