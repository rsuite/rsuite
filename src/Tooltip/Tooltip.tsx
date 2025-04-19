import React, { useMemo } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, mergeStyles } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import type { Placement } from '@/internals/types';

export interface TooltipProps extends BoxProps {
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
    as,
    className,
    classPrefix = 'tooltip',
    children,
    style,
    visible,
    arrow = true,
    ...rest
  } = propsWithDefaults;

  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ arrow }));

  const styles = useMemo(
    () => mergeStyles(style, { ['--rs-opacity']: visible ? 1 : undefined }),
    [visible, style]
  );

  return (
    <Box as={as} role="tooltip" {...rest} ref={ref} className={classes} style={styles}>
      {children}
    </Box>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
