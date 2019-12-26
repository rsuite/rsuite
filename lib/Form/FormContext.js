"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.FormPlaintextContext = exports.FormErrorContext = exports.FormValueContext = exports.FormContext = void 0;

var _createContext = _interopRequireDefault(require("../utils/createContext"));

var FormContext = (0, _createContext.default)({});
exports.FormContext = FormContext;
var FormValueContext = (0, _createContext.default)({});
exports.FormValueContext = FormValueContext;
var FormErrorContext = (0, _createContext.default)({});
exports.FormErrorContext = FormErrorContext;
var FormPlaintextContext = (0, _createContext.default)(false);
exports.FormPlaintextContext = FormPlaintextContext;
var _default = FormContext;
exports.default = _default;