'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
var _excluded = ["placement", "container"];
import _regeneratorRuntime from "@babel/runtime/regenerator";
import ToastContainer, { defaultToasterContainer } from "./ToastContainer.js";
import { toasterKeyOfContainerElement } from "./render.js";
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
  _createContainer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(placement, props) {
    var _yield$ToastContainer, container, containerId;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return ToastContainer.getInstance(props);
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
    container = _options$container === void 0 ? defaultToasterContainer : _options$container,
    restOptions = _objectWithoutPropertiesLoose(_options, _excluded);
  var containerElement = typeof container === 'function' ? container() : container;
  var containerElementId = containerElement ? containerElement[toasterKeyOfContainerElement] : null;
  if (containerElementId) {
    var existedContainer = getContainer(containerElementId, placement);
    if (existedContainer) {
      var _existedContainer$cur;
      return (_existedContainer$cur = existedContainer.current) === null || _existedContainer$cur === void 0 ? void 0 : _existedContainer$cur.push(message, restOptions);
    }
  }
  var newOptions = _extends({}, options, {
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
export default _toaster;