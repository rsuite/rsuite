import React, { useCallback, useContext } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { NavbarContext } from './NavbarContext';

interface ChildProps {
  onClose: () => void;
}

export interface NavbarContentProps extends Omit<BoxProps, 'children'> {
  children?: React.ReactNode | (({ onClose }: ChildProps) => React.ReactNode);
}

const NavbarContent = React.forwardRef((props: NavbarContentProps, ref: React.Ref<any>) => {
  const { className, classPrefix = 'navbar-content', children, ...rest } = props;
  const { onToggle } = useContext(NavbarContext) || {};

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  const onClose = useCallback(() => {
    onToggle?.(false);
  }, [onToggle]);

  return (
    <Box ref={ref} className={classes} {...rest}>
      {typeof children === 'function' ? children({ onClose }) : children}
    </Box>
  );
});

NavbarContent.displayName = 'NavbarContent';

export default NavbarContent;
