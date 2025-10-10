'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "htmlFor", "className", "id"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { useFormGroup } from "../FormGroup/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `<Form.ControlLabel>` component renders a label with required indicator, for form controls.
 * @see https://rsuitejs.com/components/form/
 */
var FormControlLabel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('FormControlLabel', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _useFormGroup = useFormGroup(),
    labelId = _useFormGroup.labelId,
    controlId = _useFormGroup.controlId;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'label' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'form-control-label' : _propsWithDefaults$cl,
    _propsWithDefaults$ht = propsWithDefaults.htmlFor,
    htmlFor = _propsWithDefaults$ht === void 0 ? controlId : _propsWithDefaults$ht,
    className = propsWithDefaults.className,
    _propsWithDefaults$id = propsWithDefaults.id,
    id = _propsWithDefaults$id === void 0 ? labelId : _propsWithDefaults$id,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Component, _extends({
    id: id,
    htmlFor: htmlFor
  }, rest, {
    ref: ref,
    className: classes
  }));
});
FormControlLabel.displayName = 'FormControlLabel';
FormControlLabel.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  classPrefix: PropTypes.string
};
export default FormControlLabel;