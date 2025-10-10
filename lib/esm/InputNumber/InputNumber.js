'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "disabled", "decimalSeparator", "formatter", "readOnly", "plaintext", "value", "defaultValue", "size", "prefix", "postfix", "step", "buttonAppearance", "min", "max", "scrollable", "onChange", "onWheel", "onBlur", "onFocus"];
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import on from 'dom-lib/on';
import ArrowUpLineIcon from '@rsuite/icons/ArrowUpLine';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import InputGroup from "../InputGroup/InputGroup.js";
import InputGroupAddon from "../InputGroup/InputGroupAddon.js";
import Input from "../Input/index.js";
import Button from "../Button/index.js";
import { useClassNames, useControlled, useEventCallback } from "../internals/hooks/index.js";
import { KEY_VALUES } from "../internals/constants/index.js";
import { partitionHTMLProps, createChainedFunction } from "../internals/utils/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
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
  if (!isNil(value)) {
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
  if (!isNil(value)) {
    return +value <= min;
  }
  return false;
}

/**
 * The `InputNumber` component is used to enter a numerical value.
 * @see https://rsuitejs.com/components/input-number
 */
var InputNumber = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('InputNumber', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? InputGroup : _propsWithDefaults$as,
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
    restProps = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var min = minProp !== null && minProp !== void 0 ? minProp : -Infinity;
  var max = maxProp !== null && maxProp !== void 0 ? maxProp : Infinity;
  var _useControlled = useControlled(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var _useState = useState(false),
    isFocused = _useState[0],
    setIsFocused = _useState[1];
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  var _partitionHTMLProps = partitionHTMLProps(restProps),
    htmlInputProps = _partitionHTMLProps[0],
    rest = _partitionHTMLProps[1];
  var inputRef = useRef();
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
  var handleChangeValue = useEventCallback(function (currentValue, event) {
    if (currentValue !== value) {
      setValue(currentValue);
      onChange === null || onChange === void 0 || onChange(currentValue, event);
    }
  });

  // Increment value by step
  var handleStepUp = useEventCallback(function (event) {
    var val = +(value || 0);
    var bit = decimals(val, step);
    handleChangeValue(getSafeValue((val + step).toFixed(bit)), event);
  });

  // Decrement value by step
  var handleStepDown = useEventCallback(function (event) {
    var val = +(value || 0);
    var bit = decimals(val, step);
    handleChangeValue(getSafeValue((val - step).toFixed(bit)), event);
  });

  // Disables step up/down button when
  // - InputNumber is disabled/readonly
  // - value reaches max/min limits
  var stepUpDisabled = disabled || readOnly || valueReachesMax(value, max);
  var stepDownDisabled = disabled || readOnly || valueReachesMin(value, min);
  var handleKeyDown = useEventCallback(function (event) {
    switch (event.key) {
      case KEY_VALUES.UP:
        event.preventDefault();
        handleStepUp(event);
        break;
      case KEY_VALUES.DOWN:
        event.preventDefault();
        handleStepDown(event);
        break;
      case KEY_VALUES.HOME:
        if (typeof minProp !== 'undefined') {
          event.preventDefault();
          handleChangeValue(getSafeValue(minProp), event);
        }
        break;
      case KEY_VALUES.END:
        if (typeof maxProp !== 'undefined') {
          event.preventDefault();
          handleChangeValue(getSafeValue(maxProp), event);
        }
        break;
    }
  });
  var handleWheel = useEventCallback(function (event) {
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
  var handleChange = useEventCallback(function (value, event) {
    var separator = decimalSeparator || '.';
    var escapedSeparator = separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var regex = new RegExp("^-?(?:\\d+)?(" + escapedSeparator + ")?\\d*$");
    if (!regex.test(value) && value !== '') {
      return;
    }
    handleChangeValue(value, event);
  });
  var replaceDecimalSeparator = useCallback(function (value) {
    if (decimalSeparator && value) {
      return value.toString().replace('.', decimalSeparator);
    }
    return value;
  }, [decimalSeparator]);
  var restoreDecimalSeparator = useCallback(function (value) {
    if (decimalSeparator && value) {
      return value.replace(decimalSeparator, '.');
    }
    return value;
  }, [decimalSeparator]);
  var handleBlur = useEventCallback(function (event) {
    var _event$target;
    var value = restoreDecimalSeparator((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value);
    var targetValue = Number.parseFloat(value);
    handleChangeValue(getSafeValue(targetValue), event);
    setIsFocused(false);
  });
  useEffect(function () {
    var wheelListener;
    if (inputRef.current) {
      wheelListener = on(inputRef.current, 'wheel', handleWheel, {
        passive: false
      });
    }
    return function () {
      var _wheelListener;
      (_wheelListener = wheelListener) === null || _wheelListener === void 0 || _wheelListener.off();
    };
  }, [handleWheel, scrollable]);
  var inputValue = useMemo(function () {
    if (isNil(value)) {
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
  var input = /*#__PURE__*/React.createElement(Input, _extends({}, htmlInputProps, {
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
    onBlur: createChainedFunction(handleBlur, onBlur),
    onFocus: createChainedFunction(function () {
      return setIsFocused(true);
    }, onFocus)
  }));
  if (plaintext) {
    return input;
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes,
    disabled: disabled,
    size: size
  }), prefixElement && /*#__PURE__*/React.createElement(InputGroupAddon, null, prefixElement), input, /*#__PURE__*/React.createElement("span", {
    className: prefix('btn-group-vertical')
  }, /*#__PURE__*/React.createElement(Button, {
    tabIndex: -1,
    appearance: buttonAppearance,
    className: prefix('touchspin-up'),
    onClick: handleStepUp,
    disabled: stepUpDisabled,
    "aria-label": "Increment"
  }, /*#__PURE__*/React.createElement(ArrowUpLineIcon, null)), /*#__PURE__*/React.createElement(Button, {
    tabIndex: -1,
    appearance: buttonAppearance,
    className: prefix('touchspin-down'),
    onClick: handleStepDown,
    disabled: stepDownDisabled,
    "aria-label": "Decrement"
  }, /*#__PURE__*/React.createElement(ArrowDownLineIcon, null))), postfix && /*#__PURE__*/React.createElement(InputGroupAddon, null, postfix));
});
InputNumber.displayName = 'InputNumber';
InputNumber.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  prefix: PropTypes.node,
  postfix: PropTypes.node,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  plaintext: PropTypes.bool,
  scrollable: PropTypes.bool,
  size: oneOf(['lg', 'md', 'sm', 'xs']),
  buttonAppearance: oneOf(['default', 'primary', 'link', 'subtle', 'ghost']),
  onWheel: PropTypes.func,
  onChange: PropTypes.func
};
export default InputNumber;