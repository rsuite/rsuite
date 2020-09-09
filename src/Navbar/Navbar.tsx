import * as React from 'react';
import NavbarBody from './NavbarBody';
import NavbarHeader from './NavbarHeader';
import { createContext, useClassNames } from '../utils';
import { StandardProps } from '../@types/common';

export const NavbarContext = createContext<boolean>(null);

type AppearanceType = 'default' | 'inverse' | 'subtle';

export interface NavbarProps extends StandardProps {
  appearance?: AppearanceType;
  classPrefix?: string;
  as?: React.ElementType;
  hasChildContext?: boolean;
}

const Navbar = React.forwardRef((props: NavbarProps, ref: React.Ref<HTMLElement>) => {
  const {
    className,
    as: Component = 'div',
    hasChildContext = true,
    classPrefix = 'navbar',
    appearance = 'default',
    ...rest
  } = props;
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(appearance));
  return (
    <NavbarContext.Provider value={hasChildContext}>
      <Component {...rest} ref={ref} className={classes} role="navigation" />
    </NavbarContext.Provider>
  );
});

Navbar.displayName = 'Navbar';

export default Object.assign(Navbar, {
  Header: NavbarHeader,
  Body: NavbarBody
});
