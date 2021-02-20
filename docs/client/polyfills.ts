// @link {refrence | https://github.com/zeit/next.js/blob/canary/packages/next-polyfill-nomodule/src/index.js}
import 'core-js/modules/es6.array.copy-within';
import 'core-js/modules/es6.array.fill';
import 'core-js/modules/es6.array.find';
import 'core-js/modules/es6.array.find-index';
import 'core-js/modules/es7.array.flat-map';
import 'core-js/modules/es6.array.from';
import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es6.array.iterator';
import 'core-js/modules/es6.array.of';
import 'core-js/modules/es6.array.species';
import 'core-js/modules/es6.array.for-each';
import 'core-js/modules/es6.function.has-instance';
import 'core-js/modules/es6.map';
import 'core-js/modules/es6.number.constructor';
import 'core-js/modules/es6.number.epsilon';
import 'core-js/modules/es6.number.is-finite';
import 'core-js/modules/es6.number.is-integer';
import 'core-js/modules/es6.number.is-nan';
import 'core-js/modules/es6.number.is-safe-integer';
import 'core-js/modules/es6.number.max-safe-integer';
import 'core-js/modules/es6.number.min-safe-integer';
import 'core-js/modules/es7.object.entries';
import 'core-js/modules/es7.object.get-own-property-descriptors';
import 'core-js/modules/es6.object.is';
import 'core-js/modules/es7.object.values';
import 'core-js/modules/es6.reflect.apply';
import 'core-js/modules/es6.reflect.construct';
import 'core-js/modules/es6.reflect.define-property';
import 'core-js/modules/es6.reflect.delete-property';
import 'core-js/modules/es6.reflect.get';
import 'core-js/modules/es6.reflect.get-own-property-descriptor';
import 'core-js/modules/es6.reflect.get-prototype-of';
import 'core-js/modules/es6.reflect.has';
import 'core-js/modules/es6.reflect.is-extensible';
import 'core-js/modules/es6.reflect.own-keys';
import 'core-js/modules/es6.reflect.prevent-extensions';
import 'core-js/modules/es6.reflect.set';
import 'core-js/modules/es6.reflect.set-prototype-of';
import 'core-js/modules/es6.regexp.constructor';
import 'core-js/modules/es6.regexp.flags';
import 'core-js/modules/es6.regexp.match';
import 'core-js/modules/es6.regexp.replace';
import 'core-js/modules/es6.regexp.split';
import 'core-js/modules/es6.regexp.search';
import 'core-js/modules/es6.set';
import 'core-js/modules/es6.string.code-point-at';
import 'core-js/modules/es6.string.ends-with';
import 'core-js/modules/es6.string.from-code-point';
import 'core-js/modules/es6.string.includes';
import 'core-js/modules/es6.string.iterator';
import 'core-js/modules/es7.string.pad-start';
import 'core-js/modules/es7.string.pad-end';
import 'core-js/modules/es6.string.raw';
import 'core-js/modules/es6.string.repeat';
import 'core-js/modules/es6.string.starts-with';
import 'core-js/modules/es7.string.trim-left';
import 'core-js/modules/es7.string.trim-right';
import 'core-js/modules/es6.weak-map';
import 'core-js/modules/es6.weak-set';
import 'core-js/modules/es6.symbol';
import assign from 'object-assign'

// Specialized Packages:
Object.assign = assign;

// missing forEach on NodeList for IE11
if (window.NodeList && !NodeList.prototype.forEach) {
  // @ts-ignore
  NodeList.prototype.forEach = Array.prototype.forEach;
}
