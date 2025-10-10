'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var _excluded = ["className", "classPrefix", "open"],
  _excluded2 = ["className"];
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Collapse from "../Animation/Collapse.js";
import { useClassNames } from "../internals/hooks/index.js";
import { mergeRefs } from "../internals/utils/index.js";
var SidenavDropdownCollapse = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-menu' : _props$classPrefix,
    open = props.open,
    restProps = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Collapse, {
    in: open,
    exitedClassName: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["collapse-out"]))),
    exitingClassName: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["collapsing"]))),
    enteredClassName: prefix(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["collapse-in"]))),
    enteringClassName: prefix(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["collapsing"])))
  }, function (transitionProps, transitionRef) {
    var transitionClassName = transitionProps.className,
      transitionRestProps = _objectWithoutPropertiesLoose(transitionProps, _excluded2);
    return /*#__PURE__*/React.createElement("ul", _extends({
      ref: mergeRefs(ref, transitionRef),
      role: "group",
      className: classNames(classes, transitionClassName)
    }, restProps, transitionRestProps));
  });
});
SidenavDropdownCollapse.displayName = 'Sidenav.Dropdown.Collapse';
SidenavDropdownCollapse.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  open: PropTypes.bool
};
export default SidenavDropdownCollapse;