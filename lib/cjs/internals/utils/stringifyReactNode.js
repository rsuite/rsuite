'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.reactToString = reactToString;
exports.stringifyReactNode = stringifyReactNode;
var _react = _interopRequireDefault(require("react"));
/**
 * Converts a React element to a string representation.
 * @param element - The React element to convert.
 * @returns An array of strings representing the React element.
 */
function reactToString(element) {
  var nodes = [];
  var _recursion = function recursion(elmt) {
    _react.default.Children.forEach(elmt.props.children, function (child) {
      if (/*#__PURE__*/_react.default.isValidElement(child)) {
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
function stringifyReactNode(node) {
  if (typeof node === 'string') {
    return node;
  } else if (/*#__PURE__*/_react.default.isValidElement(node)) {
    var nodes = reactToString(node);
    return nodes.join('');
  }
  return '';
}
var _default = exports.default = stringifyReactNode;