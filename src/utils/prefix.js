import _ from 'lodash';


export const globalKey = '';

function prefix(pre: string, className: string): string {
  if (pre && className) {
    return `${pre}-${className}`;
  }
  return '';
}

export default _.curry(prefix);
