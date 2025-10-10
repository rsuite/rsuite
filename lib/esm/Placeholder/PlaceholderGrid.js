'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
var _excluded = ["as", "className", "classPrefix", "rows", "columns", "rowHeight", "rowMargin", "rowSpacing", "active"];
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Placeholder.Grid` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
var PlaceholderGrid = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('PlaceholderGrid', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'placeholder' : _propsWithDefaults$cl,
    _propsWithDefaults$ro = propsWithDefaults.rows,
    rows = _propsWithDefaults$ro === void 0 ? 5 : _propsWithDefaults$ro,
    _propsWithDefaults$co = propsWithDefaults.columns,
    columns = _propsWithDefaults$co === void 0 ? 5 : _propsWithDefaults$co,
    _propsWithDefaults$ro2 = propsWithDefaults.rowHeight,
    rowHeight = _propsWithDefaults$ro2 === void 0 ? 10 : _propsWithDefaults$ro2,
    _propsWithDefaults$ro3 = propsWithDefaults.rowMargin,
    rowMargin = _propsWithDefaults$ro3 === void 0 ? 20 : _propsWithDefaults$ro3,
    _propsWithDefaults$ro4 = propsWithDefaults.rowSpacing,
    rowSpacing = _propsWithDefaults$ro4 === void 0 ? rowMargin : _propsWithDefaults$ro4,
    active = propsWithDefaults.active,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix('grid', {
    active: active
  }));
  var colItems = [];
  for (var i = 0; i < columns; i++) {
    var rowItems = [];
    for (var j = 0; j < rows; j++) {
      rowItems.push(/*#__PURE__*/React.createElement("div", {
        key: j,
        style: {
          height: rowHeight,
          marginTop: j > 0 ? rowSpacing : undefined
        },
        className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["row"])))
      }));
    }
    colItems.push(/*#__PURE__*/React.createElement("div", {
      key: i,
      className: classNames(prefix('grid-col'))
    }, rowItems));
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), colItems);
});
PlaceholderGrid.displayName = 'PlaceholderGrid';
PlaceholderGrid.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  rows: PropTypes.number,
  columns: PropTypes.number,
  rowHeight: PropTypes.number,
  rowSpacing: PropTypes.number,
  active: PropTypes.bool
};
export default PlaceholderGrid;