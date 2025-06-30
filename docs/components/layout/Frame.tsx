import React from 'react';
import SideNavbar from './SideNavbar';
import MainNav from './MainNav';
import styles from './layout.module.scss';

export interface FrameProps {
  submenu?: boolean;
  children?: React.ReactNode;
}

export default function Frame(props: FrameProps) {
  const [submenu, setSubmenu] = React.useState(
    typeof props.submenu !== 'undefined' ? props.submenu : true
  );
  const menuStyles = {
    width: submenu ? 260 : 20
  };

  function handleToggleMenu(open) {
    setSubmenu(typeof open === 'undefined' ? !submenu : open);
  }

  const contextStyle = {
    ['--page-context-margin-inline-start']: submenu ? '324px' : '80px'
  } as React.CSSProperties;

  return (
    <div className={submenu ? null : styles['submenu-close']}>
      <MainNav showSubmenu={submenu} onToggleMenu={handleToggleMenu} />
      <SideNavbar style={menuStyles} showSubmenu={submenu} onToggleMenu={handleToggleMenu} />
      <div className={styles['page-context']} style={contextStyle}>
        {props.children}
      </div>
    </div>
  );
}
