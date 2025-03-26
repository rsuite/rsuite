'use client';

import React from 'react';
import { Menu, MenuItem, Navbar, Nav, Avatar, Drawer } from 'rsuite';
import { IoLogoReact } from 'react-icons/io5';

const NavbarBrand = () => (
  <Navbar.Brand href="#">
    <IoLogoReact size={26} /> Brand
  </Navbar.Brand>
);

const App = () => {
  return (
    <Navbar>
      {/* Navigation content for large screens */}
      <Navbar.Content showFrom="xs">
        <NavbarBrand />
        <Nav>
          <Nav.Item>Docs</Nav.Item>
          <Nav.Item>Components</Nav.Item>
          <Nav.Item>Tools</Nav.Item>
        </Nav>
      </Navbar.Content>

      {/* Drawer menu for small screens */}
      <Navbar.Content hideFrom="xs">
        <Navbar.Toggle />
        <Navbar.Drawer placement="left" size="full">
          <Drawer.Header>
            <Drawer.Title>Menu</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Menu>
              <MenuItem>Docs</MenuItem>
              <MenuItem>Components</MenuItem>
              <MenuItem>Tools</MenuItem>
            </Menu>
          </Drawer.Body>
        </Navbar.Drawer>
        <NavbarBrand />
      </Navbar.Content>

      {/* User avatar, always visible */}
      <Navbar.Content>
        <Avatar src="https://i.pravatar.cc/150?u=19" circle size="sm" />
      </Navbar.Content>
    </Navbar>
  );
};

export default App;
