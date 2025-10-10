'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["aria-label", "aria-labelledby", "aria-valuetext", "as", "barClassName", "className", "classPrefix", "constraint", "defaultValue", "disabled", "graduated", "progress", "keepTooltipOpen", "vertical", "readOnly", "min", "max", "step", "value", "handleClassName", "handleStyle", "handleTitle", "tooltip", "getAriaValueText", "renderTooltip", "renderMark", "onChange", "onChangeCommitted"];
import React, { useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import getWidth from 'dom-lib/getWidth';
import getHeight from 'dom-lib/getHeight';
import getOffset from 'dom-lib/getOffset';
import ProgressBar from "../Slider/ProgressBar.js";
import Handle from "../Slider/Handle.js";
import Graduated from "../Slider/Graduated.js";
import { useClassNames, useControlled, useEventCallback } from "../internals/hooks/index.js";
import { sliderPropTypes } from "../Slider/Slider.js";
import { precisionMath, checkValue, getPosition } from "../Slider/utils.js";
import { tupleType } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
var defaultDefaultValue = [0, 0];

/**
 * The `RangeSlider` component is used to select a range from a given numerical range.
 * @see https://rsuitejs.com/components/slider/
 */
var RangeSlider = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('RangeSlider', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var ariaLabel = propsWithDefaults['aria-label'],
    ariaLabelledby = propsWithDefaults['aria-labelledby'],
    ariaValuetext = propsWithDefaults['aria-valuetext'],
    _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    barClassName = propsWithDefaults.barClassName,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'slider' : _propsWithDefaults$cl,
    constraint = propsWithDefaults.constraint,
    _propsWithDefaults$de = propsWithDefaults.defaultValue,
    defaultValue = _propsWithDefaults$de === void 0 ? defaultDefaultValue : _propsWithDefaults$de,
    disabled = propsWithDefaults.disabled,
    graduated = propsWithDefaults.graduated,
    _propsWithDefaults$pr = propsWithDefaults.progress,
    progress = _propsWithDefaults$pr === void 0 ? true : _propsWithDefaults$pr,
    _propsWithDefaults$ke = propsWithDefaults.keepTooltipOpen,
    keepTooltipOpen = _propsWithDefaults$ke === void 0 ? false : _propsWithDefaults$ke,
    vertical = propsWithDefaults.vertical,
    readOnly = propsWithDefaults.readOnly,
    _propsWithDefaults$mi = propsWithDefaults.min,
    min = _propsWithDefaults$mi === void 0 ? 0 : _propsWithDefaults$mi,
    _propsWithDefaults$ma = propsWithDefaults.max,
    maxProp = _propsWithDefaults$ma === void 0 ? 100 : _propsWithDefaults$ma,
    _propsWithDefaults$st = propsWithDefaults.step,
    step = _propsWithDefaults$st === void 0 ? 1 : _propsWithDefaults$st,
    valueProp = propsWithDefaults.value,
    handleClassName = propsWithDefaults.handleClassName,
    handleStyle = propsWithDefaults.handleStyle,
    handleTitle = propsWithDefaults.handleTitle,
    _propsWithDefaults$to = propsWithDefaults.tooltip,
    tooltip = _propsWithDefaults$to === void 0 ? true : _propsWithDefaults$to,
    getAriaValueText = propsWithDefaults.getAriaValueText,
    renderTooltip = propsWithDefaults.renderTooltip,
    renderMark = propsWithDefaults.renderMark,
    onChange = propsWithDefaults.onChange,
    onChangeCommitted = propsWithDefaults.onChangeCommitted,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var barRef = useRef(null);

  // Define the parameter position of the handle
  var handleIndexs = useRef([0, 1]);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var _useCustom2 = useCustom('RangeSlider'),
    rtl = _useCustom2.rtl;
  var classes = merge(className, withClassPrefix({
    vertical: vertical,
    disabled: disabled,
    graduated: graduated,
    'with-mark': renderMark
  }));
  var max = useMemo(function () {
    return precisionMath(Math.floor((maxProp - min) / step) * step + min);
  }, [maxProp, min, step]);

  /**
   * Returns a valid value that does not exceed the specified range of values.
   */
  var getValidValue = useCallback(function (value) {
    if (typeof value === 'undefined') {
      return;
    }
    return [checkValue(value[0], min, max), checkValue(value[1], min, max)];
  }, [max, min]);
  var _useControlled = useControlled(getValidValue(valueProp), getValidValue(defaultValue)),
    value = _useControlled[0],
    setValue = _useControlled[1];

  // The count of values ​​that can be entered.
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
    var val = 0;
    if (isNaN(offset)) {
      return val;
    }
    if (vertical) {
      var barHeight = getBarHeight();
      val = Math.round(offset / (barHeight / count)) * step;
    } else {
      var barWidth = getBarWidth();
      val = Math.round(offset / (barWidth / count)) * step;
    }
    return precisionMath(val);
  }, [count, getBarHeight, getBarWidth, step, vertical]);
  var getValueByPosition = useCallback(function (event) {
    var barOffset = getOffset(barRef.current);
    var _getPosition = getPosition(event),
      pageX = _getPosition.pageX,
      pageY = _getPosition.pageY;
    var offset = vertical ? barOffset.top + barOffset.height - pageY : pageX - barOffset.left;
    var val = rtl && !vertical ? barOffset.width - offset : offset;
    return getValueByOffset(val) + min;
  }, [getValueByOffset, min, rtl, vertical]);
  var getRangeValue = useCallback(function (value, key, event) {
    // Get the corresponding value according to the cursor position
    var v = getValueByPosition(event);

    // Judge the handle key and put the corresponding value at the start or end.
    if (key === 'start') {
      return [v, value[1]];
    } else if (key === 'end') {
      return [value[0], v];
    }
    return value;
  }, [getValueByPosition]);
  var getNextValue = useCallback(function (event, dataset) {
    var eventKey = dataset.key,
      range = dataset.range;
    var value = range.split(',').map(function (i) {
      return +i;
    });
    var nextValue = getValidValue(getRangeValue(value, eventKey, event));
    if (nextValue[0] >= nextValue[1]) {
      /**
       * When the value of `start` is greater than the value of` end`,
       * the position of the handle is reversed.
       */
      handleIndexs.current.reverse();
      if (eventKey === 'start') {
        nextValue[0] = value[1];
      } else {
        nextValue[1] = value[0];
      }
    }
    return nextValue;
  }, [getRangeValue, getValidValue]);

  /**
   * Whether a range is valid against given constraint (if any)
   * Should check before every `setValue` calls
   */
  var isRangeMatchingConstraint = useCallback(function (range) {
    // If no constraint is defined, any range is valid
    if (!constraint) return true;
    return constraint(range);
  }, [constraint]);

  /**
   * Callback function that is fired when the mousemove is triggered
   */
  var handleDragMove = useEventCallback(function (event, dataset) {
    if (disabled || readOnly) {
      return;
    }
    var nextValue = getNextValue(event, dataset);
    if (isRangeMatchingConstraint(nextValue)) {
      setValue(nextValue);
      onChange === null || onChange === void 0 || onChange(nextValue, event);
    }
  });

  /**
   * Callback function that is fired when the mouseup is triggered
   */
  var handleChangeCommitted = useEventCallback(function (event, dataset) {
    if (disabled || readOnly) {
      return;
    }
    var nextValue = getNextValue(event, dataset);
    if (isRangeMatchingConstraint(nextValue)) {
      setValue(nextValue);
      onChangeCommitted === null || onChangeCommitted === void 0 || onChangeCommitted(nextValue, event);
    }
  });
  var handleKeyDown = useEventCallback(function (event) {
    var _event$target;
    var _event$target$dataset = (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target['dataset'],
      key = _event$target$dataset.key;
    var nextValue = [].concat(value);
    var increaseKey = rtl ? 'ArrowLeft' : 'ArrowRight';
    var decreaseKey = rtl ? 'ArrowRight' : 'ArrowLeft';
    var valueIndex = key === 'start' ? 0 : 1;
    switch (event.key) {
      case 'Home':
        nextValue[valueIndex] = min;
        break;
      case 'End':
        nextValue[valueIndex] = max;
        break;
      case increaseKey:
      case 'ArrowUp':
        nextValue[valueIndex] = Math.min(max, value[valueIndex] + step);
        break;
      case decreaseKey:
      case 'ArrowDown':
        nextValue[valueIndex] = Math.max(min, value[valueIndex] - step);
        break;
      default:
        return;
    }

    // When the start value is greater than the end value, let the handle and value switch positions.
    if (nextValue[0] >= nextValue[1]) {
      nextValue.reverse();
      handleIndexs.current.reverse();
    }

    // Prevent scroll of the page
    event.preventDefault();
    if (isRangeMatchingConstraint(nextValue)) {
      setValue(nextValue);
      onChange === null || onChange === void 0 || onChange(nextValue, event);
    }
  });
  var handleBarClick = useEventCallback(function (event) {
    if (disabled || readOnly) {
      return;
    }
    var start = value[0],
      end = value[1];
    var v = getValueByPosition(event);

    //  Judging that the current click value is closer to the values ​​of `start` and` end`.
    if (Math.abs(start - v) < Math.abs(end - v)) {
      start = v;
    } else {
      end = v;
    }
    var nextValue = getValidValue([start, end].sort(function (a, b) {
      return a - b;
    }));
    if (isRangeMatchingConstraint(nextValue)) {
      setValue(nextValue);
      onChange === null || onChange === void 0 || onChange(nextValue, event);
      onChangeCommitted === null || onChangeCommitted === void 0 || onChangeCommitted(nextValue, event);
    }
  });
  var handleProps = useMemo(function () {
    return [{
      value: value[0],
      'data-key': 'start',
      'aria-valuenow': value[0],
      'aria-valuetext': getAriaValueText ? getAriaValueText(value[0], 'start') : ariaValuetext,
      position: (value[0] - min) / (max - min) * 100
    }, {
      value: value[1],
      'data-key': 'end',
      'aria-valuenow': value[1],
      'aria-valuetext': getAriaValueText ? getAriaValueText(value[1], 'end') : ariaValuetext,
      position: (value[1] - min) / (max - min) * 100
    }];
  }, [ariaValuetext, getAriaValueText, max, min, value]);
  var handleCommonProps = {
    rtl: rtl,
    disabled: disabled,
    vertical: vertical,
    tooltip: tooltip,
    className: handleClassName,
    style: handleStyle,
    renderTooltip: renderTooltip,
    onDragMove: handleDragMove,
    onDragEnd: handleChangeCommitted,
    onKeyDown: handleKeyDown,
    tabIndex: disabled ? undefined : 0,
    'aria-orientation': vertical ? 'vertical' : 'horizontal',
    'aria-disabled': disabled,
    'aria-valuemax': max,
    'aria-valuemin': min,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    keepTooltipOpen: keepTooltipOpen
  };
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement("div", {
    className: merge(barClassName, prefix('bar')),
    ref: barRef,
    onClick: handleBarClick
  }, progress && /*#__PURE__*/React.createElement(ProgressBar, {
    rtl: rtl,
    vertical: vertical,
    start: (value[0] - min) / (max - min) * 100,
    end: (value[1] - min) / (max - min) * 100
  }), graduated && /*#__PURE__*/React.createElement(Graduated, {
    step: step,
    min: min,
    max: max,
    count: count,
    value: value,
    renderMark: renderMark
  })), /*#__PURE__*/React.createElement(Handle, _extends({
    "data-range": value
  }, handleCommonProps, handleProps[handleIndexs.current[0]]), handleTitle), /*#__PURE__*/React.createElement(Handle, _extends({
    "data-range": value
  }, handleCommonProps, handleProps[handleIndexs.current[1]]), handleTitle));
});
RangeSlider.displayName = 'RangeSlider';
RangeSlider.propTypes = _extends({}, sliderPropTypes, {
  value: tupleType(PropTypes.number.isRequired, PropTypes.number.isRequired),
  defaultValue: tupleType(PropTypes.number.isRequired, PropTypes.number.isRequired)
});
export default RangeSlider;