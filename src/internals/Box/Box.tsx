import React, { CSSProperties as CSS } from 'react';
import isEmpty from 'lodash/isEmpty';
import { forwardRef } from '@/internals/utils/react/forwardRef';
import { getBoxCSSVariables, extractBoxProps, omitBoxProps } from './utils';
import { useStyled } from '@/internals/hooks/useStyled';
import type {
  WithAsProps,
  Breakpoints,
  ResponsiveValue,
  ColorScheme,
  Size
} from '@/internals/types';

export interface BoxProps extends WithAsProps {
  /** Breakpoint below which the component is shown with `display: block` */
  showFrom?: Breakpoints;

  /** Breakpoint above which the component is hidden with `display: none` */
  hideFrom?: Breakpoints;

  /** Display property */
  display?: CSS['display'] | ResponsiveValue<CSS['display']>;

  /** Padding */
  p?: CSS['padding'] | ResponsiveValue<CSS['padding']>;
  pt?: CSS['paddingTop'] | ResponsiveValue<CSS['paddingTop']>;
  pb?: CSS['paddingBottom'] | ResponsiveValue<CSS['paddingBottom']>;
  pl?: CSS['paddingLeft'] | ResponsiveValue<CSS['paddingLeft']>;
  pr?: CSS['paddingRight'] | ResponsiveValue<CSS['paddingRight']>;
  px?: CSS['paddingInline'] | ResponsiveValue<CSS['paddingInline']>;
  py?: CSS['paddingBlock'] | ResponsiveValue<CSS['paddingBlock']>;

  /** Margin */
  m?: CSS['margin'] | ResponsiveValue<CSS['margin']>;
  mt?: CSS['marginTop'] | ResponsiveValue<CSS['marginTop']>;
  mb?: CSS['marginBottom'] | ResponsiveValue<CSS['marginBottom']>;
  ml?: CSS['marginLeft'] | ResponsiveValue<CSS['marginLeft']>;
  mr?: CSS['marginRight'] | ResponsiveValue<CSS['marginRight']>;
  mx?: CSS['marginInline'] | ResponsiveValue<CSS['marginInline']>;
  my?: CSS['marginBlock'] | ResponsiveValue<CSS['marginBlock']>;

  /** Box size */
  w?: CSS['width'] | ResponsiveValue<CSS['width']>;
  h?: CSS['height'] | ResponsiveValue<CSS['height']>;
  minw?: CSS['minWidth'] | ResponsiveValue<CSS['minWidth']>;
  maxw?: CSS['maxWidth'] | ResponsiveValue<CSS['maxWidth']>;
  minh?: CSS['minHeight'] | ResponsiveValue<CSS['minHeight']>;
  maxh?: CSS['maxHeight'] | ResponsiveValue<CSS['maxHeight']>;

  /** Box Color */
  c?: ColorScheme | CSS['color'] | ResponsiveValue<ColorScheme | CSS['color']>;

  /** Box Border */
  bd?: CSS['border'] | ResponsiveValue<CSS['border']>;

  /** Box Background */
  bg?: ColorScheme | CSS['backgroundColor'] | ResponsiveValue<ColorScheme | CSS['backgroundColor']>;

  /** Box Border Radius */
  rounded?:
    | Size
    | CSS['borderRadius']
    | 'full'
    | ResponsiveValue<Size | CSS['borderRadius'] | 'full'>;

  /** Box Shadow */
  shadow?: Size | CSS['boxShadow'] | ResponsiveValue<Size | CSS['boxShadow']>;
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
