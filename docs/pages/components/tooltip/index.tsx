import * as React from 'react';
import { Whisper, Tooltip, ButtonToolbar, Button } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Tooltip"
        examples={['basic', 'placement', 'trigger', 'container']}
        dependencies={{ PreventOverflowContainer, Whisper, Tooltip, ButtonToolbar, Button }}
      />
    </Frame>
  );
}
