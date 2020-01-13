import * as React from 'react';
import { Placeholder } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Placeholder"
        examples={['paragraph', 'grid', 'graph']}
        dependencies={{ Placeholder }}
      />
    </Frame>
  );
}
