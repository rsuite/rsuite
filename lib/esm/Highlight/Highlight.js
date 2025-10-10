'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "children", "query", "renderMark"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { highlightText } from "./utils/highlightText.js";
import { stringifyReactNode } from "../internals/utils/index.js";
import { useCustom } from "../CustomProvider/index.js";
function defaultRenderMark(match, index) {
  return /*#__PURE__*/React.createElement("mark", {
    key: index,
    className: "rs-highlight-mark"
  }, match);
}

/**
 *
 * Highlight the matching text in the content.
 *
 * @see https://rsuitejs.com/components/highlight
 */
var Highlight = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Highlight', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'highlight' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    query = propsWithDefaults.query,
    _propsWithDefaults$re = propsWithDefaults.renderMark,
    renderMark = _propsWithDefaults$re === void 0 ? defaultRenderMark : _propsWithDefaults$re,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  var text = stringifyReactNode(children);
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: classes
  }, rest), highlightText(text, {
    query: query,
    renderMark: renderMark
  }));
});
Highlight.displayName = 'Highlight';
Highlight.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  as: PropTypes.elementType
};
export default Highlight;