'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toastPlacements = exports.defaultToasterContainer = exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));
var _Transition = _interopRequireDefault(require("../Animation/Transition"));
var _ToastContext = _interopRequireDefault(require("./ToastContext"));
var _canUseDOM = _interopRequireDefault(require("dom-lib/canUseDOM"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _render = require("./render");
var _excluded = ["as", "className", "classPrefix", "placement"],
  _excluded2 = ["className"],
  _excluded3 = ["container"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var defaultToasterContainer = exports.defaultToasterContainer = function defaultToasterContainer() {
  return _canUseDOM.default ? document.body : null;
};
var toastPlacements = exports.toastPlacements = ['topCenter', 'bottomCenter', 'topStart', 'topEnd', 'bottomStart', 'bottomEnd'];
var useMessages = function useMessages() {
  var _useState = (0, _react.useState)([]),
    messages = _useState[0],
    setMessages = _useState[1];
  var getKey = (0, _react.useCallback)(function (key) {
    if (typeof key === 'undefined' && messages.length) {
      return messages[messages.length - 1].key;
    }
    return key;
  }, [messages]);
  var push = (0, _react.useCallback)(function (message, options) {
    var _ref = options || {},
      duration = _ref.duration,
      _ref$mouseReset = _ref.mouseReset,
      mouseReset = _ref$mouseReset === void 0 ? true : _ref$mouseReset,
      container = _ref.container;
    var key = (0, _utils.guid)();
    setMessages(function (prevMessages) {
      return [].concat(prevMessages, [{
        key: key,
        visible: true,
        node: message,
        duration: duration,
        mouseReset: mouseReset,
        container: container
      }]);
    });
    return key;
  }, []);
  var clear = (0, _react.useCallback)(function () {
    // Set all existing messages to be invisible.
    setMessages(messages.map(function (msg) {
      return (0, _extends2.default)({}, msg, {
        visible: false
      });
    }));

    // Remove all invisible messages after 400ms.
    // The delay removal here is to preserve the animation.
    setTimeout(function () {
      setMessages(function () {
        return [];
      });
    }, 400);
  }, [messages]);
  var remove = (0, _react.useCallback)(function (key) {
    // Set the message of the specified key to invisible.
    setMessages(messages.map(function (n) {
      if (n.key === getKey(key)) {
        n.visible = false;
      }
      return n;
    }));

    // Remove invisible messages after 400ms.
    setTimeout(function () {
      setMessages(function (prevMessages) {
        return prevMessages.filter(function (msg) {
          return msg.visible;
        });
      });
    }, 400);
  }, [messages, getKey]);
  return {
    messages: messages,
    push: push,
    clear: clear,
    remove: remove
  };
};
var ToastContainer = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'toast-container' : _props$classPrefix,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'topCenter' : _props$placement,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    rootPrefix = _useClassNames.rootPrefix;
  var classes = merge(className, withClassPrefix((0, _kebabCase.default)(placement)));
  var _useMessages = useMessages(),
    push = _useMessages.push,
    clear = _useMessages.clear,
    remove = _useMessages.remove,
    messages = _useMessages.messages;
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      push: push,
      clear: clear,
      remove: remove
    };
  });
  var elements = messages.map(function (item) {
    var mouseReset = item.mouseReset,
      duration = item.duration,
      node = item.node;
    return /*#__PURE__*/_react.default.createElement(_ToastContext.default.Provider, {
      value: {
        usedToaster: true,
        mouseReset: mouseReset,
        duration: duration
      },
      key: item.key
    }, /*#__PURE__*/_react.default.createElement(_Transition.default, {
      in: item.visible,
      exitedClassName: rootPrefix('toast-fade-exited'),
      exitingClassName: rootPrefix('toast-fade-exiting'),
      enteringClassName: rootPrefix('toast-fade-entering'),
      enteredClassName: rootPrefix('toast-fade-entered'),
      timeout: 300
    }, function (transitionProps, ref) {
      var _node$props, _node$props2;
      var transitionClassName = transitionProps.className,
        rest = (0, _objectWithoutPropertiesLoose2.default)(transitionProps, _excluded2);
      return /*#__PURE__*/_react.default.cloneElement(node, (0, _extends2.default)({}, rest, {
        ref: ref,
        duration: duration,
        onClose: (0, _utils.createChainedFunction)((_node$props = node.props) === null || _node$props === void 0 ? void 0 : _node$props.onClose, function () {
          return remove(item.key);
        }),
        className: merge(rootPrefix('toast'), (_node$props2 = node.props) === null || _node$props2 === void 0 ? void 0 : _node$props2.className, transitionClassName)
      }));
    }));
  });
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    className: classes
  }), elements);
});
ToastContainer.getInstance = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(props) {
    var container, rest, getRefResolve, getRefPromise, containerRef, containerId;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          container = props.container, rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded3);
          getRefResolve = null;
          getRefPromise = new Promise(function (res) {
            getRefResolve = res;
          });
          containerRef = /*#__PURE__*/_react.default.createRef(); // promise containerId & containerRef all have value
          containerId = (0, _render.render)(/*#__PURE__*/_react.default.createElement(ToastContainer, (0, _extends2.default)({}, rest, {
            ref: function ref(_ref3) {
              containerRef.current = _ref3;
              getRefResolve && getRefResolve();
            }
          })), container);
          _context.next = 7;
          return getRefPromise;
        case 7:
          return _context.abrupt("return", [containerRef, containerId]);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();
ToastContainer.displayName = 'ToastContainer';
ToastContainer.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  placement: _propTypes.default.elementType,
  container: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  callback: _propTypes.default.func
};
var _default = exports.default = ToastContainer;