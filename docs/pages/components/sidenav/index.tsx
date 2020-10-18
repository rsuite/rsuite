import * as React from 'react';
import { Sidenav, Nav, Button, Icon, Toggle, Dropdown } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Sidenav, Nav, Button, Icon, Toggle, Dropdown }} />;
}
