'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _toaster = _interopRequireDefault(require("../toaster"));
var _CustomContext = require("../CustomProvider/CustomContext");
// From CustomProvider/CustomProvider.tsx import CustomContext instead of directly from 'CustomProvider/index.ts'
// because babel compiles commonjs, which causes CustomContext to be undefined

/**
 * Toaster display brief, temporary notifications of actions, errors, or other events in an application.
 * It is often used with the Message and Notification components.
 * @returns toaster { push, remove, clear }
 *
 * @see https://rsuitejs.com/components/toaster/
 */
var useToaster = function useToaster() {
  var _useContext = (0, _react.useContext)(_CustomContext.CustomContext),
    toasters = _useContext.toasters,
    toastContainer = _useContext.toastContainer;
  return (0, _react.useMemo)(function () {
    return {
      /**
       * Push a toast message.
       * @param message The message to be displayed.
       *                eg: `<Message type="success" description="Success" />` or `<Notification type="success" closable>Success</Notification>`
       * @param options The options of the toast message. (optional)
       *                eg: `{ placement: 'topCenter', duration: 5000 }`
       * @returns The key of the toast message.
       */
      push: function push(message, options) {
        var container = (typeof (options === null || options === void 0 ? void 0 : options.container) === 'function' ? options === null || options === void 0 ? void 0 : options.container() : options === null || options === void 0 ? void 0 : options.container) || toastContainer;
        if (container === toastContainer) {
          var _toasters$current;
          return toasters === null || toasters === void 0 || (_toasters$current = toasters.current) === null || _toasters$current === void 0 || (_toasters$current = _toasters$current.get((options === null || options === void 0 ? void 0 : options.placement) || 'topCenter')) === null || _toasters$current === void 0 ? void 0 : _toasters$current.push(message, options);
        } else {
          return _toaster.default.push(message, options);
        }
      },
      /**
       * Remove a toast message.
       * @param key  The key of the toast message.
       */
      remove: function remove(key) {
        toasters ? Array.from(toasters.current).forEach(function (_ref) {
          var c = _ref[1];
          return c === null || c === void 0 ? void 0 : c.remove(key);
        }) : _toaster.default.remove(key);
      },
      /**
       * Clear all toast messages.
       */
      clear: function clear() {
        toasters ? Array.from(toasters.current).forEach(function (_ref2) {
          var c = _ref2[1];
          return c === null || c === void 0 ? void 0 : c.clear();
        }) : _toaster.default.clear();
      }
    };
  }, [toastContainer, toasters]);
};
var _default = exports.default = useToaster;