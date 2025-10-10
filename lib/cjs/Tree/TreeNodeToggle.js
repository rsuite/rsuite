'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _ArrowDown = _interopRequireDefault(require("@rsuite/icons/ArrowDown"));
var _ArrowRight = _interopRequireDefault(require("@rsuite/icons/ArrowRight"));
var _ArrowLeft = _interopRequireDefault(require("@rsuite/icons/ArrowLeft"));
var _Spinner = _interopRequireDefault(require("@rsuite/icons/Spinner"));
var _hooks = require("../internals/hooks");
var _TreeProvider = require("../internals/Tree/TreeProvider");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["data", "loading", "expanded", "hasChildren"];
function TreeNodeToggle(props) {
  var data = props.data,
    loading = props.loading,
    expanded = props.expanded,
    hasChildren = props.hasChildren,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCustom = (0, _CustomProvider.useCustom)(),
    rtl = _useCustom.rtl;
  var _useTreeCustomRendere = (0, _TreeProvider.useTreeCustomRenderer)(),
    renderTreeIcon = _useTreeCustomRendere.renderTreeIcon;
  var _useClassNames = (0, _hooks.useClassNames)('tree-node'),
    prefix = _useClassNames.prefix;
  var IconElementType = expanded ? _ArrowDown.default : rtl ? _ArrowLeft.default : _ArrowRight.default;
  var icon = /*#__PURE__*/_react.default.createElement(IconElementType, {
    className: prefix('toggle-icon')
  });
  if (loading) {
    icon = /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('loading-icon')
    }, /*#__PURE__*/_react.default.createElement(_Spinner.default, {
      spin: true
    }));
  }
  if (data !== undefined && typeof renderTreeIcon === 'function') {
    var customIcon = renderTreeIcon(data, expanded);
    icon = customIcon !== null ? /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('custom-icon')
    }, customIcon) : icon;
  }
  return hasChildren ? /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    tabIndex: -1,
    role: "button",
    "aria-busy": loading ? true : undefined,
    "data-ref": data.refKey,
    className: prefix('toggle')
  }, rest), icon) : /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('toggle-placeholder')
  });
}
var _default = exports.default = TreeNodeToggle;