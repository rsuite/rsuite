'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _DisclosureContext = _interopRequireWildcard(require("./DisclosureContext"));
var _DisclosureButton = _interopRequireDefault(require("./DisclosureButton"));
var _DisclosureContent = _interopRequireDefault(require("./DisclosureContent"));
var _useClickOutside = _interopRequireDefault(require("../hooks/useClickOutside"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Headless Disclosure
// Ref: https://w3c.github.io/aria-practices/#disclosure

var initialDisclosureState = {
  open: false
};
function disclosureReducer(state, action) {
  switch (action.type) {
    case _DisclosureContext.DisclosureActionTypes.Show:
      return (0, _extends2.default)({}, state, {
        open: true
      });
    case _DisclosureContext.DisclosureActionTypes.Hide:
      return (0, _extends2.default)({}, state, {
        open: false
      });
  }
  return state;
}
var Disclosure = /*#__PURE__*/_react.default.memo(function (props) {
  var children = props.children,
    openProp = props.open,
    _props$defaultOpen = props.defaultOpen,
    defaultOpen = _props$defaultOpen === void 0 ? false : _props$defaultOpen,
    _props$hideOnClickOut = props.hideOnClickOutside,
    hideOnClickOutside = _props$hideOnClickOut === void 0 ? false : _props$hideOnClickOut,
    onToggle = props.onToggle,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? ['click'] : _props$trigger;
  var parentDisclosure = (0, _react.useContext)(_DisclosureContext.default);
  var _useReducer = (0, _react.useReducer)(disclosureReducer, (0, _extends2.default)({}, initialDisclosureState, {
      open: defaultOpen
    })),
    openState = _useReducer[0].open,
    dispatch = _useReducer[1];
  var containerElementRef = (0, _react.useRef)(null);
  var open = openProp !== null && openProp !== void 0 ? openProp : openState;
  (0, _useClickOutside.default)({
    enabled: hideOnClickOutside,
    isOutside: function isOutside(event) {
      var _containerElementRef$;
      return !((_containerElementRef$ = containerElementRef.current) !== null && _containerElementRef$ !== void 0 && _containerElementRef$.contains(event.target));
    },
    handle: function handle() {
      return dispatch({
        type: _DisclosureContext.DisclosureActionTypes.Hide
      });
    }
  });
  var onMouseEnter = (0, _react.useCallback)(function (event) {
    if (!open) {
      dispatch({
        type: _DisclosureContext.DisclosureActionTypes.Show
      });
      onToggle === null || onToggle === void 0 || onToggle(true, event);
    }
  }, [open, dispatch, onToggle]);
  var onMouseLeave = (0, _react.useCallback)(function (event) {
    if (open) {
      dispatch({
        type: _DisclosureContext.DisclosureActionTypes.Hide
      });
      onToggle === null || onToggle === void 0 || onToggle(false, event);
    }
  }, [open, dispatch, onToggle]);
  var contextValue = (0, _react.useMemo)(function () {
    var cascadeDispatch = function cascadeDispatch(action) {
      var result = dispatch(action);
      if ('cascade' in action) {
        parentDisclosure === null || parentDisclosure === void 0 || parentDisclosure[1](action);
      }
      return result;
    };
    return [{
      open: open
    }, cascadeDispatch, {
      onToggle: onToggle,
      trigger: trigger
    }];
  }, [parentDisclosure, open, dispatch, onToggle, trigger]);
  var renderProps = (0, _react.useMemo)(function () {
    var renderProps = {
      open: open
    };
    if (trigger.includes('hover')) {
      renderProps.onMouseEnter = onMouseEnter;
      renderProps.onMouseLeave = onMouseLeave;
    }
    return renderProps;
  }, [open, trigger, onMouseEnter, onMouseLeave]);
  return /*#__PURE__*/_react.default.createElement(_DisclosureContext.default.Provider, {
    value: contextValue
  }, children(renderProps, containerElementRef));
});
Disclosure.Button = _DisclosureButton.default;
Disclosure.Content = _DisclosureContent.default;
var _default = exports.default = Disclosure;