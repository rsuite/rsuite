import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

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

const CardGroup: RsRefForwardingComponent<'div', CardGroupProps> = React.forwardRef(
  (props: CardGroupProps, ref) => {
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
      ...style,
      '--rs-columns': columns,
      '--rs-spacing': typeof spacing === 'number' ? `${spacing}px` : spacing
    } as React.CSSProperties;

    return (
      <Component ref={ref} className={classes} style={styles} {...rest}>
        {children}
      </Component>
    );
  }
);

CardGroup.displayName = 'CardGroup';
CardGroup.propTypes = {
  columns: PropTypes.number,
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default CardGroup;
