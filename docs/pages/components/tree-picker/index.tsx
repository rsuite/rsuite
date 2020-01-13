import * as React from 'react';
import { TreePicker, Button, Icon } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import { getCity } from '@/resources/data';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="TreePicker"
        examples={[
          'basic',
          'appearance',
          'size',
          'placement',
          'disabled',
          'searchable',
          'custom',
          'async',
          'virtualized'
        ]}
        dependencies={{ TreePicker, Button, Icon }}
        getDependencies={getCity}
      />
    </Frame>
  );
}
