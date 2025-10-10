'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _Star = _interopRequireDefault(require("@rsuite/icons/Star"));
var _Character = _interopRequireDefault(require("./Character"));
var _Plaintext = _interopRequireDefault(require("../internals/Plaintext"));
var _propTypes2 = require("../internals/propTypes");
var _constants = require("../internals/constants");
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _utils2 = require("./utils");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "character", "className", "classPrefix", "disabled", "max", "readOnly", "vertical", "size", "color", "allowHalf", "value", "defaultValue", "cleanable", "plaintext", "onChange", "renderCharacter", "onChangeActive"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `Rate` component is used for rating. It can be used to evaluate the quality of the content.
 * @see https://rsuitejs.com/components/rate/
 */
var Rate = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Rate', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'ul' : _propsWithDefaults$as,
    _propsWithDefaults$ch = propsWithDefaults.character,
    character = _propsWithDefaults$ch === void 0 ? /*#__PURE__*/_react.default.createElement(_Star.default, null) : _propsWithDefaults$ch,
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useControlled = (0, _hooks.useControlled)(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var getCharacterMap = (0, _react.useCallback)(function (v) {
    return (0, _utils2.transformValueToCharacterMap)(typeof v !== 'undefined' ? v : value, max, allowHalf);
  }, [allowHalf, max, value]);
  var _useState = (0, _react.useState)(getCharacterMap()),
    characterMap = _useState[0],
    setCharacterMap = _useState[1];
  var hoverValue = (0, _utils2.transformCharacterMapToValue)(characterMap);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(size, color, {
    disabled: disabled,
    readonly: readOnly
  }));
  var resetCharacterMap = (0, _react.useCallback)(function () {
    setCharacterMap(getCharacterMap());
  }, [getCharacterMap]);
  (0, _react.useEffect)(function () {
    // Update characterMap when value is updated.
    setCharacterMap(getCharacterMap(valueProp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);
  var handleMouseLeave = (0, _react.useCallback)(function (event) {
    resetCharacterMap();
    onChangeActive === null || onChangeActive === void 0 || onChangeActive(value, event);
  }, [onChangeActive, resetCharacterMap, value]);
  var handleChangeValue = (0, _react.useCallback)(function (index, event) {
    var nextValue = (0, _utils2.transformCharacterMapToValue)(characterMap);
    if (cleanable && value === nextValue && getCharacterMap(value)[index] === characterMap[index]) {
      nextValue = 0;
    }
    if (nextValue !== value) {
      setValue(nextValue);
      setCharacterMap(getCharacterMap(nextValue));
      onChange === null || onChange === void 0 || onChange(nextValue, event);
    }
  }, [characterMap, cleanable, getCharacterMap, onChange, setValue, value]);
  var handleKeyDown = (0, _react.useCallback)(function (index, event) {
    var key = event.key;
    var nextValue = (0, _utils2.transformCharacterMapToValue)(characterMap);
    if (key === _constants.KEY_VALUES.RIGHT && nextValue < max) {
      nextValue = allowHalf ? nextValue + 0.5 : nextValue + 1;
    } else if (key === _constants.KEY_VALUES.LEFT && nextValue > 0) {
      nextValue = allowHalf ? nextValue - 0.5 : nextValue - 1;
    }
    setCharacterMap(getCharacterMap(nextValue));
    if (key === _constants.KEY_VALUES.ENTER) {
      handleChangeValue(index, event);
    }
  }, [allowHalf, characterMap, getCharacterMap, handleChangeValue, max]);
  var handleChangeCharacterMap = (0, _react.useCallback)(function (index, key, event) {
    var nextCharacterMap = characterMap.map(function (_item, i) {
      if (i === index && key === 'before' && allowHalf) {
        return 0.5;
      }
      return index >= i ? 1 : 0;
    });
    if (!(0, _utils.shallowEqualArray)(characterMap, nextCharacterMap)) {
      setCharacterMap(nextCharacterMap);
      onChangeActive === null || onChangeActive === void 0 || onChangeActive((0, _utils2.transformCharacterMapToValue)(nextCharacterMap), event);
    }
  }, [allowHalf, characterMap, onChangeActive]);
  var handleClick = (0, _react.useCallback)(function (index, key, event) {
    handleChangeCharacterMap(index, key, event);
    handleChangeValue(index, event);
  }, [handleChangeCharacterMap, handleChangeValue]);
  if (plaintext) {
    return /*#__PURE__*/_react.default.createElement(_Plaintext.default, {
      localeKey: "notSelected",
      className: className
    }, !(0, _isNil.default)(value) ? value + "(" + max + ")" : null);
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "radiogroup",
    tabIndex: 0
  }, rest, {
    ref: ref,
    className: classes,
    onMouseLeave: handleMouseLeave
  }), characterMap.map(function (item, index) {
    return /*#__PURE__*/_react.default.createElement(_Character.default, {
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
  allowHalf: _propTypes.default.bool,
  character: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  cleanable: _propTypes.default.bool,
  defaultValue: _propTypes.default.number,
  disabled: _propTypes.default.bool,
  max: _propTypes.default.number,
  renderCharacter: _propTypes.default.func,
  readOnly: _propTypes.default.bool,
  size: (0, _propTypes2.oneOf)(_constants.SIZE),
  value: _propTypes.default.number,
  vertical: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  onChangeActive: _propTypes.default.func
};
var _default = exports.default = Rate;