import curry from 'lodash/curry';

function prefix(pre: string, className: string): string {
  if (pre && className) {
    return `${pre}-${className}`;
  }
  return '';
}

export default curry(prefix);
