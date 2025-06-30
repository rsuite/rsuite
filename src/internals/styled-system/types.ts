import { CSSProperties as CSS } from 'react';
import type { WithResponsive, ColorScheme, Size } from '@/internals/types';

export type CSSPropertyValueType = 'string' | 'number' | 'any';

export type CSSProperty = {
  /**
   * CSS Property Type
   */
  type: CSSPropertyValueType;

  /**
   * CSS Property
   */
  property: string;

  /**
   * Value Transformer
   */
  transformer?: (value: any) => any;
};

/**
 * CSS Properties type for Box component
 * This type maps all the CSS properties defined in cssSystemPropAlias to their corresponding React CSS types
 */
export interface CSSSystemProps {
  /** Shorthand for CSS property `padding` */
  p?: WithResponsive<CSS['padding']>;
  /** Shorthand for CSS property `paddingTop` */
  pt?: WithResponsive<CSS['paddingTop']>;
  /** Shorthand for CSS property `paddingRight` */
  pr?: WithResponsive<CSS['paddingRight']>;
  /** Shorthand for CSS property `paddingBottom` */
  pb?: WithResponsive<CSS['paddingBottom']>;
  /** Shorthand for CSS property `paddingLeft` */
  pl?: WithResponsive<CSS['paddingLeft']>;
  /** Shorthand for CSS property `paddingInline` */
  px?: WithResponsive<CSS['paddingInline']>;
  /** Shorthand for CSS property `paddingBlock` */
  py?: WithResponsive<CSS['paddingBlock']>;
  /** Shorthand for CSS property `paddingInlineStart` */
  ps?: WithResponsive<CSS['paddingInlineStart']>;
  /** Shorthand for CSS property `paddingInlineEnd` */
  pe?: WithResponsive<CSS['paddingInlineEnd']>;

  // Margin
  /** Shorthand for CSS property `margin` */
  m?: WithResponsive<CSS['margin']>;
  /** Shorthand for CSS property `marginTop` */
  mt?: WithResponsive<CSS['marginTop']>;
  /** Shorthand for CSS property `marginRight` */
  mr?: WithResponsive<CSS['marginRight']>;
  /** Shorthand for CSS property `marginBottom` */
  mb?: WithResponsive<CSS['marginBottom']>;
  /** Shorthand for CSS property `marginLeft` */
  ml?: WithResponsive<CSS['marginLeft']>;
  /** Shorthand for CSS property `marginInline` */
  mx?: WithResponsive<CSS['marginInline']>;
  /** Shorthand for CSS property `marginBlock` */
  my?: WithResponsive<CSS['marginBlock']>;
  /** Shorthand for CSS property `marginInlineStart` */
  ms?: WithResponsive<CSS['marginInlineStart']>;
  /** Shorthand for CSS property `marginInlineEnd` */
  me?: WithResponsive<CSS['marginInlineEnd']>;

  // Sizing
  /** Shorthand for CSS property `width` */
  w?: WithResponsive<CSS['width']>;
  /** Shorthand for CSS property `height` */
  h?: WithResponsive<CSS['height']>;
  /** Shorthand for CSS property `minWidth` */
  minw?: WithResponsive<CSS['minWidth']>;
  /** Shorthand for CSS property `maxWidth` */
  maxw?: WithResponsive<CSS['maxWidth']>;
  /** Shorthand for CSS property `minHeight` */
  minh?: WithResponsive<CSS['minHeight']>;
  /** Shorthand for CSS property `maxHeight` */
  maxh?: WithResponsive<CSS['maxHeight']>;

  // Layout & Position
  /** Shorthand for CSS property `display` */
  display?: WithResponsive<CSS['display']>;
  /** Shorthand for CSS property `position` */
  pos?: WithResponsive<CSS['position']>;
  /** Shorthand for CSS property `left` */
  left?: WithResponsive<CSS['left']>;
  /** Shorthand for CSS property `top` */
  top?: WithResponsive<CSS['top']>;
  /** Shorthand for CSS property `right` */
  right?: WithResponsive<CSS['right']>;
  /** Shorthand for CSS property `bottom` */
  bottom?: WithResponsive<CSS['bottom']>;
  /** Shorthand for CSS property `inset` */
  inset?: WithResponsive<CSS['inset']>;
  /** Shorthand for CSS property `insetInline` */
  insetx?: WithResponsive<CSS['insetInline']>;
  /** Shorthand for CSS property `insetBlock` */
  insety?: WithResponsive<CSS['insetBlock']>;
  /** Shorthand for CSS property `boxSizing` */
  bsz?: WithResponsive<CSS['boxSizing']>;
  /** Shorthand for CSS property `zIndex` */
  z?: WithResponsive<CSS['zIndex']>;

  // Background
  /** Shorthand for CSS property `background` */
  bg?: WithResponsive<ColorScheme | CSS['background']>;
  /** Shorthand for CSS property `backgroundColor` */
  bgc?: WithResponsive<ColorScheme | CSS['backgroundColor']>;
  /** Shorthand for CSS property `backgroundImage` */
  bgi?: WithResponsive<CSS['backgroundImage']>;
  /** Shorthand for CSS property `backgroundAttachment` */
  bga?: WithResponsive<CSS['backgroundAttachment']>;
  /** Shorthand for CSS property `backgroundPosition` */
  bgp?: WithResponsive<CSS['backgroundPosition']>;
  /** Shorthand for CSS property `backgroundSize` */
  bgsz?: WithResponsive<CSS['backgroundSize']>;
  /** Shorthand for CSS property `backgroundRepeat` */
  bgr?: WithResponsive<CSS['backgroundRepeat']>;

  // Typography
  /** Shorthand for CSS property `color` */
  c?: WithResponsive<ColorScheme | CSS['color']>;
  /** Shorthand for CSS property `fontFamily` */
  ff?: WithResponsive<CSS['fontFamily']>;
  /** Shorthand for CSS property `fontSize` */
  fs?: WithResponsive<CSS['fontSize']>;
  /** Shorthand for CSS property `fontWeight` */
  fw?: WithResponsive<CSS['fontWeight']>;
  /** Shorthand for CSS property `textAlign` */
  ta?: WithResponsive<CSS['textAlign']>;
  /** Shorthand for CSS property `textTransform` */
  tt?: WithResponsive<CSS['textTransform']>;
  /** Shorthand for CSS property `textDecoration` */
  td?: WithResponsive<CSS['textDecoration']>;
  /** Shorthand for CSS property `textDecorationStyle` */
  tds?: WithResponsive<CSS['textDecorationStyle']>;
  /** Shorthand for CSS property `textDecorationColor` */
  tdc?: WithResponsive<ColorScheme | CSS['textDecorationColor']>;
  /** Shorthand for CSS property `letterSpacing` */
  lts?: WithResponsive<CSS['letterSpacing']>;
  /** Shorthand for CSS property `lineHeight` */
  lh?: WithResponsive<CSS['lineHeight']>;

  // Border
  /** Shorthand for CSS property `border` */
  bd?: WithResponsive<CSS['border']>;
  /** Shorthand for CSS property `borderStyle` */
  bs?: WithResponsive<CSS['borderStyle']>;
  /** Shorthand for CSS property `borderColor` */
  bc?: WithResponsive<ColorScheme | CSS['borderColor']>;
  /** Shorthand for CSS property `borderWidth` */
  bw?: WithResponsive<CSS['borderWidth']>;
  /** Shorthand for CSS property `borderTop` */
  bdt?: WithResponsive<CSS['borderTop']>;
  /** Shorthand for CSS property `borderBottom` */
  bdb?: WithResponsive<CSS['borderBottom']>;
  /** Shorthand for CSS property `borderLeft` */
  bdl?: WithResponsive<CSS['borderLeft']>;
  /** Shorthand for CSS property `borderRight` */
  bdr?: WithResponsive<CSS['borderRight']>;
  /** Shorthand for CSS property `borderTopStyle` */
  bdts?: WithResponsive<CSS['borderTopStyle']>;
  /** Shorthand for CSS property `borderBottomStyle` */
  bdbs?: WithResponsive<CSS['borderBottomStyle']>;
  /** Shorthand for CSS property `borderLeftStyle` */
  bdls?: WithResponsive<CSS['borderLeftStyle']>;
  /** Shorthand for CSS property `borderRightStyle` */
  bdrs?: WithResponsive<CSS['borderRightStyle']>;
  /** Shorthand for CSS property `borderTopColor` */
  bdtc?: WithResponsive<ColorScheme | CSS['borderTopColor']>;
  /** Shorthand for CSS property `borderBottomColor` */
  bdbc?: WithResponsive<ColorScheme | CSS['borderBottomColor']>;
  /** Shorthand for CSS property `borderLeftColor` */
  bdlc?: WithResponsive<ColorScheme | CSS['borderLeftColor']>;
  /** Shorthand for CSS property `borderRightColor` */
  bdrc?: WithResponsive<ColorScheme | CSS['borderRightColor']>;
  /** Shorthand for CSS property `borderTopWidth` */
  bdtw?: WithResponsive<CSS['borderTopWidth']>;
  /** Shorthand for CSS property `borderBottomWidth` */
  bdbw?: WithResponsive<CSS['borderBottomWidth']>;
  /** Shorthand for CSS property `borderLeftWidth` */
  bdlw?: WithResponsive<CSS['borderLeftWidth']>;
  /** Shorthand for CSS property `borderRightWidth` */
  bdrw?: WithResponsive<CSS['borderRightWidth']>;
  /** Shorthand for CSS property `borderRadius` */
  rounded?: WithResponsive<Size | CSS['borderRadius'] | 'full'>;

  // Shadow & Effects
  /** Shorthand for CSS property `boxShadow` */
  shadow?: WithResponsive<Size | CSS['boxShadow']>;
  /** CSS property `opacity` */
  opacity?: WithResponsive<CSS['opacity']>;

  // Flex
  /** Shorthand for CSS property `gap` */
  spacing?: WithResponsive<CSS['gap']>;
  /** CSS property `gap` */
  gap?: WithResponsive<CSS['gap']>;
  /** CSS property `rowGap` */
  rowgap?: WithResponsive<CSS['rowGap']>;
  /** CSS property `columnGap` */
  colgap?: WithResponsive<CSS['columnGap']>;
  /** Shorthand for CSS property `alignItems` */
  align?: WithResponsive<CSS['alignItems']>;
  /** Shorthand for CSS property `justifyContent` */
  justify?: WithResponsive<CSS['justifyContent']>;
  /** Shorthand for CSS property `alignSelf` */
  self?: WithResponsive<CSS['alignSelf']>;
  /** Shorthand for CSS property `flexBasis` */
  basis?: WithResponsive<CSS['flexBasis']>;
  /** Shorthand for CSS property `flex` */
  flex?: WithResponsive<CSS['flex']>;
  /** Shorthand for CSS property `flexGrow` */
  grow?: WithResponsive<CSS['flexGrow']>;
  /** Shorthand for CSS property `order` */
  order?: WithResponsive<CSS['order']>;
  /** Shorthand for CSS property `flexShrink` */
  shrink?: WithResponsive<CSS['flexShrink']>;
}
