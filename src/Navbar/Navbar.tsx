import React from 'react';
import NavbarBody from './NavbarBody';
import NavbarHeader from './NavbarHeader';
import { createContext, useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export const NavbarContext = createContext<boolean>(null);

type AppearanceType = 'default' | 'inverse' | 'subtle';

export interface NavbarProps extends WithAsProps {
  appearance?: AppearanceType;
  classPrefix?: string;
  hasChildContext?: boolean;
}

interface NavbarComponent extends RsRefForwardingComponent<'div', NavbarProps> {
  Header?: typeof NavbarHeader;
  Body?: typeof NavbarBody;
}

const defaultProps: Partial<NavbarProps> = {
  as: 'div',
  hasChildContext: true,
  classPrefix: 'navbar',
  appearance: 'default'
};

const Navbar: NavbarComponent = React.forwardRef(
  (props: NavbarProps, ref: React.Ref<HTMLElement>) => {
    const { className, as: Component, hasChildContext, classPrefix, appearance, ...rest } = props;
    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix(appearance));
    return (
      <NavbarContext.Provider value={hasChildContext}>
        <Component {...rest} ref={ref} className={classes} />
      </NavbarContext.Provider>
    );
  }
);

Navbar.Header = NavbarHeader;
Navbar.Body = NavbarBody;

Navbar.displayName = 'Navbar';
Navbar.defaultProps = defaultProps;

export default Navbar;
