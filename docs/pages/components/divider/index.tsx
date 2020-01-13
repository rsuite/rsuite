import * as React from 'react';
import { Divider,Button,ButtonGroup } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Divider"
        examples={['basic', 'with-text', 'vertical']}
        dependencies={{Divider,Button,ButtonGroup}}
      />
    </Frame>
  );
}
