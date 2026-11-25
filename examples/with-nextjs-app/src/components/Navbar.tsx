'use client';

import React from 'react';
import { Nav } from 'rsuite';
import Link from 'next/link';

const Navbar = ({ activeKey }: { activeKey: string }) => {
  return (
    <Nav>
      <Nav.Item as={Link} href="/" active={activeKey === 'home'}>
        Home
      </Nav.Item>
      <Nav.Item as={Link} href="/about" active={activeKey === 'about'}>
        About
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
