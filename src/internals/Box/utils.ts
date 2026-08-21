import camelCase from 'lodash/camelCase';
import { cssSystemPropAlias } from '@/internals/styled-system/css-alias';
import { supportedCSSProperties } from '@/internals/styled-system/css-properties';

const boxPropKeys = new Set<string>(supportedCSSProperties);

Object.entries(cssSystemPropAlias).forEach(([key, prop]) => {
  boxPropKeys.add(key);
  boxPropKeys.add(camelCase(prop.property));
});

const isBoxProp = (key: string) => boxPropKeys.has(key);

/**
 * Extract box properties from props
 * @param props Original props object
 * @returns Object containing only box properties
 */
export const extractBoxProps = (props: Record<string, any>): Record<string, any> => {
  const boxProps: Record<string, any> = {};

  // Extract only box related properties
  Object.keys(props).forEach(key => {
    if (isBoxProp(key) && props[key] !== undefined) {
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
    if (!isBoxProp(key)) {
      filteredProps[key] = props[key];
    }
  });

  return filteredProps;
};
