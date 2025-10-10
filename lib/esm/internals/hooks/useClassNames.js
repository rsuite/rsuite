'use client';
import { useCallback, useContext } from 'react';
import classNames from 'classnames';
import { prefix as addPrefix } from "../utils/prefix.js";
import { CustomContext } from "../../CustomProvider/CustomContext.js";

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
export function useClassNames(str) {
  var _ref = useContext(CustomContext) || {},
    _ref$classPrefix = _ref.classPrefix,
    classPrefix = _ref$classPrefix === void 0 ? 'rs' : _ref$classPrefix;
  var componentName = addPrefix(classPrefix, str);

  /**
   * @example
   *
   * if str = 'button':
   * prefix('red', { active: true }) => 'rs-button-red rs-button-active'
   */
  var prefix = useCallback(function () {
    var mergeClasses = arguments.length ? classNames.apply(void 0, arguments).split(' ').map(function (item) {
      return addPrefix(componentName, item);
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
  var withClassPrefix = useCallback(function () {
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
    var mergeClasses = arguments.length ? classNames.apply(void 0, arguments).split(' ').map(function (item) {
      return addPrefix(classPrefix, item);
    }) : [];
    return mergeClasses.filter(function (cls) {
      return cls;
    }).join(' ');
  };
  return {
    withClassPrefix: withClassPrefix,
    merge: classNames,
    prefix: prefix,
    rootPrefix: rootPrefix
  };
}
export default useClassNames;