'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "role"];
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from "./ModalContext.js";
import { useClassNames } from "../internals/hooks/index.js";
var ModalTitle = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'h4' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'modal-title' : _props$classPrefix,
    className = props.className,
    role = props.role,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  var context = useContext(ModalContext);
  return /*#__PURE__*/React.createElement(Component, _extends({
    id: context ? context.dialogId + "-title" : undefined
  }, rest, {
    role: role,
    ref: ref,
    className: classes
  }));
});
ModalTitle.displayName = 'Modal.Title';
ModalTitle.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node
};
export default ModalTitle;