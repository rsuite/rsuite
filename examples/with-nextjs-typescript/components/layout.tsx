import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'rsuite';
import './layout.less';

interface LayoutProps {
  activeKey?: string;
  children?: React.ReactNode;
}

interface NavLinkProps {
  as: string;
  href: string;
}

const NavLink = React.forwardRef((props: NavLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
  const { as, href, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <a ref={ref} {...rest} />
    </Link>
  );
});

const Layout: React.FunctionComponent<LayoutProps> = ({ activeKey, children }) => {
  return (
    <div className="container">
      <Nav activeKey={activeKey}>
        <Nav.Item eventKey="home" componentClass={NavLink} href="/">
          Home
        </Nav.Item>
        <Nav.Item eventKey="one" componentClass={NavLink} href="/one">
          Page 1
        </Nav.Item>
        <Nav.Item eventKey="two" componentClass={NavLink} href="/two">
          Page 2
        </Nav.Item>
      </Nav>
      {children}
    </div>
  );
};

Layout.propTypes = {
  activeKey: PropTypes.string,
  children: PropTypes.node
};

export default Layout;
