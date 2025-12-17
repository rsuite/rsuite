import React from 'react';
import { NavLink } from 'react-router';
import { Nav } from 'rsuite';

export function Navbar() {
  return (
    <Nav>
      <Nav.Item as={NavLink} to="/">
        Home
      </Nav.Item>
      <Nav.Item as={NavLink} to="/rsuite">
        RSuite
      </Nav.Item>
    </Nav>
  );
}
