'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.useClassNames = useClassNames;
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _prefix = require("../utils/prefix");
var _CustomContext = require("../../CustomProvider/CustomContext");
// This is the only way I found to break circular references between ClassArray and ClassValue
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540

//eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * Add a prefix to all classNames.
 *
 * @param str prefix of className
 * @returns { withClassPrefix, merge, prefix }
 *  - withClassPrefix: A function of combining className and adding a prefix to each className.
 *    At the same time, the default `classPrefix` is the first className.
 *  - merge: A merge className function.
 *  - prefix: Add a prefix to className
 *  - rootPrefix
 */
function useClassNames(str) {
  var _ref = (0, _react.useContext)(_CustomContext.CustomContext) || {},
    _ref$classPrefix = _ref.classPrefix,
    classPrefix = _ref$classPrefix === void 0 ? 'rs' : _ref$classPrefix;
  var componentName = (0, _prefix.prefix)(classPrefix, str);

  /**
   * @example
   *
   * if str = 'button':
   * prefix('red', { active: true }) => 'rs-button-red rs-button-active'
   */
  var prefix = (0, _react.useCallback)(function () {
    var mergeClasses = arguments.length ? _classnames.default.apply(void 0, arguments).split(' ').map(function (item) {
      return (0, _prefix.prefix)(componentName, item);
    }) : [];
    return mergeClasses.filter(function (cls) {
      return cls;
    }).join(' ');
  }, [componentName]);

  /**
   * @example
   *
   * if str = 'button':
   * withClassPrefix('red', { active: true }) => 'rs-button rs-button-red rs-button-active'
   */
  var withClassPrefix = (0, _react.useCallback)(function () {
    for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
      classes[_key] = arguments[_key];
    }
    var mergeClasses = prefix(classes);
    return mergeClasses ? componentName + " " + mergeClasses : componentName;
  }, [componentName, prefix]);

  /**
   * @example
   * rootPrefix('btn') => 'rs-btn'
   * rootPrefix('btn', { active: true }) => 'rs-btn rs-active'
   */
  var rootPrefix = function rootPrefix() {
    var mergeClasses = arguments.length ? _classnames.default.apply(void 0, arguments).split(' ').map(function (item) {
      return (0, _prefix.prefix)(classPrefix, item);
    }) : [];
    return mergeClasses.filter(function (cls) {
      return cls;
    }).join(' ');
  };
  return {
    withClassPrefix: withClassPrefix,
    merge: _classnames.default,
    prefix: prefix,
    rootPrefix: rootPrefix
  };
}
var _default = exports.default = useClassNames;