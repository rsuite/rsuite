import * as React from 'react';

import { Button, IconButton, ButtonGroup, ButtonToolbar, Panel, Icon } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="button"
        examples={[
          'basic',
          'appearance',
          'size',
          'color',
          'custom',
          'icon-button',
          'block',
          'disabled',
          'active',
          'loading',
          'group-basic',
          'vertical',
          'toolbar',
          'justified'
        ]}
        dependencies={{
          Button,
          IconButton,
          ButtonGroup,
          ButtonToolbar,
          Icon,
          Panel
        }}
      />
    </Frame>
  );
}
