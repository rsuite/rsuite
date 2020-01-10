import * as React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Sidebar, Nav, Icon } from 'rsuite';
import { ThemeContext } from '../Context';
import getMenu from '../../utils/getMenu';

interface SideNavbarProps {
  style: React.CSSProperties;
}

function SideNavbar(props: SideNavbarProps) {
  const router = useRouter();
  const activeKey = router.pathname.split('/')?.[1];

  return (
    <ThemeContext.Consumer>
      {({ messages }) => {
        const navItems = [];
        const menuList = getMenu(messages);
        const data = menuList.find(item => item.id === activeKey);

        const { name: activeTitle, icon, children = [] } = data;

        if (children) {
          children.forEach(child => {
            const pathname = child.url ? child.url : `/${data.id}/${child.id}`;
            const active = router.pathname === pathname;

            if (child.group) {
              navItems.push(
                <Nav.Item panel key={child.id}>
                  # {child.name}
                </Nav.Item>
              );
              return;
            }

            const title =
              messages?.id === 'en-US' || !child.title ? null : (
                <span className="title-zh">{child.title}</span>
              );

            if (child.target === '_blank' && child.url) {
              navItems.push(
                <Nav.Item key={child.id} href={child.url} target="_blank">
                  {child.name} {title}
                  <Icon icon="external-link-square" className="external-link" />
                </Nav.Item>
              );
            } else {
              const localePath = messages?.id === 'en-US' ? '/en' : '';
              const href = `${localePath}${pathname}`;
              navItems.push(
                <Nav.Item key={child.id} active={active} href={href}>
                  {child.name}
                  {title}
                </Nav.Item>
              );
            }
          });
        }

        return (
          <>
            <div className={classnames('rs-sidebar-wrapper fixed')} {...props}>
              <Sidebar>
                <div className="title-wrapper">
                  {icon} {activeTitle}
                </div>
                <Nav className="nav-docs" vertical>
                  {navItems}
                </Nav>
              </Sidebar>
            </div>
          </>
        );
      }}
    </ThemeContext.Consumer>
  );
}

export default SideNavbar;
