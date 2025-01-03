import React, { useMemo } from 'react';
import NavbarBrand from './NavbarBrand';
import NavbarContent from './NavbarContent';
import NavbarToggle from './NavbarToggle';
import NavbarDrawer from './NavbarDrawer';
import { useClassNames, useEventCallback, useUniqueId } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { useCustom } from '../CustomProvider';
import { NavbarContext } from './NavbarContext';

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

interface NavbarComponent extends RsRefForwardingComponent<'div', NavbarProps> {
  Brand: typeof NavbarBrand;
  Content: typeof NavbarContent;
  Toggle: typeof NavbarToggle;
  Drawer: typeof NavbarDrawer;
}

/**
 * The `Navbar` component is a wrapper that positions navigation elements.
 * @see https://rsuitejs.com/components/navbar
 */
const Navbar: NavbarComponent = React.forwardRef(function Navbar(
  props: NavbarProps,
  ref: React.Ref<HTMLElement>
) {
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
}) as unknown as NavbarComponent;

Navbar.Brand = NavbarBrand;
Navbar.Content = NavbarContent;
Navbar.Toggle = NavbarToggle;
Navbar.Drawer = NavbarDrawer;
Navbar.displayName = 'Navbar';

export default Navbar;
