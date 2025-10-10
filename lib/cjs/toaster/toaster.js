'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ToastContainer = _interopRequireWildcard(require("./ToastContainer"));
var _render = require("./render");
var _excluded = ["placement", "container"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var containers = new Map();

/**
 * Create a container instance.
 * @param placement
 * @param props
 */
function createContainer(_x, _x2) {
  return _createContainer.apply(this, arguments);
}
/**
 * Get the container by ID. Use default ID when ID is not available.
 * @param containerId
 * @param placement
 */
function _createContainer() {
  _createContainer = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(placement, props) {
    var _yield$ToastContainer, container, containerId;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _ToastContainer.default.getInstance(props);
        case 2:
          _yield$ToastContainer = _context.sent;
          container = _yield$ToastContainer[0];
          containerId = _yield$ToastContainer[1];
          containers.set(containerId + "_" + placement, container);
          return _context.abrupt("return", container);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _createContainer.apply(this, arguments);
}
function getContainer(containerId, placement) {
  return containers.get(containerId + "_" + placement);
}
var _toaster = function toaster(message) {
  return _toaster.push(message);
};
_toaster.push = function (message, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    _options$placement = _options.placement,
    placement = _options$placement === void 0 ? 'topCenter' : _options$placement,
    _options$container = _options.container,
    container = _options$container === void 0 ? _ToastContainer.defaultToasterContainer : _options$container,
    restOptions = (0, _objectWithoutPropertiesLoose2.default)(_options, _excluded);
  var containerElement = typeof container === 'function' ? container() : container;
  var containerElementId = containerElement ? containerElement[_render.toasterKeyOfContainerElement] : null;
  if (containerElementId) {
    var existedContainer = getContainer(containerElementId, placement);
    if (existedContainer) {
      var _existedContainer$cur;
      return (_existedContainer$cur = existedContainer.current) === null || _existedContainer$cur === void 0 ? void 0 : _existedContainer$cur.push(message, restOptions);
    }
  }
  var newOptions = (0, _extends2.default)({}, options, {
    container: containerElement,
    placement: placement
  });
  return createContainer(placement, newOptions).then(function (ref) {
    var _ref$current;
    return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.push(message, restOptions);
  });
};
_toaster.remove = function (key) {
  containers.forEach(function (c) {
    var _c$current;
    return (_c$current = c.current) === null || _c$current === void 0 ? void 0 : _c$current.remove(key);
  });
};
_toaster.clear = function () {
  containers.forEach(function (c) {
    var _c$current2;
    return (_c$current2 = c.current) === null || _c$current2 === void 0 ? void 0 : _c$current2.clear();
  });
};
var _default = exports.default = _toaster;