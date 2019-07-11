import _ from 'lodash';
import classNames from 'classnames';

const getGlobal = new Function('return this;');
const globals = getGlobal();

export const globalKey = 'rs-';
export const getClassNamePrefix = () => {
  if (globals && typeof globals.__RSUITE_CLASSNAME_PREFIX__ !== 'undefined') {
    return globals.__RSUITE_CLASSNAME_PREFIX__;
  }
  return globalKey;
};
export const defaultClassPrefix = (name: string) => `${getClassNamePrefix()}${name}`;

export function prefix(pre: string, className: string | string[]): string {
  if (!pre || !className) {
    return '';
  }

  if (_.isArray(className)) {
    return classNames(className.filter(name => !!name).map(name => `${pre}-${name}`));
  }

  return `${pre}-${className}`;
}

export default _.curry(prefix);
