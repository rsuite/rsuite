import * as React from 'react';
import { AutoComplete, InputGroup, Icon } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="AutoComplete"
        examples={['basic', 'email', 'render-item', 'disabled', 'input-group', 'controlled']}
        dependencies={{ AutoComplete, InputGroup, Icon }}
      />
    </Frame>
  );
}
