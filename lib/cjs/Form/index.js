'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.useFormClassNames = exports.default = void 0;
var _Form = _interopRequireDefault(require("./Form"));
var _useFormClassNames = _interopRequireDefault(require("./hooks/useFormClassNames"));
exports.useFormClassNames = _useFormClassNames.default;
var _default = exports.default = _Form.default;