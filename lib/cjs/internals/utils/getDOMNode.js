'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.getDOMNode = getDOMNode;
var _reactDom = _interopRequireDefault(require("react-dom"));
function safeFindDOMNode(componentOrElement) {
  if (componentOrElement && 'setState' in componentOrElement) {
    var _ReactDOM$findDOMNode;
    // eslint-disable-next-line react/no-find-dom-node
    return (_ReactDOM$findDOMNode = _reactDom.default.findDOMNode) === null || _ReactDOM$findDOMNode === void 0 ? void 0 : _ReactDOM$findDOMNode.call(_reactDom.default, componentOrElement);
  }
  return componentOrElement !== null && componentOrElement !== void 0 ? componentOrElement : null;
}
var getRefTarget = function getRefTarget(ref) {
  return ref && ('current' in ref ? ref.current : ref);
};
function getDOMNode(elementOrRef) {
  // If elementOrRef is an instance of Position, child is returned. [PositionInstance]
  var element = (elementOrRef === null || elementOrRef === void 0 ? void 0 : elementOrRef.root) || (elementOrRef === null || elementOrRef === void 0 ? void 0 : elementOrRef.child) || getRefTarget(elementOrRef);

  // Native HTML elements
  if (element !== null && element !== void 0 && element.nodeType && typeof (element === null || element === void 0 ? void 0 : element.nodeName) === 'string') {
    return element;
  }

  // If you can't get the native HTML element, you can only get it through findDOMNode.
  // eslint-disable-next-line react/no-find-dom-node
  return safeFindDOMNode(element);
}
var _default = exports.default = getDOMNode;