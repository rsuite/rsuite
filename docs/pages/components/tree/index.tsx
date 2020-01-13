import * as React from 'react';
import { Tree } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import { getCity } from '@/resources/data';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Tree"
        examples={['basic', 'virtualized']}
        getDependencies={getCity}
        dependencies={{ Tree }}
      />
    </Frame>
  );
}
