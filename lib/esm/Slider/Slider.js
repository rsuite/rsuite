'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["aria-label", "aria-labelledby", "aria-valuetext", "as", "graduated", "className", "barClassName", "progress", "vertical", "disabled", "readOnly", "plaintext", "classPrefix", "min", "handleClassName", "handleStyle", "handleTitle", "tooltip", "step", "defaultValue", "value", "max", "placeholder", "getAriaValueText", "renderTooltip", "renderMark", "onChange", "onChangeCommitted", "keepTooltipOpen"];
import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import getWidth from 'dom-lib/getWidth';
import getHeight from 'dom-lib/getHeight';
import getOffset from 'dom-lib/getOffset';
import ProgressBar from "./ProgressBar.js";
import Handle from "./Handle.js";
import Graduated from "./Graduated.js";
import Plaintext from "../internals/Plaintext/index.js";
import { useClassNames, useControlled, useEventCallback } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { precisionMath, checkValue, getPosition } from "./utils.js";
export var sliderPropTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  handleClassName: PropTypes.string,
  handleTitle: PropTypes.node,
  barClassName: PropTypes.string,
  handleStyle: PropTypes.object,
  disabled: PropTypes.bool,
  plaintext: PropTypes.bool,
  readOnly: PropTypes.bool,
  graduated: PropTypes.bool,
  tooltip: PropTypes.bool,
  progress: PropTypes.bool,
  vertical: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeCommitted: PropTypes.func,
  renderMark: PropTypes.func,
  renderTooltip: PropTypes.func,
  getAriaValueText: PropTypes.func
};

/**
 * A Slider is an interface for users to adjust a value in a specific range.
 *
 * @see https://rsuitejs.com/components/slider
 */
var Slider = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Slider', props),
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
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var barRef = useRef(null);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var _useCustom2 = useCustom('Slider'),
    rtl = _useCustom2.rtl;
  var classes = merge(className, withClassPrefix({
    vertical: vertical,
    disabled: disabled,
    graduated: graduated,
    'with-mark': renderMark,
    readonly: readOnly
  }));
  var max = useMemo(function () {
    return precisionMath(Math.floor((maxProp - min) / step) * step + min);
  }, [maxProp, min, step]);

  /**
   * Returns a valid value that does not exceed the specified range of values.
   */
  var getValidValue = useCallback(function (value) {
    return checkValue(value, min, max);
  }, [max, min]);
  var _useControlled = useControlled(getValidValue(valueProp), getValidValue(defaultValue)),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var count = useMemo(function () {
    return precisionMath((max - min) / step);
  }, [max, min, step]);

  // Get the height of the progress bar
  var getBarHeight = useCallback(function () {
    return barRef.current ? getHeight(barRef.current) : 0;
  }, []);
  // Get the width of the progress bar
  var getBarWidth = useCallback(function () {
    return barRef.current ? getWidth(barRef.current) : 0;
  }, []);
  var getValueByOffset = useCallback(function (offset) {
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
    return precisionMath(value);
  }, [count, getBarHeight, getBarWidth, step, vertical]);

  /**
   * A value within the valid range is calculated from the position triggered by the event.
   */
  var getValueByPosition = useCallback(function (event) {
    var barOffset = getOffset(barRef.current);
    var _getPosition = getPosition(event),
      pageX = _getPosition.pageX,
      pageY = _getPosition.pageY;
    var offset = vertical ? barOffset.top + barOffset.height - pageY : pageX - barOffset.left;
    var offsetValue = rtl && !vertical ? barOffset.width - offset : offset;
    return getValueByOffset(offsetValue) + min;
  }, [getValueByOffset, min, rtl, vertical]);

  /**
   * Callback function that is fired when the mousemove is triggered
   */
  var handleChangeValue = useEventCallback(function (event) {
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
  var handleChangeCommitted = useEventCallback(function (event) {
    if (disabled || readOnly) {
      return;
    }
    var nextValue = getValidValue(getValueByPosition(event));
    onChangeCommitted === null || onChangeCommitted === void 0 || onChangeCommitted(nextValue, event);
  });
  var handleClickBar = useEventCallback(function (event) {
    handleChangeValue(event);
    handleChangeCommitted(event);
  });
  var handleKeyDown = useEventCallback(function (event) {
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
    return /*#__PURE__*/React.createElement(Plaintext, {
      localeKey: "notSelected",
      ref: ref,
      placeholder: placeholder
    }, value);
  }
  return /*#__PURE__*/React.createElement(Componnet, _extends({}, rest, {
    ref: ref,
    className: classes,
    role: "presentation"
  }), /*#__PURE__*/React.createElement("div", {
    ref: barRef,
    className: merge(barClassName, prefix('bar')),
    onClick: handleClickBar,
    "data-testid": "slider-bar"
  }, progress && /*#__PURE__*/React.createElement(ProgressBar, {
    rtl: rtl,
    vertical: vertical,
    start: 0,
    end: (value - min) / (max - min) * 100
  }), graduated && /*#__PURE__*/React.createElement(Graduated, {
    step: step,
    min: min,
    max: max,
    count: count,
    value: value,
    renderMark: renderMark
  })), /*#__PURE__*/React.createElement(Handle, {
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
export default Slider;