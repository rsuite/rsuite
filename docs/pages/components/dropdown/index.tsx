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

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Dropdown"
        examples={[
          'basic',
          'trigger',
          'active',
          'disabled',
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
    </Frame>
  );
}
