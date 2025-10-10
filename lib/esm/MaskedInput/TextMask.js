'use client';
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["mask", "guide", "placeholderChar", "value", "showMask", "pipe", "render", "onChange"];
import React, { useCallback, useEffect, useRef } from 'react';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import createTextMaskInputElement from "./createTextMaskInputElement.js";
import { mergeRefs } from "../internals/utils/index.js";

/**
 * https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#guide
 */

var defaultRender = function defaultRender(ref, props) {
  return /*#__PURE__*/React.createElement("input", _extends({
    ref: ref
  }, props));
};

/**
 * The `TextMask` component is used to format the user input data.
 * @see https://rsuitejs.com/components/input/#masked-input
 */
var TextMask = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var mask = props.mask,
    _props$guide = props.guide,
    guide = _props$guide === void 0 ? true : _props$guide,
    placeholderChar = props.placeholderChar,
    value = props.value,
    showMask = props.showMask,
    pipe = props.pipe,
    _props$render = props.render,
    render = _props$render === void 0 ? defaultRender : _props$render,
    onChange = props.onChange,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var inputRef = useRef(null);
  var textMaskInputElement = useRef();
  var initTextMask = useCallback(function () {
    var _textMaskInputElement;
    textMaskInputElement.current = createTextMaskInputElement(_extends({
      inputElement: inputRef.current
    }, props));
    (_textMaskInputElement = textMaskInputElement.current) === null || _textMaskInputElement === void 0 || _textMaskInputElement.update(value);
  }, [props, value]);
  var handleChange = useCallback(function (event) {
    var _textMaskInputElement2;
    (_textMaskInputElement2 = textMaskInputElement.current) === null || _textMaskInputElement2 === void 0 || _textMaskInputElement2.update();
    onChange === null || onChange === void 0 || onChange(event);
  }, [onChange]);
  useEffect(function () {
    initTextMask();
  }, [guide, placeholderChar, showMask, pipe, mask, value, initTextMask]);
  return render(mergeRefs(inputRef, ref), _extends({
    onChange: handleChange,
    defaultValue: value
  }, omit(rest, ['keepCharPositions'])));
});
TextMask.displayName = 'TextMask';
TextMask.propTypes = {
  render: PropTypes.func,
  onChange: PropTypes.func,
  mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.bool]).isRequired,
  guide: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pipe: PropTypes.func,
  placeholderChar: PropTypes.string,
  keepCharPositions: PropTypes.bool,
  showMask: PropTypes.bool
};
export default TextMask;