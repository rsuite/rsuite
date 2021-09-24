import React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Sidebar, Nav, IconButton, Badge } from 'rsuite';
import Link from '@/components/Link';
import AppContext from '../AppContext';
import usePages from '@/utils/usePages';
import debounce from 'lodash/debounce';
import { scrollTop } from 'dom-lib';
import ExternalLinkSquare from '@rsuite/icons/legacy/ExternalLinkSquare';
import BarsIcon from '@rsuite/icons/legacy/Bars';

interface SideNavbarProps {
  style: React.CSSProperties;
}

function setSidebarScrollTop() {
  const sidebar = document.getElementById('sidebar');
  const top = scrollTop(sidebar);

  sessionStorage.setItem('SIDEBAR-TOP', `${top}`);
}

function initSidebarScrollTop() {
  const sidebar = document.getElementById('sidebar');
  const top = sessionStorage.getItem('SIDEBAR-TOP') || 0;
  if (sidebar) {
    scrollTop(sidebar, +top);
  }
}

export default React.memo(function SideNavbar(props: SideNavbarProps) {
  const router = useRouter();
  const activeKey = router.pathname.split('/')?.[1];
  const [mediaSidebarShow, setMediaSidebarShow] = React.useState<boolean>(false);
  const { language } = React.useContext(AppContext);
  const showMediaToggleButton = props.style.width !== 0;

  const navItems = [];
  const menuList = usePages();
  const data = menuList.find(item => item.id === activeKey);

  const { name: activeTitle, icon, children = [] } = data;

  const handleOpenMediaSidebar = React.useCallback(() => {
    setMediaSidebarShow(true);
  }, [setMediaSidebarShow]);

  const handleCloseMediaSidebar = React.useCallback(() => {
    setMediaSidebarShow(false);
  }, [setMediaSidebarShow]);

  React.useEffect(initSidebarScrollTop, []);

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
            <ExternalLinkSquare className="external-link" />
          </Nav.Item>
        );
      } else {
        navItems.push(
          <Nav.Item key={child.id} href={pathname} active={active} as={Link}>
            {child.name}
            {title} {child.new && <Badge content="new" />}
          </Nav.Item>
        );
      }
    });
  }

  return (
    <>
      {showMediaToggleButton && (
        <IconButton
          className="media-toggle-side-bar"
          icon={<BarsIcon />}
          onClick={handleOpenMediaSidebar}
        />
      )}
      <div
        className={classnames('rs-sidebar-wrapper fixed', {
          'media-sidebar-show': mediaSidebarShow
        })}
        {...props}
      >
        <Sidebar>
          <div className="title-wrapper">
            {icon} {activeTitle}
          </div>
          <Nav
            id="sidebar"
            className="nav-docs"
            vertical
            onScroll={debounce(setSidebarScrollTop, 500)}
          >
            {navItems}
          </Nav>
        </Sidebar>
      </div>
      <div
        className={classnames('rs-sidebar-media-backdrop', {
          'media-sidebar-show': mediaSidebarShow
        })}
        onClick={handleCloseMediaSidebar}
      />
    </>
  );
});
