import React from 'react';
import StyledBox from '@/internals/StyledBox';
import { forwardRef, getSizeStyle, mergeStyles } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import type { Size, Color } from '@/internals/types';
import type { BoxProps } from '@/internals/Box';

export interface DividerProps extends BoxProps {
  /**
   * The appearance of the divider.
   */
  appearance?: 'solid' | 'dashed' | 'dotted';

  /**
   * The content of the label.
   */
  label?: React.ReactNode;

  /**
   * The placement of the label.
   * @version 6.0.0
   */
  labelPlacement?: 'start' | 'center' | 'end';

  /**
   * Vertical dividing line. Cannot be used with label.
   */
  vertical?: boolean;

  /**
   * The size of the divider.
   */
  size?: Size | number | string;

  /**
   * The color of the divider.
   */
  color?: Color | React.CSSProperties['color'];

  /**
   * The spacing between the divider and its content.
   */
  spacing?: Size | number | string;
}

/**
 * The Divider component is used to separate content.
 * @see https://rsuitejs.com/components/divider
 */
const Divider = forwardRef<'div', DividerProps>((props: DividerProps, ref) => {
  const { propsWithDefaults } = useCustom('Divider', props);
  const {
    as,
    appearance,
    className,
    classPrefix = 'divider',
    children,
    color,
    label = children,
    labelPlacement,
    vertical,
    spacing,
    style,
    size,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const styles = mergeStyles(style, getSizeStyle(spacing, 'divider', 'spacing'));

  return (
    <StyledBox
      as={as}
      name="divider"
      role="separator"
      ref={ref}
      className={classes}
      style={styles}
      size={size}
      color={color}
      data-appearance={appearance}
      data-orientation={vertical ? 'vertical' : 'horizontal'}
      data-with-label={label ? 'true' : undefined}
      data-placement={labelPlacement}
      {...rest}
    >
      {label}
    </StyledBox>
  );
});

Divider.displayName = 'Divider';

export default Divider;
