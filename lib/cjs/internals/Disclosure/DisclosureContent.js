'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _useDisclosureContext = _interopRequireDefault(require("./useDisclosureContext"));
function DisclosureContent(props) {
  var children = props.children;
  var elementRef = (0, _react.useRef)(null);
  var disclosure = (0, _useDisclosureContext.default)(DisclosureContent.displayName);
  var open = disclosure[0].open;
  return children({
    open: open
  }, elementRef);
}
DisclosureContent.displayName = 'Disclosure.Content';
var _default = exports.default = DisclosureContent;