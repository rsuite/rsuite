import { getCssValue, getSizeStyle, getColorVar } from '@/internals/utils';

// Mapping for padding properties to their CSS style equivalents
const paddingStyleMap: Record<string, string> = {
  p: 'padding',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  px: 'paddingInline',
  py: 'paddingBlock'
};

// Mapping for margin properties to their CSS style equivalents
const marginStyleMap: Record<string, string> = {
  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  mx: 'marginInline',
  my: 'marginBlock'
};

// Mapping for size properties to their CSS style equivalents
const sizeStyleMap: Record<string, string> = {
  w: 'width',
  h: 'height'
};

// Derive box property keys from style mappings
const boxPropKeys = [
  ...Object.keys(paddingStyleMap),
  ...Object.keys(marginStyleMap),
  ...Object.keys(sizeStyleMap),
  'bd',
  'bg',
  'c',
  'display',
  'rounded',
  'shadow'
];

/**
 * Extract box properties from props
 * @param props Original props object
 * @returns Object containing only box properties
 */
export const extractBoxProps = (props: Record<string, any>): Record<string, any> => {
  const boxProps: Record<string, any> = {};

  // Extract only box related properties
  boxPropKeys.forEach(key => {
    if (key in props && props[key] !== undefined) {
      boxProps[key] = props[key];
    }
  });

  return boxProps;
};

/**
 * Filter out layout properties from props
 * @param props Original props object
 * @returns New object without layout properties
 */
export const omitBoxProps = (props: Record<string, any>): Record<string, any> => {
  const filteredProps: Record<string, any> = {};

  // Copy all properties except box related ones
  Object.keys(props).forEach(key => {
    if (!boxPropKeys.includes(key)) {
      filteredProps[key] = props[key];
    }
  });

  return filteredProps;
};

/**
 * Converts layout properties to CSS variables with abbreviated names
 * @param props Object containing layout properties
 * @returns Object with CSS variables
 */
export const getBoxCSSVariables = (
  props: Record<string, any>
): Record<string, string | number | undefined> => {
  const cssVars: Record<string, string | number | undefined> = {};

  // Process padding properties
  Object.keys(paddingStyleMap).forEach(propKey => {
    if (props[propKey] !== undefined) {
      cssVars[`--rs-box-${propKey}`] = getCssValue(props[propKey]);
    }
  });

  // Process margin properties
  Object.keys(marginStyleMap).forEach(propKey => {
    if (props[propKey] !== undefined) {
      cssVars[`--rs-box-${propKey}`] = getCssValue(props[propKey]);
    }
  });

  // Process size properties
  Object.keys(sizeStyleMap).forEach(propKey => {
    if (props[propKey] !== undefined) {
      cssVars[`--rs-box-${propKey}`] = getCssValue(props[propKey]);
    }
  });

  if (props.bd !== undefined) {
    cssVars['--rs-box-bd'] = getCssValue(props.bd);
  }

  if (props.display !== undefined) {
    cssVars['--rs-box-display'] = props.display;
  }

  if (props.c !== undefined) {
    cssVars['--rs-box-c'] = getColorVar(props.c);
  }

  if (props.bg !== undefined) {
    cssVars['--rs-box-bg'] = getColorVar(props.bg);
  }

  return {
    ...cssVars,
    ...getSizeStyle(props.rounded, 'box', 'rounded'),
    ...getSizeStyle(props.shadow, 'box', 'shadow')
  };
};
