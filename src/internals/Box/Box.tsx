import React, { CSSProperties as CSS } from 'react';
import isEmpty from 'lodash/isEmpty';
import { mergeStyles } from '@/internals/utils';
import { forwardRef } from '@/internals/utils/forwardRef';
import { getBoxCSSVariables, extractBoxProps, omitBoxProps } from './utils';
import type { WithAsProps, Breakpoints, ColorScheme, Size } from '@/internals/types';

export interface BoxProps extends WithAsProps {
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
  const { as: Component = 'div', className, children, visible, hidden, style, ...rest } = props;

  const boxProps = extractBoxProps(rest);
  const domProps = omitBoxProps(rest);
  const boxCSSVars = getBoxCSSVariables(boxProps);
  const boxStyle = mergeStyles(style, boxCSSVars);
  const isBox = !isEmpty(boxCSSVars) || visible || hidden;

  return (
    <Component
      ref={ref}
      data-rs={isBox ? 'box' : undefined}
      data-visible-from={visible}
      data-hidden-from={hidden}
      className={className}
      style={boxStyle}
      {...domProps}
    >
      {children}
    </Component>
  );
});

Box.displayName = 'Box';

export default Box;
