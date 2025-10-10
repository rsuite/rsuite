'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "gutter", "children", "style"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { ReactChildren } from "../internals/utils/index.js";
/**
 * The `Row` component is used for layout and grids.
 * @see https://rsuitejs.com/components/grid
 */
var Row = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Row', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'row' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    gutter = propsWithDefaults.gutter,
    children = propsWithDefaults.children,
    style = propsWithDefaults.style,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  var cols = children;
  var rowStyles = style;
  if (typeof gutter !== 'undefined') {
    var padding = gutter / 2;
    cols = ReactChildren.mapCloneElement(children, function (child) {
      return _extends({}, child.props, {
        style: _extends({}, child.props.style, {
          paddingLeft: padding,
          paddingRight: padding
        })
      });
    });
    rowStyles = _extends({}, style, {
      marginLeft: -padding,
      marginRight: -padding
    });
  }
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "row"
  }, rest, {
    ref: ref,
    className: classes,
    style: rowStyles
  }), cols);
});
Row.displayName = 'Row';
Row.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  gutter: PropTypes.number,
  style: PropTypes.any,
  as: PropTypes.elementType,
  children: PropTypes.node
};
export default Row;