import React from 'react';
import NavbarBody from './NavbarBody';
import NavbarHeader from './NavbarHeader';
import NavbarBrand from './NavbarBrand';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { useCustom } from '../CustomProvider';

export const NavbarContext = React.createContext<boolean>(false);

type AppearanceType = 'default' | 'inverse' | 'subtle';

export interface NavbarProps extends WithAsProps {
  appearance?: AppearanceType;
  classPrefix?: string;
}

interface NavbarComponent extends RsRefForwardingComponent<'div', NavbarProps> {
  /**
   * @deprecated use Navbar.Brand instead
   */
  Header: typeof NavbarHeader;
  /**
   * @deprecated use Nav as direct child of Navbar
   */
  Body: typeof NavbarBody;
  Brand: typeof NavbarBrand;
}

/**
 * The `Navbar` component is used to create a navigation header.
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
    ...rest
  } = propsWithDefaults;
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(appearance));
  return (
    <NavbarContext.Provider value={true}>
      <Component {...rest} ref={ref} className={classes} />
    </NavbarContext.Provider>
  );
}) as unknown as NavbarComponent;

Navbar.Header = NavbarHeader;
Navbar.Body = NavbarBody;
Navbar.Brand = NavbarBrand;

Navbar.displayName = 'Navbar';

export default Navbar;
