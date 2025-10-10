'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../internals/hooks");
var _date = require("../internals/utils/date");
var _CustomProvider = require("../CustomProvider");
var _Button = _interopRequireDefault(require("../Button"));
function Header(props) {
  var _prefix;
  var _useClassNames = (0, _hooks.useClassNames)('picker'),
    prefix = _useClassNames.prefix;
  var formatStr = props.formatStr,
    character = props.character,
    value = props.value,
    _props$activeKey = props.activeKey,
    activeKey = _props$activeKey === void 0 ? 'start' : _props$activeKey,
    clickable = props.clickable,
    onSelect = props.onSelect;
  var _ref = value !== null && value !== void 0 ? value : [null, null],
    startDate = _ref[0],
    endDate = _ref[1];
  var v = startDate && endDate ? [startDate, endDate].sort(_date.compareAsc) : [startDate, endDate];
  var start = v[0] ? /*#__PURE__*/_react.default.createElement(_CustomProvider.FormattedDate, {
    date: v[0],
    formatStr: formatStr
  }) : formatStr;
  var end = v[1] ? /*#__PURE__*/_react.default.createElement(_CustomProvider.FormattedDate, {
    date: v[1],
    formatStr: formatStr
  }) : formatStr;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('daterange-header', (_prefix = {}, _prefix["tab-active-" + activeKey] = clickable, _prefix)),
    "data-testid": "daterange-header"
  }, clickable ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    size: "xs",
    appearance: "subtle",
    className: prefix('header-date'),
    onClick: function onClick() {
      return onSelect === null || onSelect === void 0 ? void 0 : onSelect('start');
    },
    "aria-label": "Select start date"
  }, start), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('header-character')
  }, character), /*#__PURE__*/_react.default.createElement(_Button.default, {
    size: "xs",
    appearance: "subtle",
    className: prefix('header-date'),
    onClick: function onClick() {
      return onSelect === null || onSelect === void 0 ? void 0 : onSelect('end');
    },
    "aria-label": "Select end date"
  }, end)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('header-date')
  }, start), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('header-character')
  }, character), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('header-date')
  }, end)));
}
var _default = exports.default = Header;