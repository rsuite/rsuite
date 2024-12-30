import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import SearchIcon from '@rsuite/icons/Search';
import MenuIcon from '@rsuite/icons/Menu';
import {
  Navbar,
  Nav,
  Button,
  Input,
  InputGroup,
  IconButton,
  Avatar,
  HStack,
  Text,
  Drawer,
  useMediaQuery
} from 'rsuite';
import { IoLogoReact, IoLanguage, IoNotifications } from 'react-icons/io5';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Navbar', 'Nav']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Navbar,
        Nav,
        Button,
        HStack,
        Text,
        Input,
        InputGroup,
        IconButton,
        Avatar,
        Drawer,
        SearchIcon,
        MenuIcon,
        useMediaQuery,
        IoLogoReact,
        IoLanguage,
        IoNotifications
      }}
    />
  );
}
