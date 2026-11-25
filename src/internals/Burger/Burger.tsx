import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, mergeStyles, getCssValue, getColorStyle } from '@/internals/utils';
import { useStyles } from '../hooks';
import type { Color } from '@/internals/types';

export interface BurgerProps extends BoxProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color of the Box */
  color?: Color | React.CSSProperties['color'];

  /** If true, burger is in open (X) state */
  open?: boolean;

  /** Thickness of the burger lines (px) */
  lineThickness?: number;
}

/**
 * Burger (hamburger menu) button for toggling navigation menus.
 */
const Burger = forwardRef<'button', BurgerProps>((props, ref) => {
  const {
    as = 'button',
    classPrefix = 'burger',
    className,
    color,
    open = false,
    lineThickness,
    style,
    ...rest
  } = props;
  const { withPrefix, merge, cssVar, prefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const mergedStyle = mergeStyles(
    style,
    cssVar('thickness', getCssValue(lineThickness)),
    getColorStyle(color, 'burger')
  );

  return (
    <Box
      as={as}
      ref={ref}
      className={classes}
      aria-pressed={open}
      data-opened={open}
      style={mergedStyle}
      {...rest}
    >
      <div className={prefix('line')} />
    </Box>
  );
});

Burger.displayName = 'Burger';

export default Burger;
