import React from 'react';
import { Nav } from 'rsuite';
import { Link, useLocation } from 'umi';

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const activeKey = pathname === '/about' ? 'about' : 'home';

  return (
    <Nav>
      <Nav.Item as={Link} to="/" active={activeKey === 'home'}>
        Home
      </Nav.Item>
      <Nav.Item as={Link} to="/about" active={activeKey === 'about'}>
        About
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
