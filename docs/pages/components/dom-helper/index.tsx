import * as React from 'react';
import { ButtonToolbar, Button, DOMHelper } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="DomHelper"
        examples={[
          'class-helper',
          'style-helper',
          'event-helper',
          'scroll-helper',
          'query',
          'dom-mouse-move-tracker'
        ]}
        dependencies={{ ButtonToolbar, Button, ...DOMHelper }}
      />
    </Frame>
  );
}
