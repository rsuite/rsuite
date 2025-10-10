'use client';
"use strict";

exports.__esModule = true;
exports.useIsomorphicLayoutEffect = exports.default = void 0;
var _react = require("react");
var useIsomorphicLayoutEffect = exports.useIsomorphicLayoutEffect = typeof document !== 'undefined' ? _react.useLayoutEffect : _react.useEffect;
var _default = exports.default = useIsomorphicLayoutEffect;