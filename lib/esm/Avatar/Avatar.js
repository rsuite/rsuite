'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2;
var _excluded = ["as", "bordered", "alt", "className", "children", "circle", "color", "classPrefix", "size", "src", "srcSet", "sizes", "style", "imgProps", "onError"];
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { isIE } from "../internals/utils/index.js";
import { AvatarGroupContext } from "../AvatarGroup/AvatarGroup.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
import AvatarIcon from "./AvatarIcon.js";
import useImage from "./useImage.js";
/**
 * The Avatar component is used to represent user or brand.
 * @see https://rsuitejs.com/components/avatar
 */
var Avatar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _extends2;
  var _useContext = useContext(AvatarGroupContext),
    groupSize = _useContext.size,
    spacing = _useContext.spacing;
  var _useCustom = useCustom('Avatar', props),
    rtl = _useCustom.rtl,
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    bordered = propsWithDefaults.bordered,
    alt = propsWithDefaults.alt,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    circle = propsWithDefaults.circle,
    color = propsWithDefaults.color,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'avatar' : _propsWithDefaults$cl,
    _propsWithDefaults$si = propsWithDefaults.size,
    size = _propsWithDefaults$si === void 0 ? groupSize : _propsWithDefaults$si,
    src = propsWithDefaults.src,
    srcSet = propsWithDefaults.srcSet,
    sizes = propsWithDefaults.sizes,
    style = propsWithDefaults.style,
    imgProps = propsWithDefaults.imgProps,
    onError = propsWithDefaults.onError,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(size, color, {
    circle: circle,
    bordered: bordered
  }));
  var imageProps = _extends({}, imgProps, {
    alt: alt,
    src: src,
    srcSet: srcSet,
    sizes: sizes
  });
  var _useImage = useImage(_extends({}, imageProps, {
      onError: onError
    })),
    loaded = _useImage.loaded;
  var altComponent = useMemo(function () {
    if (alt) {
      return /*#__PURE__*/React.createElement("span", {
        role: "img",
        "aria-label": alt
      }, alt);
    }
    return null;
  }, [alt]);
  var placeholder = children || altComponent || /*#__PURE__*/React.createElement(AvatarIcon, {
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["icon"])))
  });
  var image = loaded ? /*#__PURE__*/React.createElement("img", _extends({}, imageProps, {
    className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["image"])))
  })) : placeholder;
  var margin = rtl ? 'marginLeft' : 'marginRight';
  var insertStyles = isIE() && spacing ? _extends((_extends2 = {}, _extends2[margin] = spacing, _extends2), style) : style;
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes,
    style: insertStyles
  }), src ? image : placeholder);
});
Avatar.displayName = 'Avatar';
Avatar.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  size: oneOf(['xxl', 'xl', 'lg', 'md', 'sm', 'xs']),
  src: PropTypes.string,
  sizes: PropTypes.string,
  srcSet: PropTypes.string,
  imgProps: PropTypes.object,
  circle: PropTypes.bool,
  alt: PropTypes.string
};
export default Avatar;