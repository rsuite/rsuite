import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { useClassNames } from '../utils';

export interface NavbarBodyProps extends WithAsProps {
  classPrefix?: string;
  className?: string;
  children?: React.ReactNode;
}
const defaultProps: Partial<NavbarBodyProps> = {
  as: 'div',
  classPrefix: 'navbar-body'
};

const NavbarBody: RsRefForwardingComponent<'div', NavbarBodyProps> = React.forwardRef(
  (props: NavbarBodyProps, ref: React.Ref<HTMLDivElement>) => {
    const { classPrefix = 'navbar-body', className, as: Component, ...rest } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    return <Component {...rest} ref={ref} className={classes} />;
  }
);

NavbarBody.displayName = 'NavbarBody';
NavbarBody.defaultProps = defaultProps;

export default NavbarBody;
