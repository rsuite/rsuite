'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _utils = require("./utils");
var _Mark = _interopRequireDefault(require("./Mark"));
var Graduated = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    step = props.step,
    min = props.min,
    max = props.max,
    count = props.count,
    value = props.value,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'slider' : _props$classPrefix,
    className = props.className,
    renderMark = props.renderMark;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var activeIndexs = [];
  var startIndex = 0;
  var endIndex = 0;
  if (Array.isArray(value)) {
    var start = value[0],
      end = value[1];
    startIndex = (0, _utils.precisionMath)(start / step - min / step);
    endIndex = (0, _utils.precisionMath)(end / step - min / step);
    activeIndexs.push((0, _utils.precisionMath)(Math.ceil((start - min) / (max - min) * count)));
    activeIndexs.push((0, _utils.precisionMath)(Math.ceil((end - min) / (max - min) * count)));
  } else {
    endIndex = (0, _utils.precisionMath)(value / step - min / step);
    activeIndexs.push((0, _utils.precisionMath)(Math.ceil((value - min) / (max - min) * count)));
  }
  var graduatedItems = [];
  for (var i = 0; i < count; i += 1) {
    var _classes = prefix({
      pass: i >= startIndex && i <= endIndex,
      active: ~activeIndexs.indexOf(i)
    });
    var mark = (0, _utils.precisionMath)(i * step + min);
    var lastMark = Math.min(max, mark + step);
    var last = i === count - 1;
    graduatedItems.push(/*#__PURE__*/_react.default.createElement("li", {
      className: _classes,
      key: i
    }, /*#__PURE__*/_react.default.createElement(_Mark.default, {
      mark: mark,
      renderMark: renderMark
    }), last ? /*#__PURE__*/_react.default.createElement(_Mark.default, {
      mark: lastMark,
      renderMark: renderMark,
      last: last
    }) : null));
  }
  var classes = merge(className, prefix('graduator'));
  return /*#__PURE__*/_react.default.createElement(Component, {
    ref: ref,
    className: classes
  }, /*#__PURE__*/_react.default.createElement("ol", null, graduatedItems));
});
Graduated.displayName = 'Graduated';
Graduated.propTypes = {
  step: _propTypes.default.number,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  count: _propTypes.default.number,
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.number)]),
  renderMark: _propTypes.default.func
};
var _default = exports.default = Graduated;