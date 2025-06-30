import React, { useContext } from 'react';
import Drawer, { DrawerProps } from '../Drawer';
import { useEventCallback } from '@/internals/hooks';
import { createComponent, createChainedFunction } from '@/internals/utils';
import { NavbarContext } from './NavbarContext';

export type NavbarDrawerProps = DrawerProps;

const NavDrawer = createComponent<typeof Drawer, DrawerProps>({
  name: 'NavbarDrawer',
  componentAs: Drawer,
  componentClassPrefix: 'navbar-drawer'
});

const NavbarDrawer = React.forwardRef((props: NavbarDrawerProps, ref: React.Ref<any>) => {
  const { onToggle, navbarId, open: navbarOpen } = useContext(NavbarContext) || {};
  const { onClose, open = navbarOpen, ...rest } = props;

  const handleClose = useEventCallback(() => {
    onToggle?.(false);
  });

  return (
    <NavDrawer
      ref={ref}
      open={open}
      id={`${navbarId}-drawer`}
      onClose={createChainedFunction(handleClose, onClose)}
      {...rest}
    />
  );
});

NavbarDrawer.displayName = 'NavbarDrawer';

export default NavbarDrawer;
