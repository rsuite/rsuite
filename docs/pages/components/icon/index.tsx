import * as React from 'react';
import { Icon, IconStack, Button, IconButton } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Icon"
        examples={['basic', 'spin', 'rotate', 'size', 'stack', 'custom', 'custom-svg']}
        dependencies={{
          Icon,
          IconStack,
          Button,
          IconButton,
          // @todo Fixed it
          SvgIcons: {}
        }}
      />
    </Frame>
  );
}
