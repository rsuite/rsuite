import * as React from 'react';
import { Progress, Button, ButtonGroup } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Progress"
        examples={['line', 'circle', 'dynamic']}
        dependencies={{ Progress, Button, ButtonGroup }}
      />
    </Frame>
  );
}
