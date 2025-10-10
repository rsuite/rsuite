'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "children", "transition", "dialogTransitionTimeout", "style", "className", "container", "animationProps", "containerClassName", "keyboard", "enforceFocus", "backdrop", "backdropTransitionTimeout", "backdropStyle", "backdropClassName", "open", "autoFocus", "onEsc", "onExit", "onExiting", "onExited", "onEnter", "onEntering", "onEntered", "onClose", "onOpen"],
  _excluded2 = ["className"];
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import contains from 'dom-lib/contains';
import on from 'dom-lib/on';
import { KEY_VALUES } from "../constants/index.js";
import { usePortal, useWillUnmount, useEventCallback } from "../hooks/index.js";
import { mergeRefs, createChainedFunction } from "../utils/index.js";
import ModalManager from "./ModalManager.js";
import Fade from "../../Animation/Fade.js";
import { animationPropTypes } from "../../Animation/utils.js";
import OverlayContext from "./OverlayContext.js";
var manager;
function getManager() {
  if (!manager) manager = new ModalManager();
  return manager;
}
var useModalManager = function useModalManager() {
  var modalManager = getManager();
  var modal = useRef({
    dialog: null,
    backdrop: null
  });
  return {
    get dialog() {
      var _modal$current;
      return (_modal$current = modal.current) === null || _modal$current === void 0 ? void 0 : _modal$current.dialog;
    },
    add: function add(containerElement, containerClassName) {
      return modalManager.add(modal.current, containerElement, containerClassName);
    },
    remove: function remove() {
      return modalManager.remove(modal.current);
    },
    isTopModal: function isTopModal() {
      return modalManager.isTopModal(modal.current);
    },
    setDialogRef: useCallback(function (ref) {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: useCallback(function (ref) {
      modal.current.backdrop = ref;
    }, [])
  };
};
var Modal = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    children = props.children,
    Transition = props.transition,
    dialogTransitionTimeout = props.dialogTransitionTimeout,
    style = props.style,
    className = props.className,
    container = props.container,
    animationProps = props.animationProps,
    containerClassName = props.containerClassName,
    _props$keyboard = props.keyboard,
    keyboard = _props$keyboard === void 0 ? true : _props$keyboard,
    _props$enforceFocus = props.enforceFocus,
    enforceFocus = _props$enforceFocus === void 0 ? true : _props$enforceFocus,
    _props$backdrop = props.backdrop,
    backdrop = _props$backdrop === void 0 ? true : _props$backdrop,
    backdropTransitionTimeout = props.backdropTransitionTimeout,
    backdropStyle = props.backdropStyle,
    backdropClassName = props.backdropClassName,
    open = props.open,
    _props$autoFocus = props.autoFocus,
    autoFocus = _props$autoFocus === void 0 ? true : _props$autoFocus,
    onEsc = props.onEsc,
    onExit = props.onExit,
    onExiting = props.onExiting,
    onExited = props.onExited,
    onEnter = props.onEnter,
    onEntering = props.onEntering,
    onEntered = props.onEntered,
    onClose = props.onClose,
    onOpen = props.onOpen,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useState = useState(!open),
    exited = _useState[0],
    setExited = _useState[1];
  var _usePortal = usePortal({
      container: container
    }),
    Portal = _usePortal.Portal,
    containerElement = _usePortal.target;
  var modal = useModalManager();
  if (open) {
    if (exited) setExited(false);
  } else if (!Transition && !exited) {
    setExited(true);
  }
  var mountModal = open || Transition && !exited;
  var lastFocus = useRef(null);
  var handleDocumentKeyDown = useEventCallback(function (event) {
    if (keyboard && event.key === KEY_VALUES.ESC && modal.isTopModal()) {
      onEsc === null || onEsc === void 0 || onEsc(event);
      onClose === null || onClose === void 0 || onClose(event);
    }
  });
  var restoreLastFocus = useCallback(function () {
    if (lastFocus.current) {
      var _lastFocus$current$fo, _lastFocus$current;
      (_lastFocus$current$fo = (_lastFocus$current = lastFocus.current).focus) === null || _lastFocus$current$fo === void 0 || _lastFocus$current$fo.call(_lastFocus$current);
      lastFocus.current = null;
    }
  }, []);

  /**
   * Determines if the currently focused element is inside the dialog,
   * and if not, returns the focus to the dialog.
   *
   */
  var handleFocusDialog = useEventCallback(function (onBeforeFocusCallback) {
    var currentActiveElement = document.activeElement;
    var dialog = modal.dialog;
    if (dialog && currentActiveElement && !contains(dialog, currentActiveElement)) {
      onBeforeFocusCallback === null || onBeforeFocusCallback === void 0 || onBeforeFocusCallback();
      dialog.focus();
    }
  });
  var handleEnforceFocus = useEventCallback(function () {
    if (!enforceFocus || !modal.isTopModal()) {
      return;
    }
    handleFocusDialog();
  });
  var documentKeyDownListener = useRef();
  var documentFocusListener = useRef();
  var handleOpen = useEventCallback(function () {
    if (containerElement) {
      modal.add(containerElement, containerClassName);
    }
    if (!documentKeyDownListener.current) {
      documentKeyDownListener.current = on(document, 'keydown', handleDocumentKeyDown);
    }
    if (!documentFocusListener.current) {
      documentFocusListener.current = on(document, 'focus', handleEnforceFocus, true);
    }
    if (autoFocus) {
      handleFocusDialog(function () {
        lastFocus.current = document.activeElement;
      });
    }
    onOpen === null || onOpen === void 0 || onOpen();
  });
  var handleClose = useEventCallback(function () {
    var _documentKeyDownListe, _documentFocusListene;
    modal.remove();
    (_documentKeyDownListe = documentKeyDownListener.current) === null || _documentKeyDownListe === void 0 || _documentKeyDownListe.off();
    documentKeyDownListener.current = null;
    (_documentFocusListene = documentFocusListener.current) === null || _documentFocusListene === void 0 || _documentFocusListene.off();
    documentFocusListener.current = null;
    restoreLastFocus();
  });
  useEffect(function () {
    if (!open) {
      return;
    }
    handleOpen();
  }, [open, handleOpen]);
  useEffect(function () {
    if (!exited) {
      return;
    }
    handleClose();
  }, [exited, handleClose]);
  useWillUnmount(function () {
    handleClose();
  });
  var handleExited = useCallback(function () {
    setExited(true);
  }, []);
  var contextValue = useMemo(function () {
    return {
      overlayContainer: function overlayContainer() {
        return modal.dialog;
      }
    };
  }, [modal.dialog]);
  if (!mountModal) {
    return null;
  }
  var renderBackdrop = function renderBackdrop() {
    if (Transition) {
      return /*#__PURE__*/React.createElement(Fade, {
        transitionAppear: true,
        in: open,
        timeout: backdropTransitionTimeout
      }, function (fadeProps, ref) {
        var className = fadeProps.className,
          rest = _objectWithoutPropertiesLoose(fadeProps, _excluded2);
        return /*#__PURE__*/React.createElement("div", _extends({
          "aria-hidden": true,
          "data-testid": "backdrop"
        }, rest, {
          style: backdropStyle,
          ref: mergeRefs(modal.setBackdropRef, ref),
          className: classNames(backdropClassName, className)
        }));
      });
    }
    return /*#__PURE__*/React.createElement("div", {
      "aria-hidden": true,
      style: backdropStyle,
      className: backdropClassName
    });
  };
  var dialogElement = Transition ? /*#__PURE__*/React.createElement(Transition, _extends({}, animationProps, {
    transitionAppear: true,
    unmountOnExit: true,
    in: open,
    timeout: dialogTransitionTimeout,
    onExit: onExit,
    onExiting: onExiting,
    onExited: createChainedFunction(handleExited, onExited),
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered
  }), children) : children;
  return /*#__PURE__*/React.createElement(OverlayContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Portal, null, backdrop && renderBackdrop(), /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: mergeRefs(modal.setDialogRef, ref),
    style: style,
    className: className,
    tabIndex: -1
  }), dialogElement)));
});
export var modalPropTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  backdropClassName: PropTypes.string,
  style: PropTypes.object,
  backdropStyle: PropTypes.object,
  open: PropTypes.bool,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  keyboard: PropTypes.bool,
  autoFocus: PropTypes.bool,
  enforceFocus: PropTypes.bool,
  animationProps: PropTypes.object,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};
Modal.displayName = 'OverlayModal';
Modal.propTypes = _extends({}, animationPropTypes, modalPropTypes, {
  children: PropTypes.func,
  container: PropTypes.any,
  containerClassName: PropTypes.string,
  dialogTransitionTimeout: PropTypes.number,
  backdropTransitionTimeout: PropTypes.number,
  transition: PropTypes.any,
  onEsc: PropTypes.func
});
export default Modal;