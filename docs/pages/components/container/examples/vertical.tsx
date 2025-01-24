/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import React from 'react';
import { Navbar, Nav, Avatar, Drawer, Placeholder, Container, Header, Content } from 'rsuite';
import { SiProtondb } from 'react-icons/si';

const NavContent = ({ vertical }: { vertical?: boolean }) => (
  <Nav vertical={vertical}>
    <Nav.Item>Docs</Nav.Item>
    <Nav.Item>Components</Nav.Item>
    <Nav.Item>Tools</Nav.Item>
  </Nav>
);

const NavbarBrand = () => (
  <Navbar.Brand href="#">
    <SiProtondb size={26} /> Brand
  </Navbar.Brand>
);

const App = () => {
  return (
    <Container>
      <Header>
        <Navbar>
          {/* Navigation content for large screens */}
          {/** @ts-ignore */}
          <Navbar.Content hidden="sm">
            <NavbarBrand />
            <NavContent />
          </Navbar.Content>

          {/* Drawer menu for small screens */}
          {/** @ts-ignore */}
          <Navbar.Content visible="sm">
            <Navbar.Toggle />
            <Navbar.Drawer placement="left" size="xs">
              <Drawer.Header>
                <Drawer.Title>Menu</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <NavContent vertical />
              </Drawer.Body>
            </Navbar.Drawer>
            <NavbarBrand />
          </Navbar.Content>

          {/* User avatar, always visible */}
          <Navbar.Content>
            <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
          </Navbar.Content>
        </Navbar>
      </Header>
      <Content style={{ padding: 20 }}>
        <Placeholder rows={14} />
      </Content>
    </Container>
  );
};

export default App;
