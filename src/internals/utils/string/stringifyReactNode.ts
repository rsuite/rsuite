import React from 'react';

/**
 * Converts a React element to a string representation.
 * @param element - The React element to convert.
 * @returns An array of strings representing the React element.
 */
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

/**
 * Converts a React node to a string representation.
 * @param node - The React node to convert.
 * @returns A string representation of the React node.
 */
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
