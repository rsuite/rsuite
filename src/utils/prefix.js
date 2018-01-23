import _ from 'lodash';
import classNames from 'classnames';

export const globalKey = '';

function prefix(pre: string, className: string | Array<string>): string {
  if (!pre || !className) {
    return '';
  }

  if (_.isArray(className)) {
    return classNames(className.filter(name => !!name).map(name => `${pre}-${name}`));
  }

  return `${pre}-${className}`;

}

export default _.curry(prefix);
