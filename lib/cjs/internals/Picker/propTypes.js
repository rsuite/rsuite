'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.pickerPropTypes = exports.listPickerPropTypes = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("../constants");
var _utils = require("../../Animation/utils");
var _propTypes2 = require("../propTypes");
var pickerPropTypes = exports.pickerPropTypes = (0, _extends2.default)({}, _utils.animationPropTypes, {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  locale: _propTypes.default.any,
  appearance: (0, _propTypes2.oneOf)(['default', 'subtle']),
  block: _propTypes.default.bool,
  containerPadding: _propTypes.default.number,
  container: _propTypes.default.oneOfType([_propTypes.default.any, _propTypes.default.func]),
  disabled: _propTypes.default.bool,
  menuClassName: _propTypes.default.string,
  menuStyle: _propTypes.default.object,
  placeholder: _propTypes.default.node,
  placement: (0, _propTypes2.oneOf)(_constants.PLACEMENT),
  preventOverflow: _propTypes.default.bool,
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  cleanable: _propTypes.default.bool,
  renderExtraFooter: _propTypes.default.func,
  renderValue: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onClean: _propTypes.default.func,
  listProps: _propTypes.default.any
});
var listPickerPropTypes = exports.listPickerPropTypes = (0, _extends2.default)({}, pickerPropTypes, {
  data: _propTypes.default.array.isRequired,
  valueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  childrenKey: _propTypes.default.string,
  disabledItemValues: _propTypes.default.array,
  value: _propTypes.default.any,
  defaultValue: _propTypes.default.any,
  onChange: _propTypes.default.func
});