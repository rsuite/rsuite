import { CSSProperties as CSS } from 'react';
import { getSizeValue, getColorValue } from '@/internals/utils';
import type { WithResponsive, ColorScheme, Size } from '@/internals/types';

type CSSPropertyGroup =
  | 'spacing'
  | 'sizing'
  | 'layout'
  | 'color'
  | 'border'
  | 'effect'
  | 'flex'
  | 'radius'
  | 'typography'
  | 'position'
  | 'background';

type CSSProperty = {
  /**
   * CSS Property Type
   */
  type: CSSPropertyGroup;

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
 * This type maps all the CSS properties defined in cssPropertyMap to their corresponding React CSS types
 */
export type CSSSystemProps = {
  // Spacing
  p?: WithResponsive<CSS['padding']>;
  pt?: WithResponsive<CSS['paddingTop']>;
  pr?: WithResponsive<CSS['paddingRight']>;
  pb?: WithResponsive<CSS['paddingBottom']>;
  pl?: WithResponsive<CSS['paddingLeft']>;
  px?: WithResponsive<CSS['paddingInline']>;
  py?: WithResponsive<CSS['paddingBlock']>;
  ps?: WithResponsive<CSS['paddingInlineStart']>;
  pe?: WithResponsive<CSS['paddingInlineEnd']>;

  // Margin
  m?: WithResponsive<CSS['margin']>;
  mt?: WithResponsive<CSS['marginTop']>;
  mr?: WithResponsive<CSS['marginRight']>;
  mb?: WithResponsive<CSS['marginBottom']>;
  ml?: WithResponsive<CSS['marginLeft']>;
  mx?: WithResponsive<CSS['marginInline']>;
  my?: WithResponsive<CSS['marginBlock']>;
  ms?: WithResponsive<CSS['marginInlineStart']>;
  me?: WithResponsive<CSS['marginInlineEnd']>;

  // Sizing
  w?: WithResponsive<CSS['width']>;
  h?: WithResponsive<CSS['height']>;
  minw?: WithResponsive<CSS['minWidth']>;
  maxw?: WithResponsive<CSS['maxWidth']>;
  minh?: WithResponsive<CSS['minHeight']>;
  maxh?: WithResponsive<CSS['maxHeight']>;

  // Layout & Position
  display?: WithResponsive<CSS['display']>;
  pos?: WithResponsive<CSS['position']>;
  position?: WithResponsive<CSS['position']>;
  left?: WithResponsive<CSS['left']>;
  top?: WithResponsive<CSS['top']>;
  right?: WithResponsive<CSS['right']>;
  bottom?: WithResponsive<CSS['bottom']>;
  inset?: WithResponsive<CSS['inset']>;
  insetX?: WithResponsive<CSS['insetInline']>;
  insetY?: WithResponsive<CSS['insetBlock']>;

  // Background
  bg?: WithResponsive<ColorScheme | CSS['background']>;
  bgc?: WithResponsive<ColorScheme | CSS['backgroundColor']>;
  bgi?: WithResponsive<CSS['backgroundImage']>;
  bga?: WithResponsive<CSS['backgroundAttachment']>;
  bgp?: WithResponsive<CSS['backgroundPosition']>;
  bgsz?: WithResponsive<CSS['backgroundSize']>;
  bgr?: WithResponsive<CSS['backgroundRepeat']>;

  // Typography
  c?: WithResponsive<ColorScheme | CSS['color']>;
  ff?: WithResponsive<CSS['fontFamily']>;
  fs?: WithResponsive<CSS['fontSize']>;
  fw?: WithResponsive<CSS['fontWeight']>;
  ta?: WithResponsive<CSS['textAlign']>;
  tt?: WithResponsive<CSS['textTransform']>;
  td?: WithResponsive<CSS['textDecoration']>;
  lts?: WithResponsive<CSS['letterSpacing']>;
  lh?: WithResponsive<CSS['lineHeight']>;

  // Border
  bd?: WithResponsive<CSS['border']>;
  bs?: WithResponsive<CSS['borderStyle']>;
  bc?: WithResponsive<ColorScheme | CSS['borderColor']>;
  bw?: WithResponsive<CSS['borderWidth']>;

  // Radius
  rounded?: WithResponsive<Size | CSS['borderRadius'] | 'full'>;

  // Shadow & Effects
  shadow?: WithResponsive<Size | CSS['boxShadow']>;
  opacity?: WithResponsive<CSS['opacity']>;

  // Flex
  spacing?: WithResponsive<CSS['gap']>;
  gap?: WithResponsive<CSS['gap']>;
  align?: WithResponsive<CSS['alignItems']>;
  justify?: WithResponsive<CSS['justifyContent']>;
};

/**
 * CSS Property Map
 * Maps shorthand property names to their corresponding CSS properties
 */
export const cssPropertyMap: Record<string, CSSProperty> = {
  // Spacing
  p: { type: 'spacing', property: 'padding' },
  pt: { type: 'spacing', property: 'padding-top' },
  pr: { type: 'spacing', property: 'padding-right' },
  pb: { type: 'spacing', property: 'padding-bottom' },
  pl: { type: 'spacing', property: 'padding-left' },
  px: { type: 'spacing', property: 'padding-inline' },
  py: { type: 'spacing', property: 'padding-block' },
  ps: { type: 'spacing', property: 'padding-inline-start' },
  pe: { type: 'spacing', property: 'padding-inline-end' },
  m: { type: 'spacing', property: 'margin' },
  mt: { type: 'spacing', property: 'margin-top' },
  mr: { type: 'spacing', property: 'margin-right' },
  mb: { type: 'spacing', property: 'margin-bottom' },
  ml: { type: 'spacing', property: 'margin-left' },
  mx: { type: 'spacing', property: 'margin-inline' },
  my: { type: 'spacing', property: 'margin-block' },
  ms: { type: 'spacing', property: 'margin-inline-start' },
  me: { type: 'spacing', property: 'margin-inline-end' },

  // Sizing
  w: { type: 'sizing', property: 'width' },
  h: { type: 'sizing', property: 'height' },
  minw: { type: 'sizing', property: 'min-width' },
  maxw: { type: 'sizing', property: 'max-width' },
  minh: { type: 'sizing', property: 'min-height' },
  maxh: { type: 'sizing', property: 'max-height' },

  // Layout & Position
  display: { type: 'layout', property: 'display' },
  pos: { type: 'position', property: 'position' },
  left: { type: 'position', property: 'left' },
  top: { type: 'position', property: 'top' },
  right: { type: 'position', property: 'right' },
  bottom: { type: 'position', property: 'bottom' },
  inset: { type: 'position', property: 'inset' },
  insetX: { type: 'position', property: 'inset-inline' },
  insetY: { type: 'position', property: 'inset-block' },
  boxSizing: { type: 'position', property: 'box-sizing' },

  // Background
  bg: { type: 'background', property: 'background', transformer: getColorValue },
  bgc: { type: 'background', property: 'background-color', transformer: getColorValue },
  bgi: { type: 'background', property: 'background-image' },
  bga: { type: 'background', property: 'background-attachment' },
  bgp: { type: 'background', property: 'background-position' },
  bgsz: { type: 'background', property: 'background-size' },
  bgr: { type: 'background', property: 'background-repeat' },

  // Typography
  c: { type: 'typography', property: 'color', transformer: getColorValue },
  ff: { type: 'typography', property: 'font-family' },
  fs: { type: 'typography', property: 'font-size' },
  fw: { type: 'typography', property: 'font-weight' },
  ta: { type: 'typography', property: 'text-align' },
  tt: { type: 'typography', property: 'text-transform' },
  td: { type: 'typography', property: 'text-decoration' },
  lts: { type: 'typography', property: 'letter-spacing' },
  lh: { type: 'typography', property: 'line-height' },

  // Border
  bd: { type: 'border', property: 'border' },
  bs: { type: 'border', property: 'border-style' },
  bc: { type: 'border', property: 'border-color', transformer: getColorValue },
  bw: { type: 'border', property: 'border-width' },

  // Radius
  rounded: {
    type: 'radius',
    property: 'border-radius',
    transformer: (value: string) => getSizeValue('radius', value)
  },

  // Shadow & Effects
  shadow: {
    type: 'effect',
    property: 'box-shadow',
    transformer: (value: string) => getSizeValue('shadow', value)
  },
  opacity: { type: 'effect', property: 'opacity' },

  // flex
  spacing: { type: 'flex', property: 'gap' },
  gap: { type: 'flex', property: 'gap' },
  align: { type: 'flex', property: 'align-items' },
  justify: { type: 'flex', property: 'justify-content' }
};
