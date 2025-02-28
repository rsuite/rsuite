import React from 'react';
import { forwardRef, mergeStyles, getSizeStyle, getColorStyle } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, Breakpoints, SizeType, ColorType } from '@/internals/types';

export interface BoxProps extends WithAsProps {
  /** Name of the Box */
  name?: string;

  /** Display element */
  visible?: Breakpoints;

  /** Hide element */
  hidden?: Breakpoints;

  /** Display property */
  display?: React.CSSProperties['display'];

  /** Size of the Box */
  size?: SizeType | number | string;

  /** Color of the Box */
  color?: ColorType | React.CSSProperties['color'];

  /** Override the 'as' prop when Box is used as a base component */
  componentAs?: WithAsProps['as'];
}

const Box = forwardRef<'div', BoxProps>((props, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'box',
    className,
    children,
    color,
    componentAs,
    display,
    visible,
    hidden,
    name = 'box',
    style,
    size,
    ...rest
  } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix({
      [`visible-${visible}`]: visible,
      [`hidden-${hidden}`]: hidden
    })
  );

  const boxStyle = mergeStyles(style, getSizeStyle(size, name), getColorStyle(color, name), {
    '--rs-box-display': display
  });

  const FinalComponent = componentAs || Component;

  return (
    <FinalComponent ref={ref} className={classes} style={boxStyle} {...rest}>
      {children}
    </FinalComponent>
  );
});

Box.displayName = 'Box';

export default Box;
