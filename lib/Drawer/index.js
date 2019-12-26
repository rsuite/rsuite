"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _setDisplayName = _interopRequireDefault(require("recompose/setDisplayName"));

var _utils = require("../utils");

var _Drawer = _interopRequireDefault(require("./Drawer"));

var _ModalBody = _interopRequireDefault(require("../Modal/ModalBody"));

var _ModalHeader = _interopRequireDefault(require("../Modal/ModalHeader"));

var _ModalTitle = _interopRequireDefault(require("../Modal/ModalTitle"));

var _ModalFooter = _interopRequireDefault(require("../Modal/ModalFooter"));

var EnhancedBody = (0, _utils.defaultProps)({
  classPrefix: 'drawer-body'
})(_ModalBody.default);
(0, _setStatic.default)('Body', (0, _setDisplayName.default)('Body')(EnhancedBody))(_Drawer.default);
(0, _setStatic.default)('Header', (0, _utils.defaultProps)({
  classPrefix: 'drawer-header'
})(_ModalHeader.default))(_Drawer.default);
(0, _setStatic.default)('Title', (0, _utils.defaultProps)({
  classPrefix: 'drawer-title'
})(_ModalTitle.default))(_Drawer.default);
(0, _setStatic.default)('Footer', (0, _utils.defaultProps)({
  classPrefix: 'drawer-footer'
})(_ModalFooter.default))(_Drawer.default);
var _default = _Drawer.default;
exports.default = _default;
module.exports = exports.default;