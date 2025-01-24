import React, { useMemo } from 'react';
import NavbarBrand from './NavbarBrand';
import NavbarContent from './NavbarContent';
import NavbarToggle from './NavbarToggle';
import NavbarDrawer from './NavbarDrawer';
import { forwardRef } from '@/internals/utils';
import { useClassNames, useEventCallback, useUniqueId } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { NavbarContext } from './NavbarContext';
import type { WithAsProps } from '@/internals/types';

export interface NavbarProps extends WithAsProps {
  /**
   * The appearance style of the Navbar component.
   */
  appearance?: 'default' | 'inverse' | 'subtle';

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
    as: Component = 'nav',
    classPrefix = 'navbar',
    appearance = 'default',
    onDrawerOpenChange,
    ...rest
  } = propsWithDefaults;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(appearance));
  const [open, setOpen] = React.useState(false);

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
      <Component {...rest} ref={ref} className={classes} />
    </NavbarContext.Provider>
  );
}, Subcomponents);

Navbar.displayName = 'Navbar';

export default Navbar;
