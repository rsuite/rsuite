'use client';
"use strict";

exports.__esModule = true;
exports.checkValue = checkValue;
exports.getPosition = getPosition;
exports.precisionMath = void 0;
var precisionMath = exports.precisionMath = function precisionMath(value) {
  return parseFloat(value.toFixed(10));
};
function checkValue(value, min, max) {
  if (typeof value === 'undefined' || value === null) {
    return value;
  }
  if (typeof value === 'number' && value < min) {
    return min;
  }
  if (typeof value === 'number' && value > max) {
    return max;
  }
  return value;
}
function getPosition(e) {
  var _event, _event2;
  var event = 'touches' in e ? e.touches[0] : e;

  // For touchend event, we need to use `changedTouches` instead of `touches`
  if (e.type === 'touchend' && 'changedTouches' in e) {
    event = e.changedTouches[0];
  }
  return {
    pageX: ((_event = event) === null || _event === void 0 ? void 0 : _event.pageX) || 0,
    pageY: ((_event2 = event) === null || _event2 === void 0 ? void 0 : _event2.pageY) || 0
  };
}