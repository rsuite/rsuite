import React, { CSSProperties as CSS } from 'react';
import isEmpty from 'lodash/isEmpty';
import { forwardRef } from '@/internals/utils/react/forwardRef';
import { getBoxCSSVariables, extractBoxProps, omitBoxProps } from './utils';
import type { WithAsProps, Breakpoints, ColorScheme, Size } from '@/internals/types';
import useStyled from '@/internals/hooks/useStyled';

export interface BoxProps extends WithAsProps {
  /** Breakpoint below which the component is shown with `display: block` */
  showFrom?: Breakpoints;

  /** Breakpoint above which the component is hidden with `display: none` */
  hideFrom?: Breakpoints;

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
  minw?: CSS['minWidth'];
  maxw?: CSS['maxWidth'];
  minh?: CSS['minHeight'];
  maxh?: CSS['maxHeight'];

  /** Box Color */
  c?: ColorScheme | CSS['color'];

  /** Box Border */
  bd?: CSS['border'];

  /** Box Background */
  bg?: ColorScheme | CSS['backgroundColor'];

  /** Box Border Radius */
  rounded?: Size | CSS['borderRadius'] | 'full';

  /** Box Shadow */
  shadow?: Size | CSS['boxShadow'];
}

/**
 * Box component is the base component for all components,
 * providing shorthand for style properties.
 *
 * @see https://rsuitejs.com/components/box
 */
const Box = forwardRef<'div', BoxProps>((props, ref) => {
  const { as: Component = 'div', className, children, showFrom, hideFrom, style, ...rest } = props;

  const boxProps = extractBoxProps(rest);
  const domProps = omitBoxProps(rest);
  const boxCSSVars = getBoxCSSVariables(boxProps);
  const isBox = !isEmpty(boxCSSVars) || showFrom || hideFrom;

  const styled = useStyled({
    cssVars: boxCSSVars,
    className,
    style,
    enabled: isBox,
    prefix: 'rs-box'
  });

  return (
    <Component
      ref={ref}
      data-rs={isBox ? 'box' : undefined}
      data-visible-from={showFrom}
      data-hidden-from={hideFrom}
      className={styled.className}
      style={styled.style}
      {...domProps}
    >
      {children}
    </Component>
  );
});

Box.displayName = 'Box';

export default Box;
