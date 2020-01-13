import * as React from 'react';
import { Badge,Button } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Badge"
        examples={['basic', 'content', 'independent']}
        dependencies={{Badge,Button}}
      />
    </Frame>
  );
}
