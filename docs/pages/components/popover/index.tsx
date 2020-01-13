import * as React from 'react';
import { ButtonToolbar, Button, Whisper, Popover } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Popover"
        examples={['basic', 'placement', 'trigger', 'container']}
        dependencies={{ PreventOverflowContainer, ButtonToolbar, Button, Whisper, Popover }}
      />
    </Frame>
  );
}
