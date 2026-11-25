import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import styles from './SideNavbar.module.scss';

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
}

export default function NavGroup(props: NavGroupProps) {
  const { title, children } = props;
  const [expanded, setExpanded] = useState(true);
  const handleNavGroupClick = useCallback(() => {
    console.log('handleNavGroupClick');

    setExpanded(!expanded);
  }, [expanded]);

  return (
    <div className={classNames(styles['nav-group'], { [styles['expanded']]: expanded })}>
      <div
        className={classNames(styles['nav-title'], styles['rs-nav-item-panel'])}
        onClick={handleNavGroupClick}
      >
        <span>{title}</span>
        <span className={styles['nav-icon']}>
          <ArrowDownIcon />
        </span>
      </div>
      <div className={styles['nav-group-children']}>{children}</div>
    </div>
  );
}
