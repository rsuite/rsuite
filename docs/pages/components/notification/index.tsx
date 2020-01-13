import * as React from 'react';
import { Notification, Button, ButtonToolbar } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Notification"
        examples={['basic', 'status', 'placement', 'custom', 'close', 'duration']}
        dependencies={{ Notification, Button, ButtonToolbar }}
      />
    </Frame>
  );
}
