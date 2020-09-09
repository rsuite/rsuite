import * as React from 'react';
import { StandardProps } from '../@types/common';
import { useClassNames } from '../utils';

export interface NavbarBodyProps extends StandardProps {
  classPrefix?: string;
  className?: string;
  children?: React.ReactNode;
}

const NavbarBody = React.forwardRef((props: NavbarBodyProps, ref: React.Ref<HTMLDivElement>) => {
  const { children, classPrefix = 'navbar-body', className, ...rest } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());
  return (
    <div {...rest} ref={ref} className={classes}>
      {children}
    </div>
  );
});

NavbarBody.displayName = 'NavbarBody';

export default NavbarBody;
