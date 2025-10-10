'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends4 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes2 = require("../internals/propTypes");
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "children", "classPrefix", "className", "placement", "shape", "autoplay", "autoplayInterval", "activeIndex", "defaultActiveIndex", "onSelect", "onSlideStart", "onSlideEnd"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The Carousel component is used to display a series of content.
 * @see https://rsuitejs.com/components/carousel
 */
var Carousel = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _sliderStyles, _ref;
  var _useCustom = (0, _CustomProvider.useCustom)('Carousel', props),
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var count = _utils.ReactChildren.count(children);
  var labels = [];
  var vertical = placement === 'left' || placement === 'right';
  var lengthKey = vertical ? 'height' : 'width';
  var _useControlled = (0, _hooks.useControlled)(activeIndexProp, defaultActiveIndex),
    activeIndex = _useControlled[0],
    setActiveIndex = _useControlled[1],
    isControlled = _useControlled[2];
  var _useState = (0, _react.useState)(0),
    lastIndex = _useState[0],
    setLastIndex = _useState[1];
  var rootRef = (0, _react.useRef)(null);
  (0, _hooks.useUpdateEffect)(function () {
    // When the index is controlled, the index is not updated when the number of children changes.
    if (isControlled) {
      return;
    }
    // Reset the index when the number of children changes.
    setActiveIndex(0);
  }, [children, isControlled]);

  // Set a timer for automatic playback.
  // `autoplay` needs to be cast to boolean type to avoid undefined parameters.
  var _useTimeout = (0, _hooks.useTimeout)(function () {
      return handleSlide();
    }, autoplayInterval, !!autoplay && count > 1),
    clear = _useTimeout.clear,
    reset = _useTimeout.reset;
  var handleSlide = (0, _react.useCallback)(function (nextActiveIndex, event) {
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
  var handleTransitionEnd = (0, _react.useCallback)(function (event) {
    onSlideEnd === null || onSlideEnd === void 0 || onSlideEnd(activeIndex, event);
  }, [activeIndex, onSlideEnd]);
  var uniqueId = (0, _react.useMemo)(function () {
    return (0, _utils.guid)();
  }, []);
  var items = _utils.ReactChildren.map(children, function (child, index) {
    var _extends2;
    if (!child) {
      return;
    }
    var inputKey = "indicator_" + uniqueId + "_" + index;
    labels.push(/*#__PURE__*/_react.default.createElement("li", {
      key: "label" + index,
      className: prefix('label-wrapper')
    }, /*#__PURE__*/_react.default.createElement("input", {
      name: inputKey,
      id: inputKey,
      type: "radio",
      onChange: handleChange,
      value: index,
      checked: activeIndex === index
    }), /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: inputKey,
      className: prefix('label')
    })));
    return /*#__PURE__*/_react.default.cloneElement(child, {
      key: "slider-item" + index,
      'aria-hidden': activeIndex !== index,
      style: (0, _extends4.default)({}, child.props.style, (_extends2 = {}, _extends2[lengthKey] = 100 / count + "%", _extends2)),
      className: (0, _classnames.default)(prefix('slider-item'), child.props.className)
    });
  });
  var classes = merge(className, withClassPrefix("placement-" + placement, "shape-" + shape));
  var positiveOrder = vertical || !rtl;
  var sign = positiveOrder ? '-' : '';
  var activeRatio = "" + sign + 100 / count * activeIndex + "%";
  var sliderStyles = (_sliderStyles = {}, _sliderStyles[lengthKey] = count * 100 + "%", _sliderStyles.transform = vertical ? "translate3d(0, " + activeRatio + " ,0)" : "translate3d(" + activeRatio + ", 0 ,0)", _sliderStyles);
  var showMask = count > 1 && activeIndex === 0 && activeIndex !== lastIndex;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends4.default)({}, rest, {
    ref: (0, _utils.mergeRefs)(ref, rootRef),
    className: classes
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('content')
  }, /*#__PURE__*/_react.default.createElement("div", {
    "data-testid": "carousel-slider",
    className: prefix('slider'),
    style: sliderStyles,
    onTransitionEnd: handleTransitionEnd
  }, items), showMask && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('slider-after', {
      'slider-after-vertical': vertical
    }),
    style: (_ref = {}, _ref[lengthKey] = '200%', _ref)
  }, [items[items.length - 1], items[0]].map(function (node) {
    var _extends3;
    return /*#__PURE__*/_react.default.cloneElement(node, {
      key: node.key,
      style: (0, _extends4.default)({}, node.props.style, (_extends3 = {}, _extends3[lengthKey] = '50%', _extends3))
    });
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('toolbar')
  }, /*#__PURE__*/_react.default.createElement("ul", null, labels)));
});
Carousel.displayName = 'Carousel';
Carousel.propTypes = {
  as: _propTypes.default.elementType,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  activeIndex: _propTypes.default.number,
  defaultActiveIndex: _propTypes.default.number,
  autoplay: _propTypes.default.bool,
  autoplayInterval: _propTypes.default.number,
  placement: (0, _propTypes2.oneOf)(['top', 'bottom', 'left', 'right']),
  shape: (0, _propTypes2.oneOf)(['dot', 'bar']),
  onSelect: _propTypes.default.func,
  onSlideStart: _propTypes.default.func,
  onSlideEnd: _propTypes.default.func
};
var _default = exports.default = Carousel;