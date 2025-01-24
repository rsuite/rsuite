import React from 'react';
import { forwardRef, getCssValue } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export interface CardGroupProps extends WithAsProps {
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
    as: Component = 'div',
    classPrefix = 'card-group',
    className,
    children,
    columns,
    spacing = 16,
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
});

CardGroup.displayName = 'CardGroup';

export default CardGroup;
