import React from 'react';

export function reactToString(element: React.ReactElement): string[] {
  const nodes: string[] = [];
  const recursion = elmt => {
    React.Children.forEach(elmt.props.children, child => {
      if (React.isValidElement(child)) {
        recursion(child);
      } else if (typeof child === 'string') {
        nodes.push(child);
      }
    });
  };

  recursion(element);
  return nodes;
}

export function stringifyReactNode(node: React.ReactNode) {
  if (typeof node === 'string') {
    return node;
  } else if (React.isValidElement(node)) {
    const nodes = reactToString(node);
    return nodes.join('');
  }
  return '';
}

export default stringifyReactNode;
