import isObject from 'lodash/isObject';

export default (value: any, labelKey?: string, valueKey?: string) => {
  if (isObject(value)) {
    return value;
  }

  if (labelKey && valueKey) {
    return {
      [labelKey]: value,
      [valueKey]: value
    };
  }

  return null;
};
