import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, getCssValue, mergeStyles } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';

export interface StatGroupProps extends BoxProps {
  /**
   * The number of columns in the group
   */
  columns?: number;

  /**
   * Spacing between columns
   */
  spacing?: number | string;
}

const StatGroup = forwardRef<'div', StatGroupProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('StatGroup', props);
  const {
    as,
    classPrefix = 'stat-group',
    className,
    children,
    columns,
    spacing = 6,
    style,
    ...rest
  } = propsWithDefaults;

  const { merge, withPrefix, cssVar } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const styles = mergeStyles(
    style,
    cssVar('columns', columns),
    cssVar('spacing', spacing, getCssValue)
  );

  return (
    <Box as={as} ref={ref} className={classes} style={styles} {...rest}>
      {children}
    </Box>
  );
});

StatGroup.displayName = 'StatGroup';

export default StatGroup;
