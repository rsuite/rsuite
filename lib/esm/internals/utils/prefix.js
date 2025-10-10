'use client';
import classNames from 'classnames';
import curry from 'lodash/curry';
export var globalKey = 'rs-';
export var getClassNamePrefix = function getClassNamePrefix() {
  // TODO: A prefix that can be replaced at runtime.

  return globalKey;
};
export var defaultClassPrefix = function defaultClassPrefix(name) {
  return "" + getClassNamePrefix() + name;
};
export function prefix(pre, className) {
  if (!pre || !className) {
    return '';
  }
  if (Array.isArray(className)) {
    return classNames(className.filter(function (name) {
      return !!name;
    }).map(function (name) {
      return pre + "-" + name;
    }));
  }

  // TODO Compatible with V4
  if (pre[pre.length - 1] === '-') {
    return "" + pre + className;
  }
  return pre + "-" + className;
}
export default curry(prefix);