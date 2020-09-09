import * as React from 'react';
import { StandardProps } from '../@types/common';
import { useClassNames } from '../utils';

export interface NavbarHeaderProps extends StandardProps {
  classPrefix?: string;
  className?: string;
}

const NavbarHeader = React.forwardRef(
  (props: NavbarHeaderProps, ref: React.Ref<HTMLDivElement>) => {
    const { classPrefix = 'navbar-header', className, ...rest } = props;
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    return <div {...rest} ref={ref} className={classes} />;
  }
);

NavbarHeader.displayName = 'NavbarHeader';

export default NavbarHeader;
