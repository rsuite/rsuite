'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["classPrefix", "className", "as"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
/**
 * The `<Dropdown.Separator>` API
 *
 * Renders a non-focusable and non-interactive `separator`
 * Per ARIA APG https://www.w3.org/WAI/ARIA/apg/patterns/menu/
 */
var DropdownSeparator = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-item-divider' : _props$classPrefix,
    className = props.className,
    _props$as = props.as,
    Component = _props$as === void 0 ? 'li' : _props$as,
    restProps = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    role: "separator",
    className: merge(withClassPrefix(), className)
  }, restProps));
});
DropdownSeparator.displayName = 'Dropdown.Separator';
DropdownSeparator.propTypes = {
  as: PropTypes.elementType
};
export default DropdownSeparator;