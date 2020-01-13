import * as React from 'react';
import { Button, Toggle, Icon } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Toggle"
        examples={['basic', 'size', 'inner', 'disabled']}
        dependencies={{ Button, Toggle, Icon }}
      />
    </Frame>
  );
}
