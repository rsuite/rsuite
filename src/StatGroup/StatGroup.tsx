import React from 'react';
import { getCssValue } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

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

const StatGroup: RsRefForwardingComponent<'div', StatGroupProps> = React.forwardRef(
  (props: StatGroupProps, ref) => {
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

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    const styles = {
      '--rs-columns': columns,
      '--rs-spacing': getCssValue(spacing),
      ...style
    } as React.CSSProperties;

    return (
      <Component ref={ref} className={classes} style={styles} {...rest}>
        {children}
      </Component>
    );
  }
);

StatGroup.displayName = 'StatGroup';

export default StatGroup;
