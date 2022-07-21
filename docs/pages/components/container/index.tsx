import React from 'react';
import {
  Container,
  Header,
  Footer,
  Sidebar,
  Content,
  Button,
  Divider,
  Sidenav,
  Nav,
  IconButton,
  Toggle,
  FlexboxGrid,
  Panel,
  Form,
  ButtonToolbar,
  Navbar
} from 'rsuite';

import DefaultPage from '@/components/Page';

import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';

import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';

import files from './files';

export default function Page() {
  return (
    <DefaultPage
      sandboxFiles={files}
      dependencies={{
        Divider,
        IconButton,
        Button,
        Container,
        Header,
        Footer,
        Sidebar,
        Content,
        Sidenav,
        Nav,
        Toggle,
        FlexboxGrid,
        Panel,
        Form,
        ButtonToolbar,
        Navbar,
        HomeIcon,
        CogIcon,
        AngleLeftIcon,
        AngleRightIcon,
        DashboardIcon,
        GroupIcon,
        MagicIcon,
        GearCircleIcon
      }}
    />
  );
}
