import React, { CSSProperties as CSS } from 'react';
import { forwardRef, mergeStyles } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { getBoxCSSVariables, extractBoxProps, omitBoxProps } from './utils';
import type { WithAsProps, Breakpoints, ColorScheme, Size } from '@/internals/types';

export interface BoxProps extends WithAsProps {
  /** Override the 'as' prop when Box is used as a base component */
  componentAs?: WithAsProps['as'];

  /** Breakpoint below which the component is hidden with `display: none` */
  visible?: Breakpoints;

  /** Breakpoint above which the component is hidden with `display: none` */
  hidden?: Breakpoints;

  /** Display property */
  display?: CSS['display'];

  /** Padding */
  p?: CSS['padding'];
  pt?: CSS['paddingTop'];
  pb?: CSS['paddingBottom'];
  pl?: CSS['paddingLeft'];
  pr?: CSS['paddingRight'];
  px?: CSS['paddingInline'];
  py?: CSS['paddingBlock'];

  /** Margin */
  m?: CSS['margin'];
  mt?: CSS['marginTop'];
  mb?: CSS['marginBottom'];
  ml?: CSS['marginLeft'];
  mr?: CSS['marginRight'];
  mx?: CSS['marginInline'];
  my?: CSS['marginBlock'];

  /** Box size */
  w?: CSS['width'];
  h?: CSS['height'];

  /** Box Color */
  color?: ColorScheme | CSS['color'];

  /** Box Background */
  bg?: ColorScheme | CSS['backgroundColor'];

  /** Box Border Radius */
  rounded?: Size | CSS['borderRadius'] | 'full';

  /** Box Border */
  border?: CSS['border'];

  /** Box Shadow */
  shadow?: Size | CSS['boxShadow'];
}

const Box = forwardRef<'div', BoxProps>((props, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'box',
    className,
    children,
    visible,
    hidden,
    style,
    ...rest
  } = props;

  const boxProps = extractBoxProps(rest);
  const domProps = omitBoxProps(rest);

  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(
    className,
    withPrefix({ [`visible-from-${visible}`]: visible, [`hidden-from-${hidden}`]: hidden })
  );

  const boxCSSVars = getBoxCSSVariables(boxProps);
  const boxStyle = mergeStyles(style, boxCSSVars);

  return (
    <Component ref={ref} className={classes} style={boxStyle} {...domProps}>
      {children}
    </Component>
  );
});

Box.displayName = 'Box';

export default Box;
