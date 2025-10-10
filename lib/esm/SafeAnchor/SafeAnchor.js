'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "href", "disabled", "onClick"];
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useCustom } from "../CustomProvider/index.js";
function isTrivialHref(href) {
  return !href || href.trim() === '#';
}

/**
 * A SafeAnchor is a wrapper around the `<a>` HTML element.
 * @private
 */
var SafeAnchor = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('SafeAnchor', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'a' : _propsWithDefaults$as,
    href = propsWithDefaults.href,
    disabled = propsWithDefaults.disabled,
    onClick = propsWithDefaults.onClick,
    restProps = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var handleClick = useCallback(function (event) {
    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }
    if (disabled) {
      event.stopPropagation();
      return;
    }
    onClick === null || onClick === void 0 || onClick(event);
  }, [disabled, href, onClick]);

  // There are default role and href attributes on the node to ensure Focus management and keyboard interactions.
  var trivialProps = isTrivialHref(href) ? {
    role: 'button',
    href: '#'
  } : null;
  if (disabled) {
    restProps.tabIndex = -1;
    restProps['aria-disabled'] = true;
  }
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    href: href
  }, trivialProps, restProps, {
    onClick: handleClick
  }));
});
SafeAnchor.displayName = 'SafeAnchor';
SafeAnchor.propTypes = {
  href: PropTypes.string,
  disabled: PropTypes.bool,
  as: PropTypes.elementType
};
export default SafeAnchor;