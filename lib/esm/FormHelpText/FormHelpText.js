'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "tooltip", "children", "id"];
import React from 'react';
import PropTypes from 'prop-types';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import Tooltip from "../Tooltip/index.js";
import Whisper from "../Whisper/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useFormGroup } from "../FormGroup/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `<Form.HelpText>` component is used to display help information in the form.
 * @see https://rsuitejs.com/components/form/
 */
var FormHelpText = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useFormGroup = useFormGroup(),
    helpTextId = _useFormGroup.helpTextId;
  var _useCustom = useCustom('FormHelpText', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'span' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'form-help-text' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    tooltip = propsWithDefaults.tooltip,
    children = propsWithDefaults.children,
    _propsWithDefaults$id = propsWithDefaults.id,
    id = _propsWithDefaults$id === void 0 ? helpTextId : _propsWithDefaults$id,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    tooltip: tooltip
  }));
  if (tooltip) {
    return /*#__PURE__*/React.createElement(Whisper, {
      ref: ref,
      placement: "topEnd",
      speaker: /*#__PURE__*/React.createElement(Tooltip, _extends({
        id: id
      }, rest), children)
    }, /*#__PURE__*/React.createElement(Component, {
      role: "img",
      "aria-label": "help",
      className: classes
    }, /*#__PURE__*/React.createElement(HelpOutlineIcon, {
      "aria-hidden": true
    })));
  }
  return /*#__PURE__*/React.createElement(Component, _extends({
    id: id
  }, rest, {
    ref: ref,
    className: classes
  }), children);
});
FormHelpText.displayName = 'FormHelpText';
FormHelpText.propTypes = {
  className: PropTypes.string,
  tooltip: PropTypes.bool,
  children: PropTypes.node,
  classPrefix: PropTypes.string
};
export default FormHelpText;