'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "controlId", "className"];
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useUniqueId } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
var FormGroupContext = /*#__PURE__*/React.createContext({});
export var useFormGroup = function useFormGroup(controlId) {
  var context = React.useContext(FormGroupContext);
  var fallbackId = useUniqueId('rs-');
  var id = controlId || context.controlId || fallbackId;
  var helpTextId = id + "-help-text";
  var labelId = id + "-label";
  var errorMessageId = id + "-error-message";
  return {
    /**
     * The `id` of the `<Form.Control>` component.
     */
    controlId: id,
    /**
     * The `id` of the `<Form.HelpText>` component.
     */
    helpTextId: helpTextId,
    /**
     * The `id` of the `<Form.ControlLabel>` component.
     */
    labelId: labelId,
    /**
     * The `id` of the `<Form.ErrorMessage>` component.
     */
    errorMessageId: errorMessageId
  };
};

/**
 * The `<Form.Group>` component is the easiest way to add some structure to forms.
 * @see https://rsuitejs.com/components/form/
 */
var FormGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('FormGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'form-group' : _propsWithDefaults$cl,
    controlIdProp = propsWithDefaults.controlId,
    className = propsWithDefaults.className,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  var controlId = useUniqueId('rs-', controlIdProp);
  var contextValue = useMemo(function () {
    return {
      controlId: controlId
    };
  }, [controlId]);
  return /*#__PURE__*/React.createElement(FormGroupContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes,
    role: "group"
  })));
});
FormGroup.displayName = 'FormGroup';
FormGroup.propTypes = {
  controlId: PropTypes.string,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
export default FormGroup;