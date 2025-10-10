'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _DisclosureContext = require("./DisclosureContext");
var _constants = require("../constants");
var _useDisclosureContext2 = _interopRequireDefault(require("./useDisclosureContext"));
function DisclosureButton(props) {
  var children = props.children;
  var buttonRef = (0, _react.useRef)(null);
  var _useDisclosureContext = (0, _useDisclosureContext2.default)(DisclosureButton.displayName),
    open = _useDisclosureContext[0].open,
    dispatch = _useDisclosureContext[1],
    onToggle = _useDisclosureContext[2].onToggle;
  var toggle = (0, _react.useCallback)(function (event) {
    if (!open) {
      dispatch({
        type: _DisclosureContext.DisclosureActionTypes.Show
      });
      onToggle === null || onToggle === void 0 || onToggle(true, event);
    } else {
      dispatch({
        type: _DisclosureContext.DisclosureActionTypes.Hide
      });
      onToggle === null || onToggle === void 0 || onToggle(false, event);
    }
  }, [open, dispatch, onToggle]);
  var onClick = (0, _react.useCallback)(function (event) {
    toggle(event);
  }, [toggle]);
  var onKeyDown = (0, _react.useCallback)(function (event) {
    switch (event.key) {
      case _constants.KEY_VALUES.ENTER:
      case _constants.KEY_VALUES.SPACE:
        event.preventDefault();
        event.stopPropagation();
        toggle(event);
        break;
    }
  }, [toggle]);
  return children({
    role: 'button',
    'aria-expanded': open,
    onClick: onClick,
    onKeyDown: onKeyDown,
    open: open
  }, buttonRef);
}
DisclosureButton.displayName = 'Disclosure.Button';
var _default = exports.default = DisclosureButton;