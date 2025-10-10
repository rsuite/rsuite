'use client';
"use strict";

exports.__esModule = true;
var _exportNames = {
  stringifyReactNode: true,
  reactToString: true,
  getSafeRegExpString: true,
  getDOMNode: true,
  guid: true,
  prefix: true,
  defaultClassPrefix: true,
  getClassNamePrefix: true,
  createChainedFunction: true,
  isOneOf: true,
  ReactChildren: true,
  tplTransform: true,
  placementPolyfill: true,
  mergeRefs: true,
  shallowEqual: true,
  shallowEqualArray: true,
  composeFunctions: true,
  safeSetSelection: true,
  getStringLength: true,
  getDataGroupBy: true,
  deprecateComponent: true,
  warnOnce: true,
  createComponent: true,
  attachParent: true,
  isFocusEntering: true,
  isFocusLeaving: true,
  isFocusableElement: true
};
exports.warnOnce = exports.tplTransform = exports.stringifyReactNode = exports.shallowEqualArray = exports.shallowEqual = exports.safeSetSelection = exports.reactToString = exports.prefix = exports.placementPolyfill = exports.mergeRefs = exports.isOneOf = exports.isFocusableElement = exports.isFocusLeaving = exports.isFocusEntering = exports.guid = exports.getStringLength = exports.getSafeRegExpString = exports.getDataGroupBy = exports.getDOMNode = exports.getClassNamePrefix = exports.deprecateComponent = exports.defaultClassPrefix = exports.createComponent = exports.createChainedFunction = exports.composeFunctions = exports.attachParent = exports.ReactChildren = void 0;
var _BrowserDetection = require("./BrowserDetection");
Object.keys(_BrowserDetection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _BrowserDetection[key]) return;
  exports[key] = _BrowserDetection[key];
});
var _htmlPropsUtils = require("./htmlPropsUtils");
Object.keys(_htmlPropsUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _htmlPropsUtils[key]) return;
  exports[key] = _htmlPropsUtils[key];
});
var _stringifyReactNode = require("./stringifyReactNode");
exports.stringifyReactNode = _stringifyReactNode.stringifyReactNode;
exports.reactToString = _stringifyReactNode.reactToString;
var _getSafeRegExpString = require("./getSafeRegExpString");
exports.getSafeRegExpString = _getSafeRegExpString.getSafeRegExpString;
var _getDOMNode = require("./getDOMNode");
exports.getDOMNode = _getDOMNode.getDOMNode;
var _guid = require("./guid");
exports.guid = _guid.guid;
var _prefix = require("./prefix");
exports.prefix = _prefix.prefix;
exports.defaultClassPrefix = _prefix.defaultClassPrefix;
exports.getClassNamePrefix = _prefix.getClassNamePrefix;
var _createChainedFunction = require("./createChainedFunction");
exports.createChainedFunction = _createChainedFunction.createChainedFunction;
var _isOneOf = require("./isOneOf");
exports.isOneOf = _isOneOf.isOneOf;
var _ReactChildren = require("./ReactChildren");
exports.ReactChildren = _ReactChildren.ReactChildren;
var _tplTransform = require("./tplTransform");
exports.tplTransform = _tplTransform.tplTransform;
var _placementPolyfill = require("./placementPolyfill");
exports.placementPolyfill = _placementPolyfill.placementPolyfill;
var _mergeRefs = require("./mergeRefs");
exports.mergeRefs = _mergeRefs.mergeRefs;
var _shallowEqual = require("./shallowEqual");
exports.shallowEqual = _shallowEqual.shallowEqual;
exports.shallowEqualArray = _shallowEqual.shallowEqualArray;
var _composeFunctions = require("./composeFunctions");
exports.composeFunctions = _composeFunctions.composeFunctions;
var _safeSetSelection = require("./safeSetSelection");
exports.safeSetSelection = _safeSetSelection.safeSetSelection;
var _getStringLength = require("./getStringLength");
exports.getStringLength = _getStringLength.getStringLength;
var _getDataGroupBy = require("./getDataGroupBy");
exports.getDataGroupBy = _getDataGroupBy.getDataGroupBy;
var _deprecateComponent = require("./deprecateComponent");
exports.deprecateComponent = _deprecateComponent.deprecateComponent;
var _warnOnce = require("./warnOnce");
exports.warnOnce = _warnOnce.warnOnce;
var _createComponent = require("./createComponent");
exports.createComponent = _createComponent.createComponent;
var _attachParent = require("./attachParent");
exports.attachParent = _attachParent.attachParent;
var _events = require("./events");
exports.isFocusEntering = _events.isFocusEntering;
exports.isFocusLeaving = _events.isFocusLeaving;
var _dom = require("./dom");
exports.isFocusableElement = _dom.isFocusableElement;