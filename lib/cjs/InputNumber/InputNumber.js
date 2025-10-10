'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _on = _interopRequireDefault(require("dom-lib/on"));
var _ArrowUpLine = _interopRequireDefault(require("@rsuite/icons/ArrowUpLine"));
var _ArrowDownLine = _interopRequireDefault(require("@rsuite/icons/ArrowDownLine"));
var _InputGroup = _interopRequireDefault(require("../InputGroup/InputGroup"));
var _InputGroupAddon = _interopRequireDefault(require("../InputGroup/InputGroupAddon"));
var _Input = _interopRequireDefault(require("../Input"));
var _Button = _interopRequireDefault(require("../Button"));
var _hooks = require("../internals/hooks");
var _constants = require("../internals/constants");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "className", "classPrefix", "disabled", "decimalSeparator", "formatter", "readOnly", "plaintext", "value", "defaultValue", "size", "prefix", "postfix", "step", "buttonAppearance", "min", "max", "scrollable", "onChange", "onWheel", "onBlur", "onFocus"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Check if the value is a number.
 * @param value
 */
var isNumber = function isNumber(value) {
  return /(^-?|^\+?|^\d?)\d*\.\d+$/.test(value + '');
};

/**
 * Get the length of the decimal.
 * @param value
 */
function getDecimalLength(value) {
  if (isNumber(value)) {
    return value.toString().split('.')[1].length;
  }
  return 0;
}

/**
 * Get the value after the decimal point.
 * @param values
 */
function decimals() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  var lengths = values.map(getDecimalLength);
  return Math.max.apply(Math, lengths);
}

/**
 * Disable the upper limit of the number.
 * @param value
 * @param max
 */
function valueReachesMax(value, max) {
  if (!(0, _isNil.default)(value)) {
    return +value >= max;
  }
  return false;
}

/**
 * Disable the lower limit of the number.
 * @param value
 * @param min
 */
function valueReachesMin(value, min) {
  if (!(0, _isNil.default)(value)) {
    return +value <= min;
  }
  return false;
}

/**
 * The `InputNumber` component is used to enter a numerical value.
 * @see https://rsuitejs.com/components/input-number
 */
var InputNumber = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('InputNumber', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? _InputGroup.default : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'input-number' : _propsWithDefaults$cl,
    disabled = propsWithDefaults.disabled,
    decimalSeparator = propsWithDefaults.decimalSeparator,
    formatter = propsWithDefaults.formatter,
    readOnly = propsWithDefaults.readOnly,
    plaintext = propsWithDefaults.plaintext,
    valueProp = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    size = propsWithDefaults.size,
    prefixElement = propsWithDefaults.prefix,
    postfix = propsWithDefaults.postfix,
    _propsWithDefaults$st = propsWithDefaults.step,
    step = _propsWithDefaults$st === void 0 ? 1 : _propsWithDefaults$st,
    _propsWithDefaults$bu = propsWithDefaults.buttonAppearance,
    buttonAppearance = _propsWithDefaults$bu === void 0 ? 'subtle' : _propsWithDefaults$bu,
    minProp = propsWithDefaults.min,
    maxProp = propsWithDefaults.max,
    _propsWithDefaults$sc = propsWithDefaults.scrollable,
    scrollable = _propsWithDefaults$sc === void 0 ? true : _propsWithDefaults$sc,
    onChange = propsWithDefaults.onChange,
    onWheel = propsWithDefaults.onWheel,
    onBlur = propsWithDefaults.onBlur,
    onFocus = propsWithDefaults.onFocus,
    restProps = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var min = minProp !== null && minProp !== void 0 ? minProp : -Infinity;
  var max = maxProp !== null && maxProp !== void 0 ? maxProp : Infinity;
  var _useControlled = (0, _hooks.useControlled)(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var _useState = (0, _react.useState)(false),
    isFocused = _useState[0],
    setIsFocused = _useState[1];
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  var _partitionHTMLProps = (0, _utils.partitionHTMLProps)(restProps),
    htmlInputProps = _partitionHTMLProps[0],
    rest = _partitionHTMLProps[1];
  var inputRef = (0, _react.useRef)();
  var getSafeValue = function getSafeValue(value) {
    if (!Number.isNaN(value)) {
      if (+value > max) {
        value = max;
      }
      if (+value < min) {
        value = min;
      }
    } else {
      value = '';
    }
    return value.toString();
  };
  var handleChangeValue = (0, _hooks.useEventCallback)(function (currentValue, event) {
    if (currentValue !== value) {
      setValue(currentValue);
      onChange === null || onChange === void 0 || onChange(currentValue, event);
    }
  });

  // Increment value by step
  var handleStepUp = (0, _hooks.useEventCallback)(function (event) {
    var val = +(value || 0);
    var bit = decimals(val, step);
    handleChangeValue(getSafeValue((val + step).toFixed(bit)), event);
  });

  // Decrement value by step
  var handleStepDown = (0, _hooks.useEventCallback)(function (event) {
    var val = +(value || 0);
    var bit = decimals(val, step);
    handleChangeValue(getSafeValue((val - step).toFixed(bit)), event);
  });

  // Disables step up/down button when
  // - InputNumber is disabled/readonly
  // - value reaches max/min limits
  var stepUpDisabled = disabled || readOnly || valueReachesMax(value, max);
  var stepDownDisabled = disabled || readOnly || valueReachesMin(value, min);
  var handleKeyDown = (0, _hooks.useEventCallback)(function (event) {
    switch (event.key) {
      case _constants.KEY_VALUES.UP:
        event.preventDefault();
        handleStepUp(event);
        break;
      case _constants.KEY_VALUES.DOWN:
        event.preventDefault();
        handleStepDown(event);
        break;
      case _constants.KEY_VALUES.HOME:
        if (typeof minProp !== 'undefined') {
          event.preventDefault();
          handleChangeValue(getSafeValue(minProp), event);
        }
        break;
      case _constants.KEY_VALUES.END:
        if (typeof maxProp !== 'undefined') {
          event.preventDefault();
          handleChangeValue(getSafeValue(maxProp), event);
        }
        break;
    }
  });
  var handleWheel = (0, _hooks.useEventCallback)(function (event) {
    if (!scrollable) {
      event.preventDefault();
      return;
    }
    if (!disabled && !readOnly && event.target === document.activeElement) {
      event.preventDefault();
      var delta = event['wheelDelta'] || -event.deltaY || -(event === null || event === void 0 ? void 0 : event.detail);
      if (delta > 0) {
        handleStepDown(event);
      }
      if (delta < 0) {
        handleStepUp(event);
      }
    }
    onWheel === null || onWheel === void 0 || onWheel(event);
  });
  var handleChange = (0, _hooks.useEventCallback)(function (value, event) {
    var separator = decimalSeparator || '.';
    var escapedSeparator = separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var regex = new RegExp("^-?(?:\\d+)?(" + escapedSeparator + ")?\\d*$");
    if (!regex.test(value) && value !== '') {
      return;
    }
    handleChangeValue(value, event);
  });
  var replaceDecimalSeparator = (0, _react.useCallback)(function (value) {
    if (decimalSeparator && value) {
      return value.toString().replace('.', decimalSeparator);
    }
    return value;
  }, [decimalSeparator]);
  var restoreDecimalSeparator = (0, _react.useCallback)(function (value) {
    if (decimalSeparator && value) {
      return value.replace(decimalSeparator, '.');
    }
    return value;
  }, [decimalSeparator]);
  var handleBlur = (0, _hooks.useEventCallback)(function (event) {
    var _event$target;
    var value = restoreDecimalSeparator((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value);
    var targetValue = Number.parseFloat(value);
    handleChangeValue(getSafeValue(targetValue), event);
    setIsFocused(false);
  });
  (0, _react.useEffect)(function () {
    var wheelListener;
    if (inputRef.current) {
      wheelListener = (0, _on.default)(inputRef.current, 'wheel', handleWheel, {
        passive: false
      });
    }
    return function () {
      var _wheelListener;
      (_wheelListener = wheelListener) === null || _wheelListener === void 0 || _wheelListener.off();
    };
  }, [handleWheel, scrollable]);
  var inputValue = (0, _react.useMemo)(function () {
    if ((0, _isNil.default)(value)) {
      return '';
    }
    if (isFocused) {
      return replaceDecimalSeparator(value);
    }
    if (formatter) {
      return formatter(value);
    }
    return replaceDecimalSeparator(value);
  }, [formatter, isFocused, replaceDecimalSeparator, value]);
  var input = /*#__PURE__*/_react.default.createElement(_Input.default, (0, _extends2.default)({}, htmlInputProps, {
    ref: plaintext ? ref : undefined,
    inputRef: inputRef,
    autoComplete: "off",
    inputMode: "numeric",
    step: step,
    value: inputValue,
    disabled: disabled,
    readOnly: readOnly,
    plaintext: plaintext,
    onKeyDown: handleKeyDown,
    onChange: handleChange,
    onBlur: (0, _utils.createChainedFunction)(handleBlur, onBlur),
    onFocus: (0, _utils.createChainedFunction)(function () {
      return setIsFocused(true);
    }, onFocus)
  }));
  if (plaintext) {
    return input;
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes,
    disabled: disabled,
    size: size
  }), prefixElement && /*#__PURE__*/_react.default.createElement(_InputGroupAddon.default, null, prefixElement), input, /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('btn-group-vertical')
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    tabIndex: -1,
    appearance: buttonAppearance,
    className: prefix('touchspin-up'),
    onClick: handleStepUp,
    disabled: stepUpDisabled,
    "aria-label": "Increment"
  }, /*#__PURE__*/_react.default.createElement(_ArrowUpLine.default, null)), /*#__PURE__*/_react.default.createElement(_Button.default, {
    tabIndex: -1,
    appearance: buttonAppearance,
    className: prefix('touchspin-down'),
    onClick: handleStepDown,
    disabled: stepDownDisabled,
    "aria-label": "Decrement"
  }, /*#__PURE__*/_react.default.createElement(_ArrowDownLine.default, null))), postfix && /*#__PURE__*/_react.default.createElement(_InputGroupAddon.default, null, postfix));
});
InputNumber.displayName = 'InputNumber';
InputNumber.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  step: _propTypes.default.number,
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  prefix: _propTypes.default.node,
  postfix: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  plaintext: _propTypes.default.bool,
  scrollable: _propTypes.default.bool,
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm', 'xs']),
  buttonAppearance: (0, _propTypes2.oneOf)(['default', 'primary', 'link', 'subtle', 'ghost']),
  onWheel: _propTypes.default.func,
  onChange: _propTypes.default.func
};
var _default = exports.default = InputNumber;