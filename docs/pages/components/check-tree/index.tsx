import * as React from 'react';
import { CheckTree, Toggle, Icon } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import { getCity } from '@/resources/data';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="CheckTree"
        examples={['basic', 'cascade', 'custom', 'virtualized']}
        getDependencies={getCity}
        dependencies={{ CheckTree, Toggle, Icon }}
      />
    </Frame>
  );
}
