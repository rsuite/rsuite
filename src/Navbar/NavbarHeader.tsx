import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { useClassNames } from '../utils';

export interface NavbarHeaderProps extends WithAsProps {
  classPrefix?: string;
  className?: string;
}

const defaultProps: Partial<NavbarHeaderProps> = {
  classPrefix: 'navbar-header',
  as: 'div'
};

const NavbarHeader: RsRefForwardingComponent<'div', NavbarHeaderProps> = React.forwardRef(
  (props: NavbarHeaderProps, ref: React.Ref<HTMLDivElement>) => {
    const { classPrefix, className, as: Component, ...rest } = props;
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    return <Component {...rest} ref={ref} className={classes} />;
  }
);

NavbarHeader.displayName = 'NavbarHeader';
NavbarHeader.defaultProps = defaultProps;

export default NavbarHeader;
