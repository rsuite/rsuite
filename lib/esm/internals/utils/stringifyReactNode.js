'use client';
import React from 'react';

/**
 * Converts a React element to a string representation.
 * @param element - The React element to convert.
 * @returns An array of strings representing the React element.
 */
export function reactToString(element) {
  var nodes = [];
  var _recursion = function recursion(elmt) {
    React.Children.forEach(elmt.props.children, function (child) {
      if (/*#__PURE__*/React.isValidElement(child)) {
        _recursion(child);
      } else if (typeof child === 'string') {
        nodes.push(child);
      }
    });
  };
  _recursion(element);
  return nodes;
}

/**
 * Converts a React node to a string representation.
 * @param node - The React node to convert.
 * @returns A string representation of the React node.
 */
export function stringifyReactNode(node) {
  if (typeof node === 'string') {
    return node;
  } else if (/*#__PURE__*/React.isValidElement(node)) {
    var nodes = reactToString(node);
    return nodes.join('');
  }
  return '';
}
export default stringifyReactNode;