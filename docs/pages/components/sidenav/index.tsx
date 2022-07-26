import React from 'react';
import { Sidenav, Nav, Button, Toggle } from 'rsuite';
import DefaultPage from '@/components/Page';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Sidenav,
        Nav,
        Button,
        Toggle,
        DashboardIcon,
        GroupIcon,
        MagicIcon,
        GearCircleIcon
      }}
    />
  );
}
