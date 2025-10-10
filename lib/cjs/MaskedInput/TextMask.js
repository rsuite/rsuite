'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _createTextMaskInputElement = _interopRequireDefault(require("./createTextMaskInputElement"));
var _utils = require("../internals/utils");
var _excluded = ["mask", "guide", "placeholderChar", "value", "showMask", "pipe", "render", "onChange"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#guide
 */

var defaultRender = function defaultRender(ref, props) {
  return /*#__PURE__*/_react.default.createElement("input", (0, _extends2.default)({
    ref: ref
  }, props));
};

/**
 * The `TextMask` component is used to format the user input data.
 * @see https://rsuitejs.com/components/input/#masked-input
 */
var TextMask = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var mask = props.mask,
    _props$guide = props.guide,
    guide = _props$guide === void 0 ? true : _props$guide,
    placeholderChar = props.placeholderChar,
    value = props.value,
    showMask = props.showMask,
    pipe = props.pipe,
    _props$render = props.render,
    render = _props$render === void 0 ? defaultRender : _props$render,
    onChange = props.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var inputRef = (0, _react.useRef)(null);
  var textMaskInputElement = (0, _react.useRef)();
  var initTextMask = (0, _react.useCallback)(function () {
    var _textMaskInputElement;
    textMaskInputElement.current = (0, _createTextMaskInputElement.default)((0, _extends2.default)({
      inputElement: inputRef.current
    }, props));
    (_textMaskInputElement = textMaskInputElement.current) === null || _textMaskInputElement === void 0 || _textMaskInputElement.update(value);
  }, [props, value]);
  var handleChange = (0, _react.useCallback)(function (event) {
    var _textMaskInputElement2;
    (_textMaskInputElement2 = textMaskInputElement.current) === null || _textMaskInputElement2 === void 0 || _textMaskInputElement2.update();
    onChange === null || onChange === void 0 || onChange(event);
  }, [onChange]);
  (0, _react.useEffect)(function () {
    initTextMask();
  }, [guide, placeholderChar, showMask, pipe, mask, value, initTextMask]);
  return render((0, _utils.mergeRefs)(inputRef, ref), (0, _extends2.default)({
    onChange: handleChange,
    defaultValue: value
  }, (0, _omit.default)(rest, ['keepCharPositions'])));
});
TextMask.displayName = 'TextMask';
TextMask.propTypes = {
  render: _propTypes.default.func,
  onChange: _propTypes.default.func,
  mask: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.func, _propTypes.default.bool]).isRequired,
  guide: _propTypes.default.bool,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  pipe: _propTypes.default.func,
  placeholderChar: _propTypes.default.string,
  keepCharPositions: _propTypes.default.bool,
  showMask: _propTypes.default.bool
};
var _default = exports.default = TextMask;