import classNames from 'classnames';
import curry from 'lodash/curry';

export const globalKey = 'rs-';
export const getClassNamePrefix = () => {
  // TODO: A prefix that can be replaced at runtime.

  return globalKey;
};
export const defaultClassPrefix = (name: string) => `${getClassNamePrefix()}${name}`;

export function prefix(pre: string, className: string | string[]): string {
  if (!pre || !className) {
    return '';
  }

  if (Array.isArray(className)) {
    return classNames(className.filter(name => !!name).map(name => `${pre}-${name}`));
  }

  // TODO Compatible with V4
  if (pre[pre.length - 1] === '-') {
    return `${pre}${className}`;
  }

  return `${pre}-${className}`;
}

export default curry(prefix);
