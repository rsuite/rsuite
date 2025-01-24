import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { Placement, WithAsProps } from '@/internals/types';

export interface TooltipProps extends WithAsProps {
  /** Dispaly placement */
  placement?: Placement;

  /** Whether visible */
  visible?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** Whether show the arrow indicator */
  arrow?: boolean;
}

/**
 * The `Tooltip` component is used to describe a element.
 *
 * @see https://rsuitejs.com/components/tooltip
 */
const Tooltip = forwardRef<'div', TooltipProps>((props: TooltipProps, ref) => {
  const { propsWithDefaults } = useCustom('Tooltip', props);
  const {
    as: Component = 'div',
    className,
    classPrefix = 'tooltip',
    children,
    style,
    visible,
    arrow = true,
    ...rest
  } = propsWithDefaults;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix({
      arrow
    })
  );
  const styles = {
    opacity: visible ? 1 : undefined,
    ...style
  };

  return (
    <Component role="tooltip" {...rest} ref={ref} className={classes} style={styles}>
      {children}
    </Component>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
