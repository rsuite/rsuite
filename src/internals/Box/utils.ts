import camelCase from 'lodash/camelCase';
import flatten from 'lodash/flatten';
import { cssPropertyMap } from '@/internals/styled-system';
import { isCSSProperty } from '@/internals/utils';

const getUsedPropKeys = () => {
  const boxPropKeys = Object.entries(cssPropertyMap).map(([key, prop]) => {
    const { property } = prop;
    const propName = camelCase(property);

    return [key, propName];
  });

  return flatten(boxPropKeys);
};

/**
 * Extract box properties from props
 * @param props Original props object
 * @returns Object containing only box properties
 */
export const extractBoxProps = (props: Record<string, any>): Record<string, any> => {
  const boxPropKeys = getUsedPropKeys();
  const boxProps: Record<string, any> = {};

  // Extract only box related properties
  Object.keys(props).forEach(key => {
    if (boxPropKeys.includes(key) && props[key] !== undefined) {
      boxProps[key] = props[key];
    } else if (isCSSProperty(key)) {
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
  const boxPropKeys = getUsedPropKeys();
  const filteredProps: Record<string, any> = {};

  // Copy all properties except box related ones
  Object.keys(props).forEach(key => {
    if (!boxPropKeys.includes(key)) {
      filteredProps[key] = props[key];
    }
  });

  return filteredProps;
};
