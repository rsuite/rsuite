import React from 'react';
import Link from 'next/link';
import { Nav } from 'rsuite';

const NavLink = React.forwardRef((props, ref) => {
  const { as, href, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <a ref={ref} {...rest} />
    </Link>
  );
});

const Navbar = () => (
  <Nav>
    <Nav.Item componentClass={NavLink} href="/">
      Home
    </Nav.Item>
    <Nav.Item componentClass={NavLink} href="/page1">
      Page 1
    </Nav.Item>
    <Nav.Item componentClass={NavLink} href="/page2">
      Page 2
    </Nav.Item>
  </Nav>
);

export default Navbar;
