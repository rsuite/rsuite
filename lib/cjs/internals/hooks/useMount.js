'use client';
"use strict";

exports.__esModule = true;
exports.useMount = exports.default = void 0;
var _react = require("react");
var useMount = exports.useMount = function useMount(callback) {
  var mountRef = (0, _react.useRef)(callback);
  mountRef.current = callback;
  (0, _react.useEffect)(function () {
    var _mountRef$current;
    (_mountRef$current = mountRef.current) === null || _mountRef$current === void 0 || _mountRef$current.call(mountRef);
  }, []);
};
var _default = exports.default = useMount;