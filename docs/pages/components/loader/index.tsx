import * as React from 'react';
import { Loader } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Loader"
        examples={['basic', 'content', 'size', 'speed', 'center', 'backdrop', 'inverse']}
        dependencies={{ Loader }}
      />
    </Frame>
  );
}
