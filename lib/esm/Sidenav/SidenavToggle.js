'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "expanded", "className", "classPrefix", "onToggle"];
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageNextIcon from '@rsuite/icons/PageNext';
import IconButton from "../IconButton/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { deprecatePropType } from "../internals/propTypes/index.js";
import { SidenavContext } from "./Sidenav.js";
var SidenavToggle = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var sidenav = useContext(SidenavContext);
  if (!sidenav) {
    throw new Error('<Sidenav.Toggle> must be rendered within a <Sidenav>');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    DEPRECATED_expanded = props.expanded,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'sidenav-toggle' : _props$classPrefix,
    onToggle = props.onToggle,
    rest = _objectWithoutPropertiesLoose(props, _excluded);

  // if `expanded` prop is provided, it takes priority
  var expanded = DEPRECATED_expanded !== null && DEPRECATED_expanded !== void 0 ? DEPRECATED_expanded : sidenav.expanded;
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix({
    collapsed: !expanded
  }));
  var Icon = expanded ? PagePreviousIcon : PageNextIcon;
  var handleToggle = function handleToggle(event) {
    onToggle === null || onToggle === void 0 || onToggle(!expanded, event);
  };
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, null),
    className: prefix('button'),
    onClick: handleToggle,
    "aria-label": expanded ? 'Collapse' : 'Expand'
  }));
});
SidenavToggle.displayName = 'Sidenav.Toggle';
SidenavToggle.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  expanded: deprecatePropType(PropTypes.bool, 'Use <Sidenav expanded> instead.'),
  onToggle: PropTypes.func
};
export default SidenavToggle;