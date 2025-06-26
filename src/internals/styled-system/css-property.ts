import { getSizeValue, getColorValue } from '@/internals/utils';
import type { CSSSystemProps, CSSProperty } from './types';

/**
 * CSS Property Alias
 * This type maps all the CSS properties defined in cssSystemPropAlias to their corresponding React CSS types
 */
export const cssSystemPropAlias: Record<keyof CSSSystemProps, CSSProperty> = {
  // — Spacing ————————————————————
  p: { type: 'any', property: 'padding' },
  pt: { type: 'any', property: 'padding-top' },
  pr: { type: 'any', property: 'padding-right' },
  pb: { type: 'any', property: 'padding-bottom' },
  pl: { type: 'any', property: 'padding-left' },
  px: { type: 'any', property: 'padding-inline' },
  py: { type: 'any', property: 'padding-block' },
  ps: { type: 'any', property: 'padding-inline-start' },
  pe: { type: 'any', property: 'padding-inline-end' },
  m: { type: 'any', property: 'margin' },
  mt: { type: 'any', property: 'margin-top' },
  mr: { type: 'any', property: 'margin-right' },
  mb: { type: 'any', property: 'margin-bottom' },
  ml: { type: 'any', property: 'margin-left' },
  mx: { type: 'any', property: 'margin-inline' },
  my: { type: 'any', property: 'margin-block' },
  ms: { type: 'any', property: 'margin-inline-start' },
  me: { type: 'any', property: 'margin-inline-end' },

  // — Sizing ————————————————————
  w: { type: 'any', property: 'width' },
  h: { type: 'any', property: 'height' },
  minw: { type: 'any', property: 'min-width' },
  maxw: { type: 'any', property: 'max-width' },
  minh: { type: 'any', property: 'min-height' },
  maxh: { type: 'any', property: 'max-height' },

  // — Layout & Position ————————————————————
  display: { type: 'any', property: 'display' },
  pos: { type: 'any', property: 'position' },
  left: { type: 'any', property: 'left' },
  top: { type: 'any', property: 'top' },
  right: { type: 'any', property: 'right' },
  bottom: { type: 'any', property: 'bottom' },
  inset: { type: 'any', property: 'inset' },
  insetx: { type: 'any', property: 'inset-inline' },
  insety: { type: 'any', property: 'inset-block' },
  bsz: { type: 'string', property: 'box-sizing' },
  z: { type: 'number', property: 'z-index' },

  // — Background ————————————————————
  bg: { type: 'string', property: 'background', transformer: getColorValue },
  bgc: { type: 'string', property: 'background-color', transformer: getColorValue },
  bgi: { type: 'string', property: 'background-image' },
  bga: { type: 'string', property: 'background-attachment' },
  bgp: { type: 'string', property: 'background-position' },
  bgsz: { type: 'string', property: 'background-size' },
  bgr: { type: 'string', property: 'background-repeat' },

  // — Typography ————————————————————
  c: { type: 'string', property: 'color', transformer: getColorValue },
  ff: { type: 'string', property: 'font-family' },
  fs: { type: 'string', property: 'font-size' },
  fw: { type: 'string', property: 'font-weight' },
  ta: { type: 'string', property: 'text-align' },
  tt: { type: 'string', property: 'text-transform' },
  td: { type: 'string', property: 'text-decoration' },
  tds: { type: 'string', property: 'text-decoration-style' },
  tdc: { type: 'string', property: 'text-decoration-color', transformer: getColorValue },
  lts: { type: 'string', property: 'letter-spacing' },
  lh: { type: 'any', property: 'line-height' },

  // — Border ————————————————————
  bd: { type: 'string', property: 'border' },
  bs: { type: 'string', property: 'border-style' },
  bc: { type: 'string', property: 'border-color', transformer: getColorValue },
  bw: { type: 'any', property: 'border-width' },

  // — Radius ————————————————————
  rounded: {
    type: 'any',
    property: 'border-radius',
    transformer: (value: string) => getSizeValue('radius', value)
  },

  // — Shadow & Effects ————————————————————
  shadow: {
    type: 'any',
    property: 'box-shadow',
    transformer: (value: string) => getSizeValue('shadow', value)
  },
  opacity: { type: 'any', property: 'opacity' },

  // — Flex ————————————————————
  gap: { type: 'any', property: 'gap' },
  spacing: { type: 'any', property: 'gap' }, // alias for gap
  rowgap: { type: 'any', property: 'row-gap' },
  colgap: { type: 'any', property: 'column-gap' },
  align: { type: 'string', property: 'align-items' },
  justify: { type: 'string', property: 'justify-content' },
  self: { type: 'string', property: 'align-self' },
  basis: { type: 'any', property: 'flex-basis' },
  flex: { type: 'string', property: 'flex' },
  grow: { type: 'number', property: 'flex-grow' },
  order: { type: 'number', property: 'order' },
  shrink: { type: 'number', property: 'flex-shrink' }
};

export type CSSSystemPropKey = keyof typeof cssSystemPropAlias;
