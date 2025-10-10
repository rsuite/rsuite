'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Transition = _interopRequireDefault(require("./Transition"));
var _Slide = _interopRequireDefault(require("./Slide"));
var _Collapse = _interopRequireDefault(require("./Collapse"));
var _Fade = _interopRequireDefault(require("./Fade"));
var _Bounce = _interopRequireDefault(require("./Bounce"));
var Animation = {
  Transition: _Transition.default,
  Collapse: _Collapse.default,
  Fade: _Fade.default,
  Bounce: _Bounce.default,
  Slide: _Slide.default
};
var _default = exports.default = Animation;