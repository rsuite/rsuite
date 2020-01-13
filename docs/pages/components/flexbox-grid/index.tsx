import * as React from 'react';
import { FlexboxGrid, Button, Icon, Divider, Col } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="FlexboxGrid"
        examples={['basic', 'justify', 'align', 'order', 'responsive']}
        dependencies={{ FlexboxGrid, Button, Icon, Divider, Col }}
      />
    </Frame>
  );
}
