import React, { useMemo } from 'react';
import kebabCase from 'lodash/kebabCase';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import {
  forwardRef,
  mergeStyles,
  createOffsetStyles,
  isPresetColor,
  createColorVariables
} from '@/internals/utils';
import type { Color, PlacementCorners } from '@/internals/types';

export interface BadgeProps extends BoxProps {
  /**
   * The content of the badge
   */
  content?: React.ReactNode;

  /**
   * The maximum value of the badge
   */
  maxCount?: number;

  /**
   * A badge can have different colors
   */
  color?: Color | React.CSSProperties['color'];

  /**
   * The badge will have an outline
   * @version 6.0.0
   */
  outline?: boolean;

  /**
   * The placement of the badge
   * @version 6.0.0
   */
  placement?: PlacementCorners;

  /**
   * If true, the Badge will have no padding, making it appear more compact and rounded.
   */
  compact?: boolean;

  /**
   * The shape of the wrapped element
   * @version 6.0.0
   */
  shape?: 'rectangle' | 'circle';

  /**
   * Define the horizontal and vertical offset of the badge relative to its wrapped element
   * @version 6.0.0
   */
  offset?: [number | string, number | string];

  /**
   * The badge will be hidden
   * @version 6.0.0
   */
  invisible?: boolean;
}

/**
 * The Badge component is usually used to mark or highlight the status or quantity of an object.
 * @see https://rsuitejs.com/components/badge
 */
const Badge = forwardRef<'div', BadgeProps>((props: BadgeProps, ref) => {
  const { propsWithDefaults } = useCustom('Badge', props);
  const {
    as,
    content,
    color,
    className,
    classPrefix = 'badge',
    children,
    compact,
    maxCount = 99,
    offset,
    outline = true,
    placement = 'topEnd',
    shape,
    style,
    invisible,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, prefix, merge } = useStyles(classPrefix);
  const text = typeof content === 'number' && content > maxCount ? `${maxCount}+` : content;
  const isOneChar = useMemo(() => String(content)?.length === 1, [content]);

  const classes = merge(
    className,
    withPrefix(isPresetColor(color) && color, shape, {
      compact,
      outline,
      'one-char': isOneChar,
      hidden: invisible,
      wrapper: children,
      independent: !children,
      [kebabCase(placement)]: children
    })
  );

  const styles = useMemo(
    () =>
      mergeStyles(
        style,
        createOffsetStyles(offset, '--rs-badge-offset'),
        createColorVariables(color, '--rs-badge-bg')
      ),
    [style, offset, color]
  );

  if (!children) {
    return (
      <Box as={as} ref={ref} className={classes} style={styles} {...rest}>
        {text}
      </Box>
    );
  }
  return (
    <Box as={as} ref={ref} className={classes} style={styles} {...rest}>
      {children}
      <div className={prefix('content')}>{text}</div>
    </Box>
  );
});

Badge.displayName = 'Badge';

export default Badge;
