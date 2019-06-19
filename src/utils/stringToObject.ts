import _ from 'lodash';

export default (value: any, labelKey?: string, valueKey?: string) => {
  if (_.isObject(value)) {
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
