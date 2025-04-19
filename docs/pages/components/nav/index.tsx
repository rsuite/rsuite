import React from 'react';
import { Nav, Button, Row, Col, Slider, VStack, Box, SelectPicker } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import ResponsiveNav from '@rsuite/responsive-nav';
import Link from 'next/link';
import {
  MdSettings,
  MdHelp,
  MdNotifications,
  MdExitToApp,
  MdHome,
  MdMessage
} from 'react-icons/md';

const sandboxDependencies = {
  '@rsuite/responsive-nav': 'latest'
};

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Nav']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Nav,
        Button,
        Row,
        Col,
        Slider,
        VStack,
        Box,
        SelectPicker,
        ResponsiveNav,
        Link,
        MdHome,
        MdMessage,
        MdSettings,
        MdHelp,
        MdNotifications,
        MdExitToApp
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
