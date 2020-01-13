import * as React from 'react';
import { Message, Button, ButtonToolbar } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Message"
        examples={['basic', 'types', 'description', 'icons', 'close', 'full']}
        dependencies={{ Message, Button, ButtonToolbar }}
      />
    </Frame>
  );
}
