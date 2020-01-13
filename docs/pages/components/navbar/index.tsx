import * as React from 'react';
import { Navbar, Nav, Button, Icon, Dropdown } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Navbar"
        examples={['basic', 'appearance']}
        dependencies={{ Navbar, Nav, Button, Icon, Dropdown }}
      />
    </Frame>
  );
}
