import * as React from 'react';
import { Grid, Button, Icon, Row, Col } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Grid"
        examples={['basic', 'responsive', 'gutter', 'offset', 'pull-push', 'hidden', 'nested']}
        dependencies={{ Grid, Button, Icon, Row, Col }}
      />
    </Frame>
  );
}
