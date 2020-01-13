import * as React from 'react';
import { Pagination, Button, Icon, Toggle, Divider } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Pagination"
        examples={['basic', 'size', 'disabled', 'advanced']}
        dependencies={{ Pagination, Button, Icon, Toggle, Divider }}
      />
    </Frame>
  );
}
