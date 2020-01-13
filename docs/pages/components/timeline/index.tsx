import * as React from 'react';
import { Timeline, Icon, Grid, Row, Col } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Timeline"
        examples={['basic', 'align', 'time', 'custom']}
        dependencies={{ Timeline, Icon, Grid, Row, Col }}
      />
    </Frame>
  );
}
