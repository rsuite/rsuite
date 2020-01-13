import * as React from 'react';
import { List, Tag, Button, Icon, FlexboxGrid } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="List"
        examples={['default', 'size', 'bordered', 'hover', 'sortable', 'collection', 'custom']}
        dependencies={{ List, Tag, Button, Icon, FlexboxGrid }}
      />
    </Frame>
  );
}
