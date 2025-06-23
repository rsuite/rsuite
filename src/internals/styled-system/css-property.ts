import { getSizeValue } from '@/internals/utils';

type CSSPropertyType =
  | 'spacing'
  | 'sizing'
  | 'layout'
  | 'color'
  | 'border'
  | 'effect'
  | 'flex'
  | 'radius';

type CSSProperty = {
  /**
   * CSS Property Type
   */
  type: CSSPropertyType;

  /**
   * CSS Property
   */
  property: string;

  /**
   * Value Transformer
   */
  valueTransformer?: (value: any) => any;
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
  m: { type: 'spacing', property: 'margin' },
  mt: { type: 'spacing', property: 'margin-top' },
  mr: { type: 'spacing', property: 'margin-right' },
  mb: { type: 'spacing', property: 'margin-bottom' },
  ml: { type: 'spacing', property: 'margin-left' },
  mx: { type: 'spacing', property: 'margin-inline' },
  my: { type: 'spacing', property: 'margin-block' },

  // Sizing
  w: { type: 'sizing', property: 'width' },
  h: { type: 'sizing', property: 'height' },
  minw: { type: 'sizing', property: 'min-width' },
  maxw: { type: 'sizing', property: 'max-width' },
  minh: { type: 'sizing', property: 'min-height' },
  maxh: { type: 'sizing', property: 'max-height' },

  // Layout
  display: { type: 'layout', property: 'display' },

  // Color
  c: { type: 'color', property: 'color' },
  bg: { type: 'color', property: 'background' },

  // Border
  bd: { type: 'border', property: 'border' },

  // Radius
  rounded: {
    type: 'radius',
    property: 'border-radius',
    valueTransformer: (value: any) => getSizeValue('radius', value)
  },

  // Shadow
  shadow: {
    type: 'effect',
    property: 'box-shadow',
    valueTransformer: (value: any) => getSizeValue('shadow', value)
  },

  // flex
  spacing: { type: 'flex', property: 'gap' },
  gap: { type: 'flex', property: 'gap' },
  align: { type: 'flex', property: 'align-items' },
  justify: { type: 'flex', property: 'justify-content' }
};
