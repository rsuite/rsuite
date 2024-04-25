import React from 'react';
import reactToString from '../../utils/reactToString';
export function stringifyReactNode(node: React.ReactNode) {
  if (typeof node === 'string') {
    return node;
  } else if (React.isValidElement(node)) {
    const nodes = reactToString(node);
    return nodes.join('');
  }
  return '';
}
