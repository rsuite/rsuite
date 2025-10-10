'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "children", "classPrefix", "className", "placement", "shape", "autoplay", "autoplayInterval", "activeIndex", "defaultActiveIndex", "onSelect", "onSlideStart", "onSlideEnd"];
import React, { useState, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { oneOf } from "../internals/propTypes/index.js";
import { useClassNames, useControlled, useUpdateEffect, useTimeout } from "../internals/hooks/index.js";
import { guid, ReactChildren, mergeRefs } from "../internals/utils/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The Carousel component is used to display a series of content.
 * @see https://rsuitejs.com/components/carousel
 */
var Carousel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _sliderStyles, _ref;
  var _useCustom = useCustom('Carousel', props),
    rtl = _useCustom.rtl,
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    children = propsWithDefaults.children,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'carousel' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottom' : _propsWithDefaults$pl,
    _propsWithDefaults$sh = propsWithDefaults.shape,
    shape = _propsWithDefaults$sh === void 0 ? 'dot' : _propsWithDefaults$sh,
    autoplay = propsWithDefaults.autoplay,
    _propsWithDefaults$au = propsWithDefaults.autoplayInterval,
    autoplayInterval = _propsWithDefaults$au === void 0 ? 4000 : _propsWithDefaults$au,
    activeIndexProp = propsWithDefaults.activeIndex,
    _propsWithDefaults$de = propsWithDefaults.defaultActiveIndex,
    defaultActiveIndex = _propsWithDefaults$de === void 0 ? 0 : _propsWithDefaults$de,
    onSelect = propsWithDefaults.onSelect,
    onSlideStart = propsWithDefaults.onSlideStart,
    onSlideEnd = propsWithDefaults.onSlideEnd,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var count = ReactChildren.count(children);
  var labels = [];
  var vertical = placement === 'left' || placement === 'right';
  var lengthKey = vertical ? 'height' : 'width';
  var _useControlled = useControlled(activeIndexProp, defaultActiveIndex),
    activeIndex = _useControlled[0],
    setActiveIndex = _useControlled[1],
    isControlled = _useControlled[2];
  var _useState = useState(0),
    lastIndex = _useState[0],
    setLastIndex = _useState[1];
  var rootRef = useRef(null);
  useUpdateEffect(function () {
    // When the index is controlled, the index is not updated when the number of children changes.
    if (isControlled) {
      return;
    }
    // Reset the index when the number of children changes.
    setActiveIndex(0);
  }, [children, isControlled]);

  // Set a timer for automatic playback.
  // `autoplay` needs to be cast to boolean type to avoid undefined parameters.
  var _useTimeout = useTimeout(function () {
      return handleSlide();
    }, autoplayInterval, !!autoplay && count > 1),
    clear = _useTimeout.clear,
    reset = _useTimeout.reset;
  var handleSlide = useCallback(function (nextActiveIndex, event) {
    if (!rootRef.current) {
      return;
    }
    clear();
    var index = nextActiveIndex !== null && nextActiveIndex !== void 0 ? nextActiveIndex : activeIndex + 1;

    // When index is greater than count, start from 1 again.
    var nextIndex = index % count;
    setActiveIndex(nextIndex);
    onSlideStart === null || onSlideStart === void 0 || onSlideStart(nextIndex, event);
    setLastIndex(nextActiveIndex == null ? activeIndex : nextIndex);
    reset();
  }, [activeIndex, count, setActiveIndex, clear, onSlideStart, reset]);
  var handleChange = function handleChange(event) {
    var activeIndex = +event.target.value;
    handleSlide(activeIndex, event);
    onSelect === null || onSelect === void 0 || onSelect(activeIndex, event);
  };
  var handleTransitionEnd = useCallback(function (event) {
    onSlideEnd === null || onSlideEnd === void 0 || onSlideEnd(activeIndex, event);
  }, [activeIndex, onSlideEnd]);
  var uniqueId = useMemo(function () {
    return guid();
  }, []);
  var items = ReactChildren.map(children, function (child, index) {
    var _extends2;
    if (!child) {
      return;
    }
    var inputKey = "indicator_" + uniqueId + "_" + index;
    labels.push(/*#__PURE__*/React.createElement("li", {
      key: "label" + index,
      className: prefix('label-wrapper')
    }, /*#__PURE__*/React.createElement("input", {
      name: inputKey,
      id: inputKey,
      type: "radio",
      onChange: handleChange,
      value: index,
      checked: activeIndex === index
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: inputKey,
      className: prefix('label')
    })));
    return /*#__PURE__*/React.cloneElement(child, {
      key: "slider-item" + index,
      'aria-hidden': activeIndex !== index,
      style: _extends({}, child.props.style, (_extends2 = {}, _extends2[lengthKey] = 100 / count + "%", _extends2)),
      className: classNames(prefix('slider-item'), child.props.className)
    });
  });
  var classes = merge(className, withClassPrefix("placement-" + placement, "shape-" + shape));
  var positiveOrder = vertical || !rtl;
  var sign = positiveOrder ? '-' : '';
  var activeRatio = "" + sign + 100 / count * activeIndex + "%";
  var sliderStyles = (_sliderStyles = {}, _sliderStyles[lengthKey] = count * 100 + "%", _sliderStyles.transform = vertical ? "translate3d(0, " + activeRatio + " ,0)" : "translate3d(" + activeRatio + ", 0 ,0)", _sliderStyles);
  var showMask = count > 1 && activeIndex === 0 && activeIndex !== lastIndex;
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: mergeRefs(ref, rootRef),
    className: classes
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix('content')
  }, /*#__PURE__*/React.createElement("div", {
    "data-testid": "carousel-slider",
    className: prefix('slider'),
    style: sliderStyles,
    onTransitionEnd: handleTransitionEnd
  }, items), showMask && /*#__PURE__*/React.createElement("div", {
    className: prefix('slider-after', {
      'slider-after-vertical': vertical
    }),
    style: (_ref = {}, _ref[lengthKey] = '200%', _ref)
  }, [items[items.length - 1], items[0]].map(function (node) {
    var _extends3;
    return /*#__PURE__*/React.cloneElement(node, {
      key: node.key,
      style: _extends({}, node.props.style, (_extends3 = {}, _extends3[lengthKey] = '50%', _extends3))
    });
  }))), /*#__PURE__*/React.createElement("div", {
    className: prefix('toolbar')
  }, /*#__PURE__*/React.createElement("ul", null, labels)));
});
Carousel.displayName = 'Carousel';
Carousel.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  activeIndex: PropTypes.number,
  defaultActiveIndex: PropTypes.number,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  placement: oneOf(['top', 'bottom', 'left', 'right']),
  shape: oneOf(['dot', 'bar']),
  onSelect: PropTypes.func,
  onSlideStart: PropTypes.func,
  onSlideEnd: PropTypes.func
};
export default Carousel;