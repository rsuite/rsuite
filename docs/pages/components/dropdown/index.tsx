import * as React from 'react';
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
      examples={[
        'basic',
        'trigger',
        'active',
        'disabled',
        'size',
        'no-caret',
        'icons',
        'divider',
        'placement',
        'submenu',
        'custom',
        'buttons',
        'menu-items',
        'with-popover',
        'with-router'
      ]}
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
