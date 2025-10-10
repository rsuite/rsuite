'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _AvatarGroup = require("../AvatarGroup/AvatarGroup");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _AvatarIcon = _interopRequireDefault(require("./AvatarIcon"));
var _useImage2 = _interopRequireDefault(require("./useImage"));
var _templateObject, _templateObject2;
var _excluded = ["as", "bordered", "alt", "className", "children", "circle", "color", "classPrefix", "size", "src", "srcSet", "sizes", "style", "imgProps", "onError"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The Avatar component is used to represent user or brand.
 * @see https://rsuitejs.com/components/avatar
 */
var Avatar = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _extends2;
  var _useContext = (0, _react.useContext)(_AvatarGroup.AvatarGroupContext),
    groupSize = _useContext.size,
    spacing = _useContext.spacing;
  var _useCustom = (0, _CustomProvider.useCustom)('Avatar', props),
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(size, color, {
    circle: circle,
    bordered: bordered
  }));
  var imageProps = (0, _extends3.default)({}, imgProps, {
    alt: alt,
    src: src,
    srcSet: srcSet,
    sizes: sizes
  });
  var _useImage = (0, _useImage2.default)((0, _extends3.default)({}, imageProps, {
      onError: onError
    })),
    loaded = _useImage.loaded;
  var altComponent = (0, _react.useMemo)(function () {
    if (alt) {
      return /*#__PURE__*/_react.default.createElement("span", {
        role: "img",
        "aria-label": alt
      }, alt);
    }
    return null;
  }, [alt]);
  var placeholder = children || altComponent || /*#__PURE__*/_react.default.createElement(_AvatarIcon.default, {
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["icon"])))
  });
  var image = loaded ? /*#__PURE__*/_react.default.createElement("img", (0, _extends3.default)({}, imageProps, {
    className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["image"])))
  })) : placeholder;
  var margin = rtl ? 'marginLeft' : 'marginRight';
  var insertStyles = (0, _utils.isIE)() && spacing ? (0, _extends3.default)((_extends2 = {}, _extends2[margin] = spacing, _extends2), style) : style;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends3.default)({}, rest, {
    ref: ref,
    className: classes,
    style: insertStyles
  }), src ? image : placeholder);
});
Avatar.displayName = 'Avatar';
Avatar.propTypes = {
  as: _propTypes.default.elementType,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  size: (0, _propTypes2.oneOf)(['xxl', 'xl', 'lg', 'md', 'sm', 'xs']),
  src: _propTypes.default.string,
  sizes: _propTypes.default.string,
  srcSet: _propTypes.default.string,
  imgProps: _propTypes.default.object,
  circle: _propTypes.default.bool,
  alt: _propTypes.default.string
};
var _default = exports.default = Avatar;