'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
// Headless Disclosure
// Ref: https://w3c.github.io/aria-practices/#disclosure
import React, { useMemo, useReducer, useRef, useCallback, useContext } from 'react';
import DisclosureContext, { DisclosureActionTypes } from "./DisclosureContext.js";
import DisclosureButton from "./DisclosureButton.js";
import DisclosureContent from "./DisclosureContent.js";
import useClickOutside from "../hooks/useClickOutside.js";
var initialDisclosureState = {
  open: false
};
function disclosureReducer(state, action) {
  switch (action.type) {
    case DisclosureActionTypes.Show:
      return _extends({}, state, {
        open: true
      });
    case DisclosureActionTypes.Hide:
      return _extends({}, state, {
        open: false
      });
  }
  return state;
}
var Disclosure = /*#__PURE__*/React.memo(function (props) {
  var children = props.children,
    openProp = props.open,
    _props$defaultOpen = props.defaultOpen,
    defaultOpen = _props$defaultOpen === void 0 ? false : _props$defaultOpen,
    _props$hideOnClickOut = props.hideOnClickOutside,
    hideOnClickOutside = _props$hideOnClickOut === void 0 ? false : _props$hideOnClickOut,
    onToggle = props.onToggle,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? ['click'] : _props$trigger;
  var parentDisclosure = useContext(DisclosureContext);
  var _useReducer = useReducer(disclosureReducer, _extends({}, initialDisclosureState, {
      open: defaultOpen
    })),
    openState = _useReducer[0].open,
    dispatch = _useReducer[1];
  var containerElementRef = useRef(null);
  var open = openProp !== null && openProp !== void 0 ? openProp : openState;
  useClickOutside({
    enabled: hideOnClickOutside,
    isOutside: function isOutside(event) {
      var _containerElementRef$;
      return !((_containerElementRef$ = containerElementRef.current) !== null && _containerElementRef$ !== void 0 && _containerElementRef$.contains(event.target));
    },
    handle: function handle() {
      return dispatch({
        type: DisclosureActionTypes.Hide
      });
    }
  });
  var onMouseEnter = useCallback(function (event) {
    if (!open) {
      dispatch({
        type: DisclosureActionTypes.Show
      });
      onToggle === null || onToggle === void 0 || onToggle(true, event);
    }
  }, [open, dispatch, onToggle]);
  var onMouseLeave = useCallback(function (event) {
    if (open) {
      dispatch({
        type: DisclosureActionTypes.Hide
      });
      onToggle === null || onToggle === void 0 || onToggle(false, event);
    }
  }, [open, dispatch, onToggle]);
  var contextValue = useMemo(function () {
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
  var renderProps = useMemo(function () {
    var renderProps = {
      open: open
    };
    if (trigger.includes('hover')) {
      renderProps.onMouseEnter = onMouseEnter;
      renderProps.onMouseLeave = onMouseLeave;
    }
    return renderProps;
  }, [open, trigger, onMouseEnter, onMouseLeave]);
  return /*#__PURE__*/React.createElement(DisclosureContext.Provider, {
    value: contextValue
  }, children(renderProps, containerElementRef));
});
Disclosure.Button = DisclosureButton;
Disclosure.Content = DisclosureContent;
export default Disclosure;