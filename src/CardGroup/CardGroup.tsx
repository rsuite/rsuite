import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, getCssValue, mergeStyles } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';

export interface CardGroupProps extends BoxProps {
  /**
   * The number of columns in the group
   */
  columns?: number;

  /**
   * Spacing between columns
   */
  spacing?: number | string;
}

const CardGroup = forwardRef<'div', CardGroupProps>((props: CardGroupProps, ref) => {
  const { propsWithDefaults } = useCustom('CardGroup', props);
  const {
    as,
    classPrefix = 'card-group',
    className,
    children,
    columns,
    spacing = 16,
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

CardGroup.displayName = 'CardGroup';

export default CardGroup;
