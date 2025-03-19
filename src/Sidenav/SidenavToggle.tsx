import React, { useContext } from 'react';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import IconButton, { IconButtonProps } from '../IconButton';
import { forwardRef } from '@/internals/utils';
import { SidenavContext } from './Sidenav';
import { useStyles, useEventCallback } from '@/internals/hooks';

export interface SidenavToggleProps extends IconButtonProps {
  /** Callback function for menu state switching */
  onToggle?: (expanded: boolean, event: React.MouseEvent) => void;
}

const SidenavToggle = forwardRef<'div', SidenavToggleProps>((props, ref) => {
  const sidenav = useContext(SidenavContext);

  if (!sidenav) {
    console.error('<Sidenav.Toggle> must be rendered within a <Sidenav>');
    return null;
  }

  const { className, classPrefix = 'sidenav-toggle', onToggle, onClick, ...rest } = props;

  const expanded = sidenav.expanded;

  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ collapsed: !expanded }));

  const handleToggle = useEventCallback((event: React.MouseEvent<any>) => {
    onToggle?.(!expanded, event);
    onClick?.(event);
  });

  return (
    <IconButton
      ref={ref}
      className={classes}
      icon={<ArrowLeftLineIcon aria-label="" />}
      onClick={handleToggle}
      aria-label={expanded ? 'Collapse' : 'Expand'}
      {...rest}
    />
  );
});

SidenavToggle.displayName = 'Sidenav.Toggle';

export default SidenavToggle;
