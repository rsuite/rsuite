'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.sliderPropTypes = exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _getWidth = _interopRequireDefault(require("dom-lib/getWidth"));
var _getHeight = _interopRequireDefault(require("dom-lib/getHeight"));
var _getOffset = _interopRequireDefault(require("dom-lib/getOffset"));
var _ProgressBar = _interopRequireDefault(require("./ProgressBar"));
var _Handle = _interopRequireDefault(require("./Handle"));
var _Graduated = _interopRequireDefault(require("./Graduated"));
var _Plaintext = _interopRequireDefault(require("../internals/Plaintext"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _utils = require("./utils");
var _excluded = ["aria-label", "aria-labelledby", "aria-valuetext", "as", "graduated", "className", "barClassName", "progress", "vertical", "disabled", "readOnly", "plaintext", "classPrefix", "min", "handleClassName", "handleStyle", "handleTitle", "tooltip", "step", "defaultValue", "value", "max", "placeholder", "getAriaValueText", "renderTooltip", "renderMark", "onChange", "onChangeCommitted", "keepTooltipOpen"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var sliderPropTypes = exports.sliderPropTypes = {
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  step: _propTypes.default.number,
  value: _propTypes.default.number,
  defaultValue: _propTypes.default.number,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  handleClassName: _propTypes.default.string,
  handleTitle: _propTypes.default.node,
  barClassName: _propTypes.default.string,
  handleStyle: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  plaintext: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  graduated: _propTypes.default.bool,
  tooltip: _propTypes.default.bool,
  progress: _propTypes.default.bool,
  vertical: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  onChangeCommitted: _propTypes.default.func,
  renderMark: _propTypes.default.func,
  renderTooltip: _propTypes.default.func,
  getAriaValueText: _propTypes.default.func
};

/**
 * A Slider is an interface for users to adjust a value in a specific range.
 *
 * @see https://rsuitejs.com/components/slider
 */
var Slider = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Slider', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var ariaLabel = propsWithDefaults['aria-label'],
    ariaLabelledby = propsWithDefaults['aria-labelledby'],
    ariaValuetext = propsWithDefaults['aria-valuetext'],
    _propsWithDefaults$as = propsWithDefaults.as,
    Componnet = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    graduated = propsWithDefaults.graduated,
    className = propsWithDefaults.className,
    barClassName = propsWithDefaults.barClassName,
    progress = propsWithDefaults.progress,
    vertical = propsWithDefaults.vertical,
    disabled = propsWithDefaults.disabled,
    readOnly = propsWithDefaults.readOnly,
    plaintext = propsWithDefaults.plaintext,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'slider' : _propsWithDefaults$cl,
    _propsWithDefaults$mi = propsWithDefaults.min,
    min = _propsWithDefaults$mi === void 0 ? 0 : _propsWithDefaults$mi,
    handleClassName = propsWithDefaults.handleClassName,
    handleStyle = propsWithDefaults.handleStyle,
    handleTitle = propsWithDefaults.handleTitle,
    _propsWithDefaults$to = propsWithDefaults.tooltip,
    tooltip = _propsWithDefaults$to === void 0 ? true : _propsWithDefaults$to,
    _propsWithDefaults$st = propsWithDefaults.step,
    step = _propsWithDefaults$st === void 0 ? 1 : _propsWithDefaults$st,
    _propsWithDefaults$de = propsWithDefaults.defaultValue,
    defaultValue = _propsWithDefaults$de === void 0 ? 0 : _propsWithDefaults$de,
    valueProp = propsWithDefaults.value,
    _propsWithDefaults$ma = propsWithDefaults.max,
    maxProp = _propsWithDefaults$ma === void 0 ? 100 : _propsWithDefaults$ma,
    placeholder = propsWithDefaults.placeholder,
    getAriaValueText = propsWithDefaults.getAriaValueText,
    renderTooltip = propsWithDefaults.renderTooltip,
    renderMark = propsWithDefaults.renderMark,
    onChange = propsWithDefaults.onChange,
    onChangeCommitted = propsWithDefaults.onChangeCommitted,
    keepTooltipOpen = propsWithDefaults.keepTooltipOpen,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var barRef = (0, _react.useRef)(null);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var _useCustom2 = (0, _CustomProvider.useCustom)('Slider'),
    rtl = _useCustom2.rtl;
  var classes = merge(className, withClassPrefix({
    vertical: vertical,
    disabled: disabled,
    graduated: graduated,
    'with-mark': renderMark,
    readonly: readOnly
  }));
  var max = (0, _react.useMemo)(function () {
    return (0, _utils.precisionMath)(Math.floor((maxProp - min) / step) * step + min);
  }, [maxProp, min, step]);

  /**
   * Returns a valid value that does not exceed the specified range of values.
   */
  var getValidValue = (0, _react.useCallback)(function (value) {
    return (0, _utils.checkValue)(value, min, max);
  }, [max, min]);
  var _useControlled = (0, _hooks.useControlled)(getValidValue(valueProp), getValidValue(defaultValue)),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var count = (0, _react.useMemo)(function () {
    return (0, _utils.precisionMath)((max - min) / step);
  }, [max, min, step]);

  // Get the height of the progress bar
  var getBarHeight = (0, _react.useCallback)(function () {
    return barRef.current ? (0, _getHeight.default)(barRef.current) : 0;
  }, []);
  // Get the width of the progress bar
  var getBarWidth = (0, _react.useCallback)(function () {
    return barRef.current ? (0, _getWidth.default)(barRef.current) : 0;
  }, []);
  var getValueByOffset = (0, _react.useCallback)(function (offset) {
    var value = 0;
    if (isNaN(offset)) {
      return value;
    }
    if (vertical) {
      var barHeight = getBarHeight();
      value = Math.round(offset / (barHeight / count)) * step;
    } else {
      var barWidth = getBarWidth();
      value = Math.round(offset / (barWidth / count)) * step;
    }
    return (0, _utils.precisionMath)(value);
  }, [count, getBarHeight, getBarWidth, step, vertical]);

  /**
   * A value within the valid range is calculated from the position triggered by the event.
   */
  var getValueByPosition = (0, _react.useCallback)(function (event) {
    var barOffset = (0, _getOffset.default)(barRef.current);
    var _getPosition = (0, _utils.getPosition)(event),
      pageX = _getPosition.pageX,
      pageY = _getPosition.pageY;
    var offset = vertical ? barOffset.top + barOffset.height - pageY : pageX - barOffset.left;
    var offsetValue = rtl && !vertical ? barOffset.width - offset : offset;
    return getValueByOffset(offsetValue) + min;
  }, [getValueByOffset, min, rtl, vertical]);

  /**
   * Callback function that is fired when the mousemove is triggered
   */
  var handleChangeValue = (0, _hooks.useEventCallback)(function (event) {
    if (disabled || readOnly) {
      return;
    }
    var nextValue = getValidValue(getValueByPosition(event));
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
  });

  /**
   * Callback function that is fired when the mouseup is triggered
   */
  var handleChangeCommitted = (0, _hooks.useEventCallback)(function (event) {
    if (disabled || readOnly) {
      return;
    }
    var nextValue = getValidValue(getValueByPosition(event));
    onChangeCommitted === null || onChangeCommitted === void 0 || onChangeCommitted(nextValue, event);
  });
  var handleClickBar = (0, _hooks.useEventCallback)(function (event) {
    handleChangeValue(event);
    handleChangeCommitted(event);
  });
  var handleKeyDown = (0, _hooks.useEventCallback)(function (event) {
    var nextValue;
    var increaseKey = rtl ? 'ArrowLeft' : 'ArrowRight';
    var decreaseKey = rtl ? 'ArrowRight' : 'ArrowLeft';
    switch (event.key) {
      case 'Home':
        nextValue = min;
        break;
      case 'End':
        nextValue = max;
        break;
      case increaseKey:
      case 'ArrowUp':
        nextValue = Math.min(max, value + step);
        break;
      case decreaseKey:
      case 'ArrowDown':
        nextValue = Math.max(min, value - step);
        break;
      default:
        return;
    }

    // Prevent scroll of the page
    event.preventDefault();
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
  });
  if (plaintext) {
    return /*#__PURE__*/_react.default.createElement(_Plaintext.default, {
      localeKey: "notSelected",
      ref: ref,
      placeholder: placeholder
    }, value);
  }
  return /*#__PURE__*/_react.default.createElement(Componnet, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes,
    role: "presentation"
  }), /*#__PURE__*/_react.default.createElement("div", {
    ref: barRef,
    className: merge(barClassName, prefix('bar')),
    onClick: handleClickBar,
    "data-testid": "slider-bar"
  }, progress && /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
    rtl: rtl,
    vertical: vertical,
    start: 0,
    end: (value - min) / (max - min) * 100
  }), graduated && /*#__PURE__*/_react.default.createElement(_Graduated.default, {
    step: step,
    min: min,
    max: max,
    count: count,
    value: value,
    renderMark: renderMark
  })), /*#__PURE__*/_react.default.createElement(_Handle.default, {
    position: (value - min) / (max - min) * 100,
    className: handleClassName,
    style: handleStyle,
    disabled: disabled,
    vertical: vertical,
    tooltip: tooltip,
    rtl: rtl,
    value: value,
    keepTooltipOpen: keepTooltipOpen,
    renderTooltip: renderTooltip,
    onDragMove: handleChangeValue,
    onKeyDown: handleKeyDown,
    onDragEnd: handleChangeCommitted,
    tabIndex: disabled || readOnly ? undefined : 0,
    "aria-orientation": vertical ? 'vertical' : 'horizontal',
    "aria-valuenow": value,
    "aria-disabled": disabled,
    "aria-valuetext": getAriaValueText ? getAriaValueText(value) : ariaValuetext,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-valuemax": max,
    "aria-valuemin": min
  }, handleTitle));
});
Slider.displayName = 'Slider';
Slider.propTypes = sliderPropTypes;
var _default = exports.default = Slider;