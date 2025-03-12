import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import FakeBrowser from '@/components/FakeBrowser';
import Icon from '@rsuite/icons/Icon';
import Simulation from '@/components/Simulation';
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
  Panel,
  Form,
  Navbar,
  Stack,
  VStack,
  HStack,
  Text,
  Input,
  Avatar,
  InputGroup,
  Breadcrumb
} from 'rsuite';
import { FaGithub, FaRegEye, FaRegEyeSlash, FaReact } from 'react-icons/fa';
import {
  MdDashboard,
  MdGroup,
  MdSettings,
  MdOutlineStackedBarChart,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight
} from 'react-icons/md';

import files from './files';

const inDocsComponents = {
  'import-guide': () => (
    <ImportGuide components={['Container', 'Header', 'Content', 'Footer', 'Sidebar']} />
  ),
  'example-horizontal': () => (
    <Simulation example="horizontal" componentName="container" defaultDevice="desktop" />
  ),
  'example-vertical': () => (
    <Simulation example="vertical" componentName="container" defaultDevice="desktop" />
  ),
  'example-center': () => (
    <Simulation example="center" componentName="container" defaultDevice="desktop" />
  ),
  'example-right-sidebar': () => (
    <Simulation example="right-sidebar" componentName="container" defaultDevice="desktop" />
  )
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      sandboxFiles={files}
      dependencies={{
        FakeBrowser,
        Avatar,
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
        Panel,
        Form,
        Navbar,
        Icon,
        Stack,
        VStack,
        HStack,
        InputGroup,
        Input,
        Text,
        Breadcrumb,
        FaReact,
        FaGithub,
        FaRegEye,
        FaRegEyeSlash,
        MdDashboard,
        MdGroup,
        MdSettings,
        MdOutlineStackedBarChart,
        MdKeyboardArrowLeft,
        MdOutlineKeyboardArrowRight
      }}
    />
  );
}
