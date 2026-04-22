import classNames from 'classnames';
import curry from 'lodash/curry';

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
