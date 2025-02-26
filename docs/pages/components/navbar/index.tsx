import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';
import SearchIcon from '@rsuite/icons/Search';
import MenuIcon from '@rsuite/icons/Menu';
import PageIcon from '@rsuite/icons/Page';
import ImageIcon from '@rsuite/icons/Image';
import FolderIcon from '@rsuite/icons/Folder';
import StarIcon from '@rsuite/icons/Star';
import TrashIcon from '@rsuite/icons/Trash';
import {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Menu,
  Navbar,
  Nav,
  Button,
  Badge,
  HStack,
  VStack,
  Text,
  Input,
  InputGroup,
  IconButton,
  Avatar,
  Drawer,
  Grid,
  Row,
  Col,
  Panel,
  Card,
  Container,
  Header,
  Sidenav,
  Sidebar,
  Content,
  Footer,
  Placeholder,
  useMediaQuery
} from 'rsuite';

import {
  IoLogoReact,
  IoLanguage,
  IoBarChartOutline,
  IoNotifications,
  IoDocumentTextOutline,
  IoGridOutline,
  IoLayersOutline,
  IoTerminalOutline,
  IoBrushOutline,
  IoColorPaletteOutline,
  IoShapesOutline,
  IoBookOutline,
  IoChatbubblesOutline,
  IoCodeSlashOutline
} from 'react-icons/io5';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Navbar', 'Nav']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="navbar" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Navbar,
        Nav,
        Button,
        Badge,
        HStack,
        VStack,
        Text,
        Input,
        InputGroup,
        IconButton,
        Avatar,
        Drawer,
        SearchIcon,
        Grid,
        Row,
        Col,
        Panel,
        Card,
        Menu,
        MenuIcon,
        PageIcon,
        ImageIcon,
        FolderIcon,
        StarIcon,
        TrashIcon,
        Container,
        Header,
        Content,
        Footer,
        Sidebar,
        Sidenav,
        Placeholder,
        useMediaQuery,
        IoLogoReact,
        IoLanguage,
        IoNotifications,
        IoBarChartOutline,
        IoDocumentTextOutline,
        IoGridOutline,
        IoLayersOutline,
        IoTerminalOutline,
        IoBrushOutline,
        IoColorPaletteOutline,
        IoShapesOutline,
        IoBookOutline,
        IoChatbubblesOutline,
        IoCodeSlashOutline
      }}
    />
  );
}
