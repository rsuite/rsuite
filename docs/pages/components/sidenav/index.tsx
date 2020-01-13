import * as React from 'react';
import { Sidenav, Nav, Button, Icon, Toggle, Dropdown } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Sidenav"
        examples={['basic', 'appearance', 'toggle', 'divider-panel']}
        dependencies={{ Sidenav, Nav, Button, Icon, Toggle, Dropdown }}
      />
    </Frame>
  );
}
