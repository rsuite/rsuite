import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '@/internals/types';
import { oneOf } from '@/internals/propTypes';

const fontSizeMap = { sm: 12, md: 14, lg: 16, xl: 18, xxl: 20 };

export interface TextProps extends WithAsProps {
  /**
   * The font color of the text.
   */
  color?: TypeAttributes.Color;

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
const Text: RsRefForwardingComponent<'p', TextProps> = React.forwardRef((props: TextProps, ref) => {
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
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix(color, align, weight, transform, { muted, ellipsis: maxLines })
  );

  const styles = {
    fontSize: fontSizeMap[size as keyof typeof fontSizeMap] || size,
    ...(maxLines ? { WebkitLineClamp: maxLines } : null),
    ...style
  };

  return <Component {...rest} ref={ref} className={classes} style={styles} />;
});

Text.displayName = 'Text';
Text.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  as: PropTypes.elementType,
  size: PropTypes.oneOfType([PropTypes.number, oneOf(['sm', 'md', 'lg', 'xl', 'xxl'])]),
  muted: PropTypes.bool,
  transform: oneOf(['uppercase', 'lowercase', 'capitalize']),
  align: oneOf(['left', 'center', 'right', 'justify']),
  weight: oneOf(['thin', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold']),
  maxLines: PropTypes.number
};

export default Text;
