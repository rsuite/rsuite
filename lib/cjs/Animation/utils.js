'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.animationPropTypes = void 0;
exports.getAnimationEnd = getAnimationEnd;
var _propTypes = _interopRequireDefault(require("prop-types"));
function getAnimationEnd() {
  var style = document.createElement('div').style;
  if ('webkitAnimation' in style) {
    return 'webkitAnimationEnd';
  }
  return 'animationend';
}
var animationPropTypes = exports.animationPropTypes = {
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func
};