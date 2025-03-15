import React from 'react';
import StyledBox from '@/internals/StyledBox';
import { forwardRef, getSizeStyle, mergeStyles } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, Size, Color } from '@/internals/types';

export interface DividerProps extends WithAsProps {
  /**
   * The appearance of the divider.
   */
  appearance?: 'solid' | 'dashed' | 'dotted';

  /**
   * The content of the label.
   */
  label?: React.ReactNode;

  /**
   * The position of the label.
   */
  labelPosition?: 'left' | 'right' | 'center';

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
    labelPosition,
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
      data-position={labelPosition}
      {...rest}
    >
      {label}
    </StyledBox>
  );
});

Divider.displayName = 'Divider';

export default Divider;
