import camelCase from 'lodash/camelCase';
import { cssSystemPropAlias } from '@/internals/styled-system';

const getUsedPropKeys = () => {
  const propSet = new Set<string>();

  Object.entries(cssSystemPropAlias).forEach(([key, prop]) => {
    const { property } = prop;
    const propName = camelCase(property);

    propSet.add(key);
    propSet.add(propName);
  });

  return Array.from(propSet);
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
    }
    // Note: We intentionally don't use isCSSProperty here because it returns false
    // during SSR (!canUseDOM), which would cause SSR/CSR inconsistency.
    // Box props should be explicitly defined in cssSystemPropAlias.
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
