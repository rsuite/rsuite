import React from 'react';
import { NavLink } from '@remix-run/react';
import { Nav } from 'rsuite';

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<{
    href: string;
  }>
>((props, ref) => {
  const { href, ...rest } = props;
  return (
    <NavLink
      to={href}
      className={({ isActive }) => {
        return isActive ? 'active' : undefined;
      }}
    >
      <a ref={ref} {...rest} />
    </NavLink>
  );
});

export const Navbar = () => (
  <Nav>
    <Nav.Item as={Link} href="/">
      Home
    </Nav.Item>
    <Nav.Item as={Link} href="/rsuite">
      RSuite
    </Nav.Item>
  </Nav>
);
