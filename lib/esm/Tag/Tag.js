'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2;
var _excluded = ["as", "classPrefix", "size", "color", "children", "closable", "className", "locale", "onClose"];
import React from 'react';
import PropTypes from 'prop-types';
import CloseButton from "../internals/CloseButton/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Tag` component is used to label and categorize.
 * It can be used to mark the status of an object or classify it into different categories.
 *
 * @see https://rsuitejs.com/components/tag
 */
var Tag = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Tag', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    getLocale = _useCustom.getLocale;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'tag' : _propsWithDefaults$cl,
    _propsWithDefaults$si = propsWithDefaults.size,
    size = _propsWithDefaults$si === void 0 ? 'md' : _propsWithDefaults$si,
    _propsWithDefaults$co = propsWithDefaults.color,
    color = _propsWithDefaults$co === void 0 ? 'default' : _propsWithDefaults$co,
    children = propsWithDefaults.children,
    closable = propsWithDefaults.closable,
    className = propsWithDefaults.className,
    overrideLocale = propsWithDefaults.locale,
    onClose = propsWithDefaults.onClose,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _getLocale = getLocale('common', overrideLocale),
    remove = _getLocale.remove;
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(size, color, {
    closable: closable
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement("span", {
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["text"])))
  }, children), closable && /*#__PURE__*/React.createElement(CloseButton, {
    className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["icon-close"]))),
    onClick: onClose,
    tabIndex: -1,
    locale: {
      closeLabel: remove
    }
  }));
});
Tag.displayName = 'Tag';
Tag.propTypes = {
  closable: PropTypes.bool,
  classPrefix: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  as: PropTypes.elementType
};
export default Tag;