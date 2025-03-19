import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { FormattedNumber } from '../CustomProvider';
export interface StatValueProps extends BoxProps {
  value?: number;
  formatOptions?: Intl.NumberFormatOptions;
}

const StatValue = forwardRef<'dd', StatValueProps>((props, ref) => {
  const {
    as = 'dd',
    classPrefix = 'stat-value',
    className,
    children,
    value,
    formatOptions,
    ...rest
  } = props;
  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  return (
    <Box as={as} ref={ref} className={classes} {...rest}>
      {value && <FormattedNumber value={value} formatOptions={formatOptions} />}
      {children}
    </Box>
  );
});

StatValue.displayName = 'StatValue';

export default StatValue;
