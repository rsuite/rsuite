import React, { CSSProperties as CSS } from 'react';
import isEmpty from 'lodash/isEmpty';
import { forwardRef } from '@/internals/utils/react/forwardRef';
import { getBoxCSSVariables, extractBoxProps, omitBoxProps } from './utils';
import { useStyled } from '@/internals/styled-system';
import type {
  WithAsProps,
  Breakpoints,
  WithResponsive,
  ColorScheme,
  Size
} from '@/internals/types';

export interface BoxProps extends WithAsProps {
  /** Breakpoint below which the component is shown with `display: block` */
  showFrom?: Breakpoints;

  /** Breakpoint above which the component is hidden with `display: none` */
  hideFrom?: Breakpoints;

  /** Display property */
  display?: WithResponsive<CSS['display']>;

  /** Padding */
  p?: WithResponsive<CSS['padding']>;
  pt?: WithResponsive<CSS['paddingTop']>;
  pb?: WithResponsive<CSS['paddingBottom']>;
  pl?: WithResponsive<CSS['paddingLeft']>;
  pr?: WithResponsive<CSS['paddingRight']>;
  px?: WithResponsive<CSS['paddingInline']>;
  py?: WithResponsive<CSS['paddingBlock']>;

  /** Margin */
  m?: WithResponsive<CSS['margin']>;
  mt?: WithResponsive<CSS['marginTop']>;
  mb?: WithResponsive<CSS['marginBottom']>;
  ml?: WithResponsive<CSS['marginLeft']>;
  mr?: WithResponsive<CSS['marginRight']>;
  mx?: WithResponsive<CSS['marginInline']>;
  my?: WithResponsive<CSS['marginBlock']>;

  /** Box size */
  w?: WithResponsive<CSS['width']>;
  h?: WithResponsive<CSS['height']>;
  minw?: WithResponsive<CSS['minWidth']>;
  maxw?: WithResponsive<CSS['maxWidth']>;
  minh?: WithResponsive<CSS['minHeight']>;
  maxh?: WithResponsive<CSS['maxHeight']>;

  /** Box Color */
  c?: WithResponsive<ColorScheme | CSS['color']>;

  /** Box Border */
  bd?: WithResponsive<CSS['border']>;

  /** Box Background */
  bg?: WithResponsive<ColorScheme | CSS['backgroundColor']>;

  /** Box Border Radius */
  rounded?: WithResponsive<Size | CSS['borderRadius'] | 'full'>;

  /** Box Shadow */
  shadow?: WithResponsive<Size | CSS['boxShadow']>;
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
    enabled: isBox
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
