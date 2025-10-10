'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.modalPropTypes = exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _contains = _interopRequireDefault(require("dom-lib/contains"));
var _on = _interopRequireDefault(require("dom-lib/on"));
var _constants = require("../constants");
var _hooks = require("../hooks");
var _utils = require("../utils");
var _ModalManager = _interopRequireDefault(require("./ModalManager"));
var _Fade = _interopRequireDefault(require("../../Animation/Fade"));
var _utils2 = require("../../Animation/utils");
var _OverlayContext = _interopRequireDefault(require("./OverlayContext"));
var _excluded = ["as", "children", "transition", "dialogTransitionTimeout", "style", "className", "container", "animationProps", "containerClassName", "keyboard", "enforceFocus", "backdrop", "backdropTransitionTimeout", "backdropStyle", "backdropClassName", "open", "autoFocus", "onEsc", "onExit", "onExiting", "onExited", "onEnter", "onEntering", "onEntered", "onClose", "onOpen"],
  _excluded2 = ["className"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var manager;
function getManager() {
  if (!manager) manager = new _ModalManager.default();
  return manager;
}
var useModalManager = function useModalManager() {
  var modalManager = getManager();
  var modal = (0, _react.useRef)({
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
    setDialogRef: (0, _react.useCallback)(function (ref) {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: (0, _react.useCallback)(function (ref) {
      modal.current.backdrop = ref;
    }, [])
  };
};
var Modal = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useState = (0, _react.useState)(!open),
    exited = _useState[0],
    setExited = _useState[1];
  var _usePortal = (0, _hooks.usePortal)({
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
  var lastFocus = (0, _react.useRef)(null);
  var handleDocumentKeyDown = (0, _hooks.useEventCallback)(function (event) {
    if (keyboard && event.key === _constants.KEY_VALUES.ESC && modal.isTopModal()) {
      onEsc === null || onEsc === void 0 || onEsc(event);
      onClose === null || onClose === void 0 || onClose(event);
    }
  });
  var restoreLastFocus = (0, _react.useCallback)(function () {
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
  var handleFocusDialog = (0, _hooks.useEventCallback)(function (onBeforeFocusCallback) {
    var currentActiveElement = document.activeElement;
    var dialog = modal.dialog;
    if (dialog && currentActiveElement && !(0, _contains.default)(dialog, currentActiveElement)) {
      onBeforeFocusCallback === null || onBeforeFocusCallback === void 0 || onBeforeFocusCallback();
      dialog.focus();
    }
  });
  var handleEnforceFocus = (0, _hooks.useEventCallback)(function () {
    if (!enforceFocus || !modal.isTopModal()) {
      return;
    }
    handleFocusDialog();
  });
  var documentKeyDownListener = (0, _react.useRef)();
  var documentFocusListener = (0, _react.useRef)();
  var handleOpen = (0, _hooks.useEventCallback)(function () {
    if (containerElement) {
      modal.add(containerElement, containerClassName);
    }
    if (!documentKeyDownListener.current) {
      documentKeyDownListener.current = (0, _on.default)(document, 'keydown', handleDocumentKeyDown);
    }
    if (!documentFocusListener.current) {
      documentFocusListener.current = (0, _on.default)(document, 'focus', handleEnforceFocus, true);
    }
    if (autoFocus) {
      handleFocusDialog(function () {
        lastFocus.current = document.activeElement;
      });
    }
    onOpen === null || onOpen === void 0 || onOpen();
  });
  var handleClose = (0, _hooks.useEventCallback)(function () {
    var _documentKeyDownListe, _documentFocusListene;
    modal.remove();
    (_documentKeyDownListe = documentKeyDownListener.current) === null || _documentKeyDownListe === void 0 || _documentKeyDownListe.off();
    documentKeyDownListener.current = null;
    (_documentFocusListene = documentFocusListener.current) === null || _documentFocusListene === void 0 || _documentFocusListene.off();
    documentFocusListener.current = null;
    restoreLastFocus();
  });
  (0, _react.useEffect)(function () {
    if (!open) {
      return;
    }
    handleOpen();
  }, [open, handleOpen]);
  (0, _react.useEffect)(function () {
    if (!exited) {
      return;
    }
    handleClose();
  }, [exited, handleClose]);
  (0, _hooks.useWillUnmount)(function () {
    handleClose();
  });
  var handleExited = (0, _react.useCallback)(function () {
    setExited(true);
  }, []);
  var contextValue = (0, _react.useMemo)(function () {
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
      return /*#__PURE__*/_react.default.createElement(_Fade.default, {
        transitionAppear: true,
        in: open,
        timeout: backdropTransitionTimeout
      }, function (fadeProps, ref) {
        var className = fadeProps.className,
          rest = (0, _objectWithoutPropertiesLoose2.default)(fadeProps, _excluded2);
        return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
          "aria-hidden": true,
          "data-testid": "backdrop"
        }, rest, {
          style: backdropStyle,
          ref: (0, _utils.mergeRefs)(modal.setBackdropRef, ref),
          className: (0, _classnames.default)(backdropClassName, className)
        }));
      });
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      "aria-hidden": true,
      style: backdropStyle,
      className: backdropClassName
    });
  };
  var dialogElement = Transition ? /*#__PURE__*/_react.default.createElement(Transition, (0, _extends2.default)({}, animationProps, {
    transitionAppear: true,
    unmountOnExit: true,
    in: open,
    timeout: dialogTransitionTimeout,
    onExit: onExit,
    onExiting: onExiting,
    onExited: (0, _utils.createChainedFunction)(handleExited, onExited),
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered
  }), children) : children;
  return /*#__PURE__*/_react.default.createElement(_OverlayContext.default.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(Portal, null, backdrop && renderBackdrop(), /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: (0, _utils.mergeRefs)(modal.setDialogRef, ref),
    style: style,
    className: className,
    tabIndex: -1
  }), dialogElement)));
});
var modalPropTypes = exports.modalPropTypes = {
  as: _propTypes.default.elementType,
  className: _propTypes.default.string,
  backdropClassName: _propTypes.default.string,
  style: _propTypes.default.object,
  backdropStyle: _propTypes.default.object,
  open: _propTypes.default.bool,
  backdrop: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  keyboard: _propTypes.default.bool,
  autoFocus: _propTypes.default.bool,
  enforceFocus: _propTypes.default.bool,
  animationProps: _propTypes.default.object,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func
};
Modal.displayName = 'OverlayModal';
Modal.propTypes = (0, _extends2.default)({}, _utils2.animationPropTypes, modalPropTypes, {
  children: _propTypes.default.func,
  container: _propTypes.default.any,
  containerClassName: _propTypes.default.string,
  dialogTransitionTimeout: _propTypes.default.number,
  backdropTransitionTimeout: _propTypes.default.number,
  transition: _propTypes.default.any,
  onEsc: _propTypes.default.func
});
var _default = exports.default = Modal;