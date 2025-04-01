import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';

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
    <div className={classNames('nav-group', { expanded })}>
      <div className="nav-title rs-nav-item-panel" onClick={handleNavGroupClick}>
        <span>{title}</span>
        <span className="nav-icon">
          <ArrowDownIcon />
        </span>
      </div>
      <div className="nav-group-children">{children}</div>
    </div>
  );
}
