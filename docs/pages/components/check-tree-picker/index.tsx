import * as React from 'react';
import { CheckTreePicker, Button, Icon, Toggle } from 'rsuite';
import { getCity } from '@/resources/data';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="CheckTreePicker"
        examples={[
          'basic',
          'appearance',
          'size',
          'cascade',
          'placement',
          'disabled',
          'custom',
          'async',
          'virtualized'
        ]}
        dependencies={{ CheckTreePicker, Button, Icon, Toggle }}
        getDependencies={getCity}
      />
    </Frame>
  );
}
