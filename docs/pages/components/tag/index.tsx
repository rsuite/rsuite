import * as React from 'react';
import { Tag, TagGroup, Icon, IconButton, Input } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Tag"
        examples={['basic', 'color', 'dynamic']}
        dependencies={{ Tag, TagGroup, Icon, IconButton, Input }}
      />
    </Frame>
  );
}
