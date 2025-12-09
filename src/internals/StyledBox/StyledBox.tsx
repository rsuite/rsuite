import React from 'react';
import Box, { BoxProps } from '../Box';
import { forwardRef, mergeStyles, getSizeStyle, getColorStyle } from '@/internals/utils';
import type { Size, Color } from '@/internals/types';

export interface StyledBoxProps extends BoxProps {
  /** Component identifier for CSS variable generation */
  name: string;

  /** Size of the Box */
  size?: Size | number | string;

  /** Color of the Box */
  color?: Color | React.CSSProperties['color'];
}

const StyledBox = forwardRef<'div', StyledBoxProps>((props, ref) => {
  const { as, color, name: componentName, style, size, ...rest } = props;
  const boxStyle = mergeStyles(
    style,
    getSizeStyle(size, componentName),
    getColorStyle(color, componentName)
  );

  return <Box as={as} ref={ref} style={boxStyle} {...rest} />;
});

StyledBox.displayName = 'StyledBox';

export default StyledBox;
