"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.find = find;
exports.map = map;
exports.mapCloneElement = mapCloneElement;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

function find(children, func, context) {
  var index = 0;
  var result;
  React.Children.forEach(children, function (child) {
    if (result) {
      return;
    }

    index += 1;

    if (func.call(context, child, index)) {
      result = child;
    }
  });
  return result;
}

function map(children, func, context) {
  var index = 0;
  return React.Children.map(children, function (child) {
    if (!React.isValidElement(child)) {
      return child;
    }

    var handle = func.call(context, child, index);
    index += 1;
    return handle;
  });
}

function mapCloneElement(children, func, context) {
  return map(children, function (child, index) {
    return React.cloneElement(child, (0, _extends2.default)({
      key: index
    }, func(child, index)));
  }, context);
}

function some(children, func, context) {
  var index = 0;
  var result = false;
  React.Children.forEach(children, function (child) {
    if (result) {
      return;
    }

    if (!React.isValidElement(child)) {
      return;
    }
    /* eslint-disable */


    if (func.call(context, child, index += 1)) {
      result = true;
    }
  });
  return result;
}

var _default = {
  mapCloneElement: mapCloneElement,
  some: some,
  map: map,
  find: find
};
exports.default = _default;