import { getSizeValue, getColorValue } from '@/internals/utils';
import type { CSSSystemProps, CSSProperty } from './types';

/**
 * CSS Property Map
 * Maps shorthand property names to their corresponding CSS properties
 */
export const cssPropertyMap: Record<keyof CSSSystemProps, CSSProperty> = {
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
  insetx: { type: 'position', property: 'inset-inline' },
  insety: { type: 'position', property: 'inset-block' },
  boxsizing: { type: 'position', property: 'box-sizing' },

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
  tds: { type: 'typography', property: 'text-decoration-style' },
  tdc: { type: 'typography', property: 'text-decoration-color', transformer: getColorValue },
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
  gap: { type: 'flex', property: 'gap' },
  spacing: { type: 'flex', property: 'gap' }, // alias for gap
  rowgap: { type: 'flex', property: 'row-gap' },
  colgap: { type: 'flex', property: 'column-gap' },
  align: { type: 'flex', property: 'align-items' },
  justify: { type: 'flex', property: 'justify-content' }
};
