import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';

export interface CenterProps extends BoxProps {
  inline?: boolean;
}

const Center = forwardRef<'div', CenterProps>((props, ref) => {
  const { as, classPrefix = 'center', className, children, inline, ...rest } = props;
  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  return (
    <Box as={as} ref={ref} data-inline={inline} className={classes} {...rest}>
      {children}
    </Box>
  );
});

Center.displayName = 'Center';

export default Center;
