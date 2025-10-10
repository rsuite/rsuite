'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["children", "classPrefix", "components", "iconClassPrefix", "theme", "toastContainer", "disableRipple", "csp", "disableInlineStyles"];
import React, { useRef, useMemo } from 'react';
import IconProvider from '@rsuite/icons/IconProvider';
import { usePortal, useIsomorphicLayoutEffect } from "../internals/hooks/index.js";
import { getClassNamePrefix, prefix } from "../internals/utils/prefix.js";
import { addClass, removeClass, canUseDOM } from "../DOMHelper/index.js";
import { CustomContext } from "./CustomContext.js";
import ToastContainer, { toastPlacements, defaultToasterContainer } from "../toaster/ToastContainer.js";
var themes = ['light', 'dark', 'high-contrast'];

/**
 * CustomProvider is used to provide global configuration, such as language, theme, etc.
 *
 * @see https://rsuitejs.com/components/custom-provider
 */
export default function CustomProvider(props) {
  var children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? getClassNamePrefix() : _props$classPrefix,
    components = props.components,
    _props$iconClassPrefi = props.iconClassPrefix,
    iconClassPrefix = _props$iconClassPrefi === void 0 ? classPrefix : _props$iconClassPrefi,
    theme = props.theme,
    _props$toastContainer = props.toastContainer,
    toastContainer = _props$toastContainer === void 0 ? defaultToasterContainer : _props$toastContainer,
    disableRipple = props.disableRipple,
    csp = props.csp,
    disableInlineStyles = props.disableInlineStyles,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var toasters = useRef(new Map());
  var _usePortal = usePortal({
      container: toastContainer,
      waitMount: true
    }),
    Portal = _usePortal.Portal;
  var value = useMemo(function () {
    return _extends({
      classPrefix: classPrefix,
      theme: theme,
      toasters: toasters,
      disableRipple: disableRipple,
      components: components,
      toastContainer: toastContainer
    }, rest);
  }, [classPrefix, theme, disableRipple, components, toastContainer, rest]);
  var iconContext = useMemo(function () {
    return {
      classPrefix: iconClassPrefix,
      csp: csp,
      disableInlineStyles: disableInlineStyles
    };
  }, [iconClassPrefix, csp, disableInlineStyles]);
  useIsomorphicLayoutEffect(function () {
    if (canUseDOM && theme) {
      addClass(document.body, prefix(classPrefix, "theme-" + theme));

      // Remove the className that will cause style conflicts
      themes.forEach(function (t) {
        if (t !== theme) {
          removeClass(document.body, prefix(classPrefix, "theme-" + t));
        }
      });
    }
  }, [classPrefix, theme]);
  return /*#__PURE__*/React.createElement(CustomContext.Provider, {
    value: value
  }, /*#__PURE__*/React.createElement(IconProvider, {
    value: iconContext
  }, children, /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "toast-provider"
  }, toastPlacements.map(function (placement) {
    return /*#__PURE__*/React.createElement(ToastContainer, {
      key: placement,
      placement: placement,
      ref: function ref(_ref) {
        toasters.current.set(placement, _ref);
      }
    });
  })))));
}