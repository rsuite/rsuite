import React, { useMemo } from 'react';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef, mergeStyles, isPresetColor, createColorVariables } from '@/internals/utils';
import type { WithAsProps, Color } from '@/internals/types';

const fontSizeMap = { sm: 12, md: 14, lg: 16, xl: 18, xxl: 20 };

export interface TextProps extends WithAsProps {
  /**
   * The font color of the text.
   * Accepts preset colors or CSS color values
   */
  color?: Color | React.CSSProperties['color'];

  /**
   * The font size of the text.
   */
  size?: keyof typeof fontSizeMap | number | string;

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
    as: Component = 'p',
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

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix(isPresetColor(color) && color, align, weight, transform, {
      muted,
      ellipsis: maxLines
    })
  );

  const styles = useMemo(
    () =>
      mergeStyles(
        {
          fontSize: fontSizeMap[size as keyof typeof fontSizeMap] || size,
          ...(maxLines ? { WebkitLineClamp: maxLines } : null)
        },
        createColorVariables(color, '--rs-text-color'),
        style
      ),
    [style, color, size, maxLines]
  );

  return <Component {...rest} ref={ref} className={classes} style={styles} />;
});

Text.displayName = 'Text';

export default Text;
