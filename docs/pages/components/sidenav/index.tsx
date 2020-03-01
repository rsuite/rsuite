import * as React from 'react';
import { Sidenav, Nav, Button, Icon, Toggle, Dropdown } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'appearance', 'toggle', 'divider-panel']}
      dependencies={{ Sidenav, Nav, Button, Icon, Toggle, Dropdown }}
    />
  );
}
