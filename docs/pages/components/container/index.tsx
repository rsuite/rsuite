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
  Panel,
  Form,
  Navbar,
  Stack,
  VStack,
  HStack,
  Text,
  Input,
  InputGroup,
  Breadcrumb
} from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import FakeBrowser from '@/components/FakeBrowser';
import { Icon } from '@rsuite/icons';
import { FaGithub, FaRegEye, FaRegEyeSlash, FaReact, FaCog } from 'react-icons/fa';
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
  )
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      sandboxFiles={files}
      dependencies={{
        FakeBrowser,
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
        FaCog,
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
