/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import DashboardIcon from '@rsuite/icons/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import SettingIcon from '@rsuite/icons/Setting';
import PieChartIcon from '@rsuite/icons/PieChart';
import DataAuthorizeIcon from '@rsuite/icons/DataAuthorize';
import SearchIcon from '@rsuite/icons/Search';
import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Nav,
  HStack,
  Breadcrumb,
  VStack,
  InputGroup,
  Input,
  Placeholder,
  useMediaQuery
} from 'rsuite';
import { SiProtondb } from 'react-icons/si';

const NavHeader = ({ expanded }) => {
  if (!expanded) {
    return (
      <HStack justifyContent="center">
        <SiProtondb size={32} />
      </HStack>
    );
  }

  return (
    <VStack style={{ padding: '10px 10px 0 10px' }} spacing={12}>
      <HStack>
        <SiProtondb size={32} /> Brand
      </HStack>
      <InputGroup inside size="sm">
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
        <Input type="search" placeholder="Search here..." />
      </InputGroup>
    </VStack>
  );
};

const App = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('1');
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const isExpanded = expanded && !isMobile;

  return (
    <Container>
      <Sidebar
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        width={isExpanded ? 260 : 56}
        collapsible
      >
        <Sidenav expanded={isExpanded} defaultOpenKeys={['3', '4']} style={{ height: '100%' }}>
          <Sidenav.Header>
            <NavHeader expanded={isExpanded} />
          </Sidenav.Header>
          <Sidenav.Body>
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                Overview
              </Nav.Item>
              <Nav.Menu eventKey="2" title="Customers" icon={<PeoplesIcon />}>
                <Nav.Item eventKey="2-1">Users</Nav.Item>
                <Nav.Item eventKey="2-2">Groups</Nav.Item>
              </Nav.Menu>
              <Nav.Menu eventKey="3" title="Analytics" icon={<PieChartIcon />}>
                <Nav.Item eventKey="3-1">Geo</Nav.Item>
                <Nav.Item eventKey="3-2">Devices</Nav.Item>
                <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
                <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
              </Nav.Menu>
              <Nav.Menu eventKey="4" title="Security" icon={<DataAuthorizeIcon />}>
                <Nav.Item eventKey="4-1">Users</Nav.Item>
                <Nav.Item eventKey="4-2">Roles</Nav.Item>
                <Nav.Item eventKey="4-3">Permissions</Nav.Item>
              </Nav.Menu>

              <Nav.Menu eventKey="5" title="Settings" icon={<SettingIcon />}>
                <Nav.Item eventKey="5-1">Applications</Nav.Item>
                <Nav.Item eventKey="5-2">Channels</Nav.Item>
                <Nav.Item eventKey="5-3">Versions</Nav.Item>
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
          {/** @ts-ignore */}
          <Sidenav.Footer>
            <Sidenav.Toggle onToggle={setExpanded} />
            {/** @ts-ignore */}
          </Sidenav.Footer>
        </Sidenav>
      </Sidebar>
      <Container>
        <Header>
          <HStack spacing={16} alignItems="center" style={{ padding: '1rem' }}>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Components</Breadcrumb.Item>
              <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
            </Breadcrumb>
          </HStack>
        </Header>
        <Content style={{ padding: '0 1rem' }}>
          <Placeholder.Paragraph rows={10} />
        </Content>
      </Container>
    </Container>
  );
};

// Use dynamic import with ssr disabled
export default dynamic(() => Promise.resolve(App), { ssr: false });
