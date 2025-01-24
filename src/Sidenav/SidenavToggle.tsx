import React, { useContext } from 'react';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import IconButton from '../IconButton';
import { forwardRef } from '@/internals/utils';
import { SidenavContext } from './Sidenav';
import { useClassNames } from '@/internals/hooks';
import type { WithAsProps } from '@/internals/types';

export interface SidenavToggleProps extends WithAsProps {
  /** Callback function for menu state switching */
  onToggle?: (expanded: boolean, event: React.MouseEvent) => void;
}

const SidenavToggle = forwardRef<'div', SidenavToggleProps>((props, ref) => {
  const sidenav = useContext(SidenavContext);

  if (!sidenav) {
    console.error('<Sidenav.Toggle> must be rendered within a <Sidenav>');
    return null;
  }

  const { className, classPrefix = 'sidenav-toggle', onToggle, ...rest } = props;

  const expanded = sidenav.expanded;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ collapsed: !expanded }));

  const handleToggle = (event: React.MouseEvent) => {
    onToggle?.(!expanded, event);
  };

  return (
    <IconButton
      {...rest}
      ref={ref}
      className={classes}
      icon={<ArrowLeftLineIcon aria-label="" />}
      onClick={handleToggle}
      aria-label={expanded ? 'Collapse' : 'Expand'}
    />
  );
});

SidenavToggle.displayName = 'Sidenav.Toggle';

export default SidenavToggle;
