import React from 'react';
import { Sidenav, Nav, Button, Toggle, Dropdown } from 'rsuite';
import DefaultPage from '@/components/Page';
import Dashboard from '@rsuite/icons/legacy/Dashboard';
import Group from '@rsuite/icons/legacy/Group';
import Magic from '@rsuite/icons/legacy/Magic';
import GearCircle from '@rsuite/icons/legacy/GearCircle';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Sidenav,
        Nav,
        Button,
        Toggle,
        Dropdown,
        Dashboard,
        Group,
        Magic,
        GearCircle
      }}
    />
  );
}
