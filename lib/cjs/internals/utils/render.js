'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.render = render;
var _react = _interopRequireDefault(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var majorVersion = parseInt(_react.default.version);
var SuperposedReactDOM = ReactDOM;

/**
 * Renders a React element into a container element.
 *
 */
function render(element, container) {
  var mountElement = document.createElement('div');
  mountElement.className = 'rs-mount-element';
  var containerElement = container || document.body;

  // Add the detached element to the root
  containerElement.appendChild(mountElement);
  if (majorVersion >= 18) {
    /**
     * ignore react 18 warnings
     * Warning: You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".
     */
    ReactDOM['__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'].usingClientEntryPoint = true;
    var createRoot = SuperposedReactDOM.createRoot;
    var root = containerElement.__root || createRoot(mountElement, {
      identifierPrefix: 'rs-root-'
    });
    root.render(element);
    containerElement.__root = root;
    return root;
  }
  SuperposedReactDOM.render(element, mountElement);
  return {
    unmount: function unmount() {
      SuperposedReactDOM.unmountComponentAtNode(mountElement);
      containerElement.removeChild(mountElement);
    }
  };
}
var _default = exports.default = render;