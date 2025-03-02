import React from 'react';
import Box, { BoxProps } from '../Box';
import { forwardRef, mergeStyles, getSizeStyle, getColorStyle } from '@/internals/utils';
import type { SizeType, ColorType } from '@/internals/types';

export interface StyledBoxProps extends BoxProps {
  /** Name of the Box */
  name: string;

  /** Size of the Box */
  size?: SizeType | number | string;

  /** Color of the Box */
  color?: ColorType | React.CSSProperties['color'];
}

const StyledBox = forwardRef<'div', StyledBoxProps>((props, ref) => {
  const { as, color, name, style, size, ...rest } = props;
  const boxStyle = mergeStyles(style, getSizeStyle(size, name), getColorStyle(color, name));

  return <Box as={as} ref={ref} style={boxStyle} {...rest} />;
});

StyledBox.displayName = 'StyledBox';

export default StyledBox;
