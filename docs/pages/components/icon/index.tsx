import * as React from 'react';
import { Icon, IconStack, Button, IconButton } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import { IconLogo } from '@/components/SvgIcons';
import * as SvgIcons from '@/components/SvgIcons';

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
          SvgIcons,
          IconLogo
        }}
      />
    </Frame>
  );
}
