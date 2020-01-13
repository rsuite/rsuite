import * as React from 'react';
import { ButtonToolbar, Button, IconButton, Drawer, Icon, RadioGroup, Radio } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Drawer"
        examples={['basic', 'backdrop', 'placement', 'size', 'full']}
        dependencies={{ ButtonToolbar, Button, IconButton, Drawer, Icon, RadioGroup, Radio }}
      />
    </Frame>
  );
}
