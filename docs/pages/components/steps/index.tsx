import * as React from 'react';
import { Steps, Icon, ButtonGroup, Button } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Steps"
        examples={[
          'basic',
          'title',
          'description',
          'vertical',
          'status',
          'size',
          'icon',
          'dynamic'
        ]}
        dependencies={{ Steps, Icon, ButtonGroup, Button }}
      />
    </Frame>
  );
}
