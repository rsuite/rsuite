'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _SelectPicker = _interopRequireDefault(require("../SelectPicker"));
var _utils = require("../internals/utils");
var _excluded = ["disabled", "limitOptions", "locale", "limit", "onChangeLimit", "size", "prefix"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var LimitPicker = function LimitPicker(props) {
  var disabled = props.disabled,
    limitOptions = props.limitOptions,
    locale = props.locale,
    limit = props.limit,
    onChangeLimit = props.onChangeLimit,
    size = props.size,
    prefix = props.prefix,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var containerRef = (0, _react.useRef)(null);
  var disabledPicker = typeof disabled === 'function' ? disabled('picker') : Boolean(disabled);
  var formatlimitOptions = limitOptions.map(function (item) {
    return {
      value: item,
      label: locale.limit && (0, _utils.tplTransform)(locale.limit, item)
    };
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('limit'),
    ref: containerRef
  }, /*#__PURE__*/_react.default.createElement(_SelectPicker.default, (0, _extends2.default)({}, rest, {
    size: size,
    cleanable: false,
    searchable: false,
    placement: "topStart",
    data: formatlimitOptions,
    value: limit,
    onChange: onChangeLimit,
    menuStyle: {
      minWidth: 'auto'
    },
    disabled: disabledPicker,
    container: function container() {
      return containerRef.current;
    }
  })));
};
var _default = exports.default = LimitPicker;