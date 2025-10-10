'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _hooks = require("../../hooks");
var _utils = require("../../utils");
var _excluded = ["name", "classPrefix", "className", "placement", "appearance", "cleanable", "block", "disabled", "countable", "readOnly", "plaintext", "hasValue"];
/**
 * The className of the assembled Toggle is on the Picker.
 */
function usePickerClassName(props) {
  var _withClassPrefix;
  var name = props.name,
    classPrefix = props.classPrefix,
    className = props.className,
    placement = props.placement,
    appearance = props.appearance,
    cleanable = props.cleanable,
    block = props.block,
    disabled = props.disabled,
    countable = props.countable,
    readOnly = props.readOnly,
    plaintext = props.plaintext,
    hasValue = props.hasValue,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(name, appearance, 'toggle-wrapper', (_withClassPrefix = {}, _withClassPrefix["placement-" + (0, _kebabCase.default)((0, _utils.placementPolyfill)(placement))] = placement, _withClassPrefix['read-only'] = readOnly, _withClassPrefix['has-value'] = hasValue, _withClassPrefix.cleanable = cleanable, _withClassPrefix.block = block, _withClassPrefix.disabled = disabled, _withClassPrefix.countable = countable, _withClassPrefix.plaintext = plaintext, _withClassPrefix)));

  // Those props that're used for composing the className
  var usedClassNamePropKeys = Object.keys((0, _omit.default)(props, [].concat(Object.keys(rest || {}), ['disabled', 'readOnly', 'plaintext', 'name'])));
  return [classes, usedClassNamePropKeys];
}
var _default = exports.default = usePickerClassName;