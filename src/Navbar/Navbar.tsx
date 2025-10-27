import React, { useMemo } from 'react';
import NavbarBrand from './NavbarBrand';
import NavbarContent from './NavbarContent';
import NavbarToggle from './NavbarToggle';
import NavbarDrawer from './NavbarDrawer';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import {
  useStyles,
  useCustom,
  useEventCallback,
  useUniqueId,
  useControlled
} from '@/internals/hooks';
import { NavbarContext } from './NavbarContext';

export interface NavbarProps extends BoxProps {
  /**
   * The appearance style of the Navbar component.
   */
  appearance?: 'default' | 'inverse' | 'subtle';

  /**
   * The open state of the drawer.
   */
  drawerOpen?: boolean;

  /**
   * Callback when the drawer is opened or closed.
   */
  onDrawerOpenChange?: (open: boolean) => void;
}

const Subcomponents = {
  Brand: NavbarBrand,
  Content: NavbarContent,
  Toggle: NavbarToggle,
  Drawer: NavbarDrawer
};

/**
 * The `Navbar` component is a wrapper that positions navigation elements.
 * @see https://rsuitejs.com/components/navbar
 */
const Navbar = forwardRef<'div', NavbarProps, typeof Subcomponents>((props, ref) => {
  const { propsWithDefaults } = useCustom('Navbar', props);
  const {
    className,
    as = 'nav',
    classPrefix = 'navbar',
    appearance = 'default',
    drawerOpen,
    onDrawerOpenChange,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const [open, setOpen] = useControlled(drawerOpen, false);

  const handleToggle = useEventCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
    onDrawerOpenChange?.(nextOpen);
  });

  const navbarId = useUniqueId('navbar-');
  const context = useMemo(
    () => ({ appearance, open, navbarId, onToggle: handleToggle }),
    [appearance, navbarId, open]
  );

  return (
    <NavbarContext.Provider value={context}>
      <Box as={as} ref={ref} className={classes} data-appearance={appearance} {...rest} />
    </NavbarContext.Provider>
  );
}, Subcomponents);

Navbar.displayName = 'Navbar';

export default Navbar;
