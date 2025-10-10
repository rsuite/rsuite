'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["classPrefix", "className"];
import React from 'react';
import { useClassNames } from "../internals/hooks/index.js";
import Button from "../Button/index.js";

/**
 * The `InputGroup.Button` component is used to specify an input field with an add-on.
 * @see https://rsuitejs.com/components/input/#input-group
 */
var InputGroupButton = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'input-group-btn' : _props$classPrefix,
    className = props.className,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var _useClassNames2 = useClassNames('input-group-addon'),
    withAddOnClassPrefix = _useClassNames2.withClassPrefix;
  var classes = merge(withAddOnClassPrefix(), className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Button, _extends({}, rest, {
    ref: ref,
    className: classes
  }));
});
InputGroupButton.displayName = 'InputGroupButton';
export default InputGroupButton;