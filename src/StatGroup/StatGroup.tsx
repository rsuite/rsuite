import React from 'react';
import { forwardRef, getCssValue } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export interface StatGroupProps extends WithAsProps {
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
    as: Component = 'div',
    classPrefix = 'stat-group',
    className,
    children,
    columns,
    spacing = 6,
    style,
    ...rest
  } = propsWithDefaults;

  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const styles = {
    '--rs-stat-group-columns': columns,
    '--rs-stat-group-spacing': getCssValue(spacing),
    ...style
  } as React.CSSProperties;

  return (
    <Component ref={ref} className={classes} style={styles} {...rest}>
      {children}
    </Component>
  );
});

StatGroup.displayName = 'StatGroup';

export default StatGroup;
