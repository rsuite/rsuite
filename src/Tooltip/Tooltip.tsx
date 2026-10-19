import React, { useMemo, useContext } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, mergeStyles } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import type { Placement } from '@/internals/types';
import { TooltipDescriptionObserverContext } from '@/internals/Overlay/TooltipDescriptionContext';

export interface TooltipProps
  extends BoxProps,
    Pick<React.HTMLAttributes<HTMLElement>, 'id' | 'role'> {
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
  const description = useContext(TooltipDescriptionObserverContext);
  let propsForDefaults = props;
  // An absent automatic ID must not override an authored provider default.
  if (description && props.id === undefined) {
    propsForDefaults = { ...props };
    delete propsForDefaults.id;
  }
  const { propsWithDefaults } = useCustom('Tooltip', propsForDefaults);
  const {
    as,
    className,
    classPrefix = 'tooltip',
    children,
    style,
    visible,
    arrow = true,
    id,
    ...rest
  } = propsWithDefaults;

  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ arrow }));

  const styles = useMemo(
    () => mergeStyles(style, { ['--rs-opacity']: visible ? 1 : undefined }),
    [visible, style]
  );

  return (
    <TooltipDescriptionObserverContext.Provider value={undefined}>
      <Box
        as={as}
        role="tooltip"
        {...rest}
        id={id ?? description?.id}
        ref={ref}
        className={classes}
        style={styles}
      >
        {children}
      </Box>
    </TooltipDescriptionObserverContext.Provider>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
