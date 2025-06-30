import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles, useCustom } from '@/internals/hooks';
import { forwardRef, mergeStyles, getSizeStyle } from '@/internals/utils';
import { TextSize } from '@/internals/types';

export interface TextProps extends BoxProps {
  /**
   * The font color of the text.
   * Accepts preset colors or CSS color values
   */
  color?: BoxProps['c'];

  /**
   * The font size of the text.
   */
  size?: TextSize | number | string;

  /**
   * To set the text to be muted.
   */
  muted?: boolean;

  /**
   * To set the text transformation of the element.
   */
  transform?: 'uppercase' | 'lowercase' | 'capitalize';

  /**
   * To set the text alignment of the element
   */
  align?: 'left' | 'center' | 'right' | 'justify';

  /**
   * The font weight of the text.
   * @default 'regular'
   */
  weight?: 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';

  /**
   * The number of lines to limit the provided text to. Text will be truncated with an ellipsis.
   */
  maxLines?: number;
}

/**
 *
 * The `Text` component is used to display text.
 *
 * @see https://rsuitejs.com/components/text
 */
const Text = forwardRef<'p', TextProps>((props: TextProps, ref) => {
  const { propsWithDefaults } = useCustom('Text', props);
  const {
    as = 'p',
    align,
    classPrefix = 'text',
    color,
    className,
    maxLines,
    weight,
    muted,
    transform,
    size,
    style,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, cssVar, merge } = useStyles(classPrefix);
  const classes = merge(
    className,
    withPrefix(align, weight, transform, {
      muted,
      ellipsis: maxLines
    })
  );

  const styles = mergeStyles(style, getSizeStyle(size, 'font'), cssVar('max-lines', maxLines));

  return <Box as={as} c={color} ref={ref} className={classes} style={styles} {...rest} />;
});

Text.displayName = 'Text';

export default Text;
