'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "character", "className", "classPrefix", "disabled", "max", "readOnly", "vertical", "size", "color", "allowHalf", "value", "defaultValue", "cleanable", "plaintext", "onChange", "renderCharacter", "onChangeActive"];
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import Star from '@rsuite/icons/Star';
import Character from "./Character.js";
import Plaintext from "../internals/Plaintext/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { SIZE, KEY_VALUES } from "../internals/constants/index.js";
import { useControlled, useClassNames } from "../internals/hooks/index.js";
import { shallowEqualArray } from "../internals/utils/index.js";
import { transformValueToCharacterMap, transformCharacterMapToValue } from "./utils.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Rate` component is used for rating. It can be used to evaluate the quality of the content.
 * @see https://rsuitejs.com/components/rate/
 */
var Rate = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Rate', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'ul' : _propsWithDefaults$as,
    _propsWithDefaults$ch = propsWithDefaults.character,
    character = _propsWithDefaults$ch === void 0 ? /*#__PURE__*/React.createElement(Star, null) : _propsWithDefaults$ch,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'rate' : _propsWithDefaults$cl,
    disabled = propsWithDefaults.disabled,
    _propsWithDefaults$ma = propsWithDefaults.max,
    max = _propsWithDefaults$ma === void 0 ? 5 : _propsWithDefaults$ma,
    readOnly = propsWithDefaults.readOnly,
    vertical = propsWithDefaults.vertical,
    _propsWithDefaults$si = propsWithDefaults.size,
    size = _propsWithDefaults$si === void 0 ? 'md' : _propsWithDefaults$si,
    color = propsWithDefaults.color,
    _propsWithDefaults$al = propsWithDefaults.allowHalf,
    allowHalf = _propsWithDefaults$al === void 0 ? false : _propsWithDefaults$al,
    valueProp = propsWithDefaults.value,
    _propsWithDefaults$de = propsWithDefaults.defaultValue,
    defaultValue = _propsWithDefaults$de === void 0 ? 0 : _propsWithDefaults$de,
    _propsWithDefaults$cl2 = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl2 === void 0 ? true : _propsWithDefaults$cl2,
    plaintext = propsWithDefaults.plaintext,
    onChange = propsWithDefaults.onChange,
    renderCharacter = propsWithDefaults.renderCharacter,
    onChangeActive = propsWithDefaults.onChangeActive,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useControlled = useControlled(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var getCharacterMap = useCallback(function (v) {
    return transformValueToCharacterMap(typeof v !== 'undefined' ? v : value, max, allowHalf);
  }, [allowHalf, max, value]);
  var _useState = useState(getCharacterMap()),
    characterMap = _useState[0],
    setCharacterMap = _useState[1];
  var hoverValue = transformCharacterMapToValue(characterMap);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(size, color, {
    disabled: disabled,
    readonly: readOnly
  }));
  var resetCharacterMap = useCallback(function () {
    setCharacterMap(getCharacterMap());
  }, [getCharacterMap]);
  useEffect(function () {
    // Update characterMap when value is updated.
    setCharacterMap(getCharacterMap(valueProp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);
  var handleMouseLeave = useCallback(function (event) {
    resetCharacterMap();
    onChangeActive === null || onChangeActive === void 0 || onChangeActive(value, event);
  }, [onChangeActive, resetCharacterMap, value]);
  var handleChangeValue = useCallback(function (index, event) {
    var nextValue = transformCharacterMapToValue(characterMap);
    if (cleanable && value === nextValue && getCharacterMap(value)[index] === characterMap[index]) {
      nextValue = 0;
    }
    if (nextValue !== value) {
      setValue(nextValue);
      setCharacterMap(getCharacterMap(nextValue));
      onChange === null || onChange === void 0 || onChange(nextValue, event);
    }
  }, [characterMap, cleanable, getCharacterMap, onChange, setValue, value]);
  var handleKeyDown = useCallback(function (index, event) {
    var key = event.key;
    var nextValue = transformCharacterMapToValue(characterMap);
    if (key === KEY_VALUES.RIGHT && nextValue < max) {
      nextValue = allowHalf ? nextValue + 0.5 : nextValue + 1;
    } else if (key === KEY_VALUES.LEFT && nextValue > 0) {
      nextValue = allowHalf ? nextValue - 0.5 : nextValue - 1;
    }
    setCharacterMap(getCharacterMap(nextValue));
    if (key === KEY_VALUES.ENTER) {
      handleChangeValue(index, event);
    }
  }, [allowHalf, characterMap, getCharacterMap, handleChangeValue, max]);
  var handleChangeCharacterMap = useCallback(function (index, key, event) {
    var nextCharacterMap = characterMap.map(function (_item, i) {
      if (i === index && key === 'before' && allowHalf) {
        return 0.5;
      }
      return index >= i ? 1 : 0;
    });
    if (!shallowEqualArray(characterMap, nextCharacterMap)) {
      setCharacterMap(nextCharacterMap);
      onChangeActive === null || onChangeActive === void 0 || onChangeActive(transformCharacterMapToValue(nextCharacterMap), event);
    }
  }, [allowHalf, characterMap, onChangeActive]);
  var handleClick = useCallback(function (index, key, event) {
    handleChangeCharacterMap(index, key, event);
    handleChangeValue(index, event);
  }, [handleChangeCharacterMap, handleChangeValue]);
  if (plaintext) {
    return /*#__PURE__*/React.createElement(Plaintext, {
      localeKey: "notSelected",
      className: className
    }, !isNil(value) ? value + "(" + max + ")" : null);
  }
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "radiogroup",
    tabIndex: 0
  }, rest, {
    ref: ref,
    className: classes,
    onMouseLeave: handleMouseLeave
  }), characterMap.map(function (item, index) {
    return /*#__PURE__*/React.createElement(Character, {
      role: "radio",
      "aria-posinset": index + 1,
      "aria-setsize": max,
      "aria-checked": value === index + 1,
      key: index,
      status: item,
      disabled: disabled || readOnly,
      vertical: vertical,
      onClick: function onClick(key, event) {
        return handleClick(index, key, event);
      },
      onKeyDown: function onKeyDown(event) {
        return handleKeyDown(index, event);
      },
      onMouseMove: function onMouseMove(key, event) {
        return handleChangeCharacterMap(index, key, event);
      }
    }, renderCharacter ? renderCharacter(hoverValue, index) : character);
  }));
});
Rate.displayName = 'Rate';
Rate.propTypes = {
  allowHalf: PropTypes.bool,
  character: PropTypes.node,
  classPrefix: PropTypes.string,
  cleanable: PropTypes.bool,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  renderCharacter: PropTypes.func,
  readOnly: PropTypes.bool,
  size: oneOf(SIZE),
  value: PropTypes.number,
  vertical: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeActive: PropTypes.func
};
export default Rate;