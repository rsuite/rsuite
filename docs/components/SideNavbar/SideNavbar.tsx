import React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Sidebar, Nav, IconButton, Badge } from 'rsuite';
import Link from '@/components/Link';
import { useApp } from '../AppContext';
import usePages, { type MenuItem } from '@/utils/usePages';
import debounce from 'lodash/debounce';
import scrollTop from 'dom-lib/scrollTop';
import ExternalLinkSquare from '@rsuite/icons/legacy/ExternalLinkSquare';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';

import BarsIcon from '@rsuite/icons/legacy/Bars';
import { TypeAttributes } from 'rsuite/esm/@types/common';
import pkg from '../../package.json';

const icons = { IoExtensionPuzzleOutline };
interface SideNavbarProps {
  style: React.CSSProperties;
  onToggleMenu?: (show: boolean) => void;
  showSubmenu?: boolean;
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

const isNewComponent = (minVersion?: string) => {
  if (!minVersion) return false;

  const [, currentMinor] = pkg.version.split('.');
  const [, minor] = minVersion.split('.');

  // If the current version is less than 10 minor versions of the minimum version, it is considered a new component.
  if (parseInt(currentMinor) - parseInt(minor) <= 10) {
    return true;
  }

  return false;
};

export default React.memo(function SideNavbar(props: SideNavbarProps) {
  const { onToggleMenu, showSubmenu, style } = props;
  const router = useRouter();
  const activeKey = router.pathname.split('/')?.[1];
  const { language } = useApp();
  const showMediaToggleButton = style.width !== 0;

  const navItems = [];
  const menuList = usePages();
  const data = menuList.find(item => item.id === activeKey);

  const { name: activeTitle, icon, children = [] } = data;

  const handleOpenMediaSidebar = React.useCallback(() => {
    onToggleMenu(true);
  }, [onToggleMenu]);

  const handleCloseMediaSidebar = React.useCallback(() => {
    onToggleMenu(false);
  }, [onToggleMenu]);

  React.useEffect(initSidebarScrollTop, []);

  const renderTag = (item: MenuItem) => {
    if (item.tag) {
      return (
        <Badge
          content={item.tag}
          color={(item.tagColor as TypeAttributes.Color) ?? 'blue'}
          style={{ marginLeft: 5 }}
        />
      );
    }

    if (isNewComponent(item.minVersion)) {
      return <Badge content="New" color="blue" style={{ marginLeft: 5 }} />;
    }
    return null;
  };

  const renderIcon = (icon?: string) => {
    if (icon) {
      const Icon = icons[icon];
      if (Icon) {
        return <Icon />;
      }
    }
    return null;
  };

  if (children) {
    children.forEach(child => {
      const pathname = child.url ? child.url : `/${data.id}/${child.id}`;
      const active = router.pathname === pathname;

      if (child.group) {
        navItems.push(
          <Nav.Item panel key={child.id}>
            {child.name}
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
            {title}
            {renderTag(child)}
            {renderIcon(child.icon)}
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
          'media-sidebar-show': showSubmenu
        })}
        style={style}
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
          'media-sidebar-show': showSubmenu
        })}
        onClick={handleCloseMediaSidebar}
      />
    </>
  );
});
