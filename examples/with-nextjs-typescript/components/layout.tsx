import Link from 'next/link';
import React from 'react';
import { Nav, Icon, IconProps } from 'rsuite';
import './layout.less';

interface Router {
  name: string;
  key: string;
  path: string;
  icon?: IconProps['icon'];
}

const routers: Router[] = [
  {
    name: 'home',
    key: 'home',
    path: '/'
  },
  {
    name: 'one',
    key: 'one',
    path: '/one'
  },
  {
    name: 'two',
    key: 'two',
    path: '/two'
  }
];

interface LayoutProps {
  activeKey: string;
}

const Layout: React.FC<LayoutProps> = ({ activeKey, children, ...props }) => {
  return (
    <div className="container">
      <Nav activeKey={activeKey} className="nav" justified>
        {routers.map(item => (
          <Nav.Item
            key={item.key}
            eventKey={item.key}
            icon={item?.icon ? <Icon icon={item?.icon} /> : null}
          >
            <Link href={item.path}>
              <a>{item.name}</a>
            </Link>
          </Nav.Item>
        ))}
      </Nav>
      {children}
    </div>
  );
};

export default Layout;
