'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { precisionMath } from "./utils.js";
import Mark from "./Mark.js";
var Graduated = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var activeIndexs = [];
  var startIndex = 0;
  var endIndex = 0;
  if (Array.isArray(value)) {
    var start = value[0],
      end = value[1];
    startIndex = precisionMath(start / step - min / step);
    endIndex = precisionMath(end / step - min / step);
    activeIndexs.push(precisionMath(Math.ceil((start - min) / (max - min) * count)));
    activeIndexs.push(precisionMath(Math.ceil((end - min) / (max - min) * count)));
  } else {
    endIndex = precisionMath(value / step - min / step);
    activeIndexs.push(precisionMath(Math.ceil((value - min) / (max - min) * count)));
  }
  var graduatedItems = [];
  for (var i = 0; i < count; i += 1) {
    var _classes = prefix({
      pass: i >= startIndex && i <= endIndex,
      active: ~activeIndexs.indexOf(i)
    });
    var mark = precisionMath(i * step + min);
    var lastMark = Math.min(max, mark + step);
    var last = i === count - 1;
    graduatedItems.push(/*#__PURE__*/React.createElement("li", {
      className: _classes,
      key: i
    }, /*#__PURE__*/React.createElement(Mark, {
      mark: mark,
      renderMark: renderMark
    }), last ? /*#__PURE__*/React.createElement(Mark, {
      mark: lastMark,
      renderMark: renderMark,
      last: last
    }) : null));
  }
  var classes = merge(className, prefix('graduator'));
  return /*#__PURE__*/React.createElement(Component, {
    ref: ref,
    className: classes
  }, /*#__PURE__*/React.createElement("ol", null, graduatedItems));
});
Graduated.displayName = 'Graduated';
Graduated.propTypes = {
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  count: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  renderMark: PropTypes.func
};
export default Graduated;