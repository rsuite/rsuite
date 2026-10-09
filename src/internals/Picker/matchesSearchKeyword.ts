import React from 'react';
import { reactToString } from '@/internals/utils';

/** Match a label against an already normalized, nonempty search keyword. */
function matchesSearchKeyword(label: React.ReactNode, keyword: string) {
  if (typeof label === 'string' || typeof label === 'number') {
    return `${label}`.toLocaleLowerCase().indexOf(keyword) >= 0;
  } else if (React.isValidElement(label)) {
    const nodes = reactToString(label);
    return nodes.join('').toLocaleLowerCase().indexOf(keyword) >= 0;
  }
  return false;
}

export default matchesSearchKeyword;
