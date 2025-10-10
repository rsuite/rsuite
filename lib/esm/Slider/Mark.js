'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
var Mark = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'span' : _props$as,
    mark = props.mark,
    last = props.last,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'slider-mark' : _props$classPrefix,
    className = props.className,
    renderMark = props.renderMark;
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    last: last
  }));
  if (renderMark) {
    return /*#__PURE__*/React.createElement(Component, {
      ref: ref,
      className: classes
    }, /*#__PURE__*/React.createElement("span", {
      className: prefix('content')
    }, renderMark(mark)));
  }
  return null;
});
Mark.displayName = 'Mark';
Mark.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  mark: PropTypes.number,
  last: PropTypes.bool,
  renderMark: PropTypes.func
};
export default Mark;