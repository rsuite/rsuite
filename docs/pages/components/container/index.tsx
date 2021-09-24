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
  Dropdown,
  FlexboxGrid,
  Panel,
  Form,
  ButtonToolbar,
  Navbar
} from 'rsuite';

import DefaultPage from '@/components/Page';
import Logo from '@/components/Logo';
import Home from '@rsuite/icons/legacy/Home';
import Cog from '@rsuite/icons/legacy/Cog';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import LogoAnalytics from '@rsuite/icons/legacy/LogoAnalytics';
import Dashboard from '@rsuite/icons/Dashboard';
import Group from '@rsuite/icons/legacy/Group';
import Magic from '@rsuite/icons/legacy/Magic';
import GearCircle from '@rsuite/icons/legacy/GearCircle';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Logo,
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
        Dropdown,
        FlexboxGrid,
        Panel,
        Form,
        ButtonToolbar,
        Navbar,
        Home,
        Cog,
        AngleLeft,
        AngleRight,
        LogoAnalytics,
        Dashboard,
        Group,
        Magic,
        GearCircle
      }}
    />
  );
}
