'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useMap = useMap;
var _react = require("react");
function useMap() {
  var _useState = (0, _react.useState)(function () {
      return new Map();
    }),
    map = _useState[0],
    setMap = _useState[1];
  return (0, _react.useMemo)(function () {
    return {
      has: function has(key) {
        return map.has(key);
      },
      get: function get(key) {
        return map.get(key);
      },
      set: function set(key, value) {
        setMap(function (prev) {
          var copy = new Map(prev);
          copy.set(key, value);
          return copy;
        });
      },
      clear: function clear() {
        setMap(new Map());
      }
    };
  }, [map]);
}
var _default = exports.default = useMap;