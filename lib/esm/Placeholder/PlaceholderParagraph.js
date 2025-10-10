'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
var _excluded = ["as", "className", "rows", "rowHeight", "rowMargin", "rowSpacing", "graph", "active", "classPrefix"];
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { oneOf } from "../internals/propTypes/index.js";
/**
 * The `Placeholder.Paragraph` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
var PlaceholderParagraph = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('PlaceholderParagraph', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$ro = propsWithDefaults.rows,
    rows = _propsWithDefaults$ro === void 0 ? 2 : _propsWithDefaults$ro,
    _propsWithDefaults$ro2 = propsWithDefaults.rowHeight,
    rowHeight = _propsWithDefaults$ro2 === void 0 ? 10 : _propsWithDefaults$ro2,
    _propsWithDefaults$ro3 = propsWithDefaults.rowMargin,
    rowMargin = _propsWithDefaults$ro3 === void 0 ? 20 : _propsWithDefaults$ro3,
    _propsWithDefaults$ro4 = propsWithDefaults.rowSpacing,
    rowSpacing = _propsWithDefaults$ro4 === void 0 ? rowMargin : _propsWithDefaults$ro4,
    graph = propsWithDefaults.graph,
    active = propsWithDefaults.active,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'placeholder' : _propsWithDefaults$cl,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var graphShape = graph === true ? 'square' : graph;
  var rowElements = useMemo(function () {
    var rowArr = [];
    for (var i = 0; i < rows; i++) {
      var styles = {
        height: rowHeight,
        marginTop: i > 0 ? rowSpacing : Number(rowSpacing) / 2
      };
      rowArr.push(/*#__PURE__*/React.createElement("div", {
        key: i,
        style: styles,
        className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["row"])))
      }));
    }
    return rowArr;
  }, [prefix, rowHeight, rowSpacing, rows]);
  var classes = merge(className, withClassPrefix('paragraph', {
    active: active
  }));
  var graphClasses = prefix('paragraph-graph', "paragraph-graph-" + graphShape);
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), graphShape && /*#__PURE__*/React.createElement("div", {
    className: graphClasses
  }, /*#__PURE__*/React.createElement("span", {
    className: prefix('paragraph-graph-inner')
  })), /*#__PURE__*/React.createElement("div", {
    className: prefix('paragraph-group')
  }, rowElements));
});
PlaceholderParagraph.displayName = 'PlaceholderParagraph';
PlaceholderParagraph.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  rows: PropTypes.number,
  rowHeight: PropTypes.number,
  rowSpacing: PropTypes.number,
  graph: PropTypes.oneOfType([PropTypes.bool, oneOf(['circle', 'square', 'image'])]),
  active: PropTypes.bool
};
export default PlaceholderParagraph;