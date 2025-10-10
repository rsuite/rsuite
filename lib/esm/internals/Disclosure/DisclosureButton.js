'use client';
import { useCallback, useRef } from 'react';
import { DisclosureActionTypes } from "./DisclosureContext.js";
import { KEY_VALUES } from "../constants/index.js";
import useDisclosureContext from "./useDisclosureContext.js";
function DisclosureButton(props) {
  var children = props.children;
  var buttonRef = useRef(null);
  var _useDisclosureContext = useDisclosureContext(DisclosureButton.displayName),
    open = _useDisclosureContext[0].open,
    dispatch = _useDisclosureContext[1],
    onToggle = _useDisclosureContext[2].onToggle;
  var toggle = useCallback(function (event) {
    if (!open) {
      dispatch({
        type: DisclosureActionTypes.Show
      });
      onToggle === null || onToggle === void 0 || onToggle(true, event);
    } else {
      dispatch({
        type: DisclosureActionTypes.Hide
      });
      onToggle === null || onToggle === void 0 || onToggle(false, event);
    }
  }, [open, dispatch, onToggle]);
  var onClick = useCallback(function (event) {
    toggle(event);
  }, [toggle]);
  var onKeyDown = useCallback(function (event) {
    switch (event.key) {
      case KEY_VALUES.ENTER:
      case KEY_VALUES.SPACE:
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
export default DisclosureButton;