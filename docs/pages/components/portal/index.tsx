import * as React from 'react';
import { Portal, Button } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent id="Portal" examples={['basic']} dependencies={{ Portal, Button }} />
    </Frame>
  );
}
