import * as React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Sidebar, Nav, Icon } from 'rsuite';
import Link from '@/components/Link';
import AppContext from '../AppContext';
import getPages from '@/utils/pages';

interface SideNavbarProps {
  style: React.CSSProperties;
}

export default React.memo(function SideNavbar(props: SideNavbarProps) {
  const router = useRouter();
  const activeKey = router.pathname.split('/')?.[1];
  const { language } = React.useContext(AppContext);

  const navItems = [];
  const menuList = getPages();
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
        language === 'en' || !child.title ? null : <span className="title-zh">{child.title}</span>;

      if (child.target === '_blank' && child.url) {
        navItems.push(
          <Nav.Item key={child.id} href={child.url} target="_blank">
            {child.name} {title}
            <Icon icon="external-link-square" className="external-link" />
          </Nav.Item>
        );
      } else {
        navItems.push(
          <Nav.Item key={child.id} href={pathname} active={active} componentClass={Link}>
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
});
