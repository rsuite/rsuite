'use client';
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["as", "className", "classPrefix", "placement"],
  _excluded2 = ["className"],
  _excluded3 = ["container"];
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React, { useState, useImperativeHandle, useCallback } from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import Transition from "../Animation/Transition.js";
import ToastContext from "./ToastContext.js";
import canUseDOM from 'dom-lib/canUseDOM';
import { useClassNames } from "../internals/hooks/index.js";
import { guid, createChainedFunction } from "../internals/utils/index.js";
import { render } from "./render.js";
export var defaultToasterContainer = function defaultToasterContainer() {
  return canUseDOM ? document.body : null;
};
export var toastPlacements = ['topCenter', 'bottomCenter', 'topStart', 'topEnd', 'bottomStart', 'bottomEnd'];
var useMessages = function useMessages() {
  var _useState = useState([]),
    messages = _useState[0],
    setMessages = _useState[1];
  var getKey = useCallback(function (key) {
    if (typeof key === 'undefined' && messages.length) {
      return messages[messages.length - 1].key;
    }
    return key;
  }, [messages]);
  var push = useCallback(function (message, options) {
    var _ref = options || {},
      duration = _ref.duration,
      _ref$mouseReset = _ref.mouseReset,
      mouseReset = _ref$mouseReset === void 0 ? true : _ref$mouseReset,
      container = _ref.container;
    var key = guid();
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
  var clear = useCallback(function () {
    // Set all existing messages to be invisible.
    setMessages(messages.map(function (msg) {
      return _extends({}, msg, {
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
  var remove = useCallback(function (key) {
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
var ToastContainer = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'toast-container' : _props$classPrefix,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'topCenter' : _props$placement,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    rootPrefix = _useClassNames.rootPrefix;
  var classes = merge(className, withClassPrefix(kebabCase(placement)));
  var _useMessages = useMessages(),
    push = _useMessages.push,
    clear = _useMessages.clear,
    remove = _useMessages.remove,
    messages = _useMessages.messages;
  useImperativeHandle(ref, function () {
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
    return /*#__PURE__*/React.createElement(ToastContext.Provider, {
      value: {
        usedToaster: true,
        mouseReset: mouseReset,
        duration: duration
      },
      key: item.key
    }, /*#__PURE__*/React.createElement(Transition, {
      in: item.visible,
      exitedClassName: rootPrefix('toast-fade-exited'),
      exitingClassName: rootPrefix('toast-fade-exiting'),
      enteringClassName: rootPrefix('toast-fade-entering'),
      enteredClassName: rootPrefix('toast-fade-entered'),
      timeout: 300
    }, function (transitionProps, ref) {
      var _node$props, _node$props2;
      var transitionClassName = transitionProps.className,
        rest = _objectWithoutPropertiesLoose(transitionProps, _excluded2);
      return /*#__PURE__*/React.cloneElement(node, _extends({}, rest, {
        ref: ref,
        duration: duration,
        onClose: createChainedFunction((_node$props = node.props) === null || _node$props === void 0 ? void 0 : _node$props.onClose, function () {
          return remove(item.key);
        }),
        className: merge(rootPrefix('toast'), (_node$props2 = node.props) === null || _node$props2 === void 0 ? void 0 : _node$props2.className, transitionClassName)
      }));
    }));
  });
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    className: classes
  }), elements);
});
ToastContainer.getInstance = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(props) {
    var container, rest, getRefResolve, getRefPromise, containerRef, containerId;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          container = props.container, rest = _objectWithoutPropertiesLoose(props, _excluded3);
          getRefResolve = null;
          getRefPromise = new Promise(function (res) {
            getRefResolve = res;
          });
          containerRef = /*#__PURE__*/React.createRef(); // promise containerId & containerRef all have value
          containerId = render(/*#__PURE__*/React.createElement(ToastContainer, _extends({}, rest, {
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
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  placement: PropTypes.elementType,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  callback: PropTypes.func
};
export default ToastContainer;