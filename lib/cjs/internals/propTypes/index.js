'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.refType = exports.oneOf = exports.deprecatePropTypeNew = exports.deprecatePropType = void 0;
exports.tupleType = tupleType;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _oneOf = _interopRequireDefault(require("./oneOf"));
exports.oneOf = _oneOf.default;
var _deprecatePropType = _interopRequireWildcard(require("./deprecatePropType"));
exports.deprecatePropType = _deprecatePropType.default;
exports.deprecatePropTypeNew = _deprecatePropType.deprecatePropTypeNew;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function tupleType() {
  for (var _len = arguments.length, typeCheckers = new Array(_len), _key = 0; _key < _len; _key++) {
    typeCheckers[_key] = arguments[_key];
  }
  return _propTypes.default.arrayOf(function (value, index) {
    var _typeCheckers$index;
    for (var _len2 = arguments.length, rest = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      rest[_key2 - 2] = arguments[_key2];
    }
    return (_typeCheckers$index = typeCheckers[index]).call.apply(_typeCheckers$index, [_propTypes.default, value, index].concat(rest));
  });
}
var refType = exports.refType = _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.any]);