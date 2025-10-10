'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _on = _interopRequireDefault(require("dom-lib/on"));
var _getAnimationEnd = _interopRequireDefault(require("dom-lib/getAnimationEnd"));
var _Modal = _interopRequireWildcard(require("../internals/Overlay/Modal"));
var _Bounce = _interopRequireDefault(require("../Animation/Bounce"));
var _ModalDialog = _interopRequireWildcard(require("./ModalDialog"));
var _ModalBody = _interopRequireDefault(require("./ModalBody"));
var _ModalHeader = _interopRequireDefault(require("./ModalHeader"));
var _ModalTitle = _interopRequireDefault(require("./ModalTitle"));
var _ModalFooter = _interopRequireDefault(require("./ModalFooter"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _ModalContext = require("./ModalContext");
var _utils2 = require("./utils");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _templateObject, _templateObject2, _templateObject3;
var _excluded = ["animation", "animationProps", "animationTimeout", "aria-labelledby", "aria-describedby", "backdropClassName", "backdrop", "className", "children", "classPrefix", "dialogClassName", "dialogStyle", "dialogAs", "enforceFocus", "full", "overflow", "open", "onClose", "onEntered", "onEntering", "onExited", "role", "size", "id", "isDrawer", "closeButton"],
  _excluded2 = ["className"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var modalSizes = ['xs', 'sm', 'md', 'lg', 'full'];
/**
 * The `Modal` component is used to show content in a layer above the app.
 * @see https://rsuitejs.com/components/modal
 */
var Modal = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _prefix, _merge;
  var _useCustom = (0, _CustomProvider.useCustom)('Modal', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$an = propsWithDefaults.animation,
    animation = _propsWithDefaults$an === void 0 ? _Bounce.default : _propsWithDefaults$an,
    animationProps = propsWithDefaults.animationProps,
    _propsWithDefaults$an2 = propsWithDefaults.animationTimeout,
    animationTimeout = _propsWithDefaults$an2 === void 0 ? 300 : _propsWithDefaults$an2,
    ariaLabelledby = propsWithDefaults['aria-labelledby'],
    ariaDescribedby = propsWithDefaults['aria-describedby'],
    backdropClassName = propsWithDefaults.backdropClassName,
    _propsWithDefaults$ba = propsWithDefaults.backdrop,
    backdrop = _propsWithDefaults$ba === void 0 ? true : _propsWithDefaults$ba,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'modal' : _propsWithDefaults$cl,
    dialogClassName = propsWithDefaults.dialogClassName,
    dialogStyle = propsWithDefaults.dialogStyle,
    _propsWithDefaults$di = propsWithDefaults.dialogAs,
    Dialog = _propsWithDefaults$di === void 0 ? _ModalDialog.default : _propsWithDefaults$di,
    enforceFocusProp = propsWithDefaults.enforceFocus,
    full = propsWithDefaults.full,
    _propsWithDefaults$ov = propsWithDefaults.overflow,
    overflow = _propsWithDefaults$ov === void 0 ? true : _propsWithDefaults$ov,
    open = propsWithDefaults.open,
    onClose = propsWithDefaults.onClose,
    onEntered = propsWithDefaults.onEntered,
    onEntering = propsWithDefaults.onEntering,
    onExited = propsWithDefaults.onExited,
    _propsWithDefaults$ro = propsWithDefaults.role,
    role = _propsWithDefaults$ro === void 0 ? 'dialog' : _propsWithDefaults$ro,
    _propsWithDefaults$si = propsWithDefaults.size,
    size = _propsWithDefaults$si === void 0 ? 'sm' : _propsWithDefaults$si,
    idProp = propsWithDefaults.id,
    _propsWithDefaults$is = propsWithDefaults.isDrawer,
    isDrawer = _propsWithDefaults$is === void 0 ? false : _propsWithDefaults$is,
    closeButton = propsWithDefaults.closeButton,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var inClass = {
    in: open && !animation
  };
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useState = (0, _react.useState)(false),
    shake = _useState[0],
    setShake = _useState[1];
  var classes = merge(className, prefix((_prefix = {
    full: full
  }, _prefix[size] = modalSizes.includes(size), _prefix)));
  var dialogRef = (0, _react.useRef)(null);
  var transitionEndListener = (0, _react.useRef)();

  // The style of the Modal body will be updated with the size of the window or container.
  var _useBodyStyles = (0, _utils2.useBodyStyles)(dialogRef, {
      overflow: overflow,
      prefix: prefix,
      size: size
    }),
    bodyStyles = _useBodyStyles[0],
    onChangeBodyStyles = _useBodyStyles[1],
    onDestroyEvents = _useBodyStyles[2];
  var dialogId = (0, _hooks.useUniqueId)('dialog-', idProp);
  var modalContextValue = (0, _react.useMemo)(function () {
    return {
      dialogId: dialogId,
      onModalClose: onClose,
      getBodyStyles: function getBodyStyles() {
        return bodyStyles;
      },
      closeButton: closeButton,
      isDrawer: isDrawer
    };
  }, [dialogId, onClose, closeButton, isDrawer, bodyStyles]);
  var handleExited = (0, _react.useCallback)(function (node) {
    var _transitionEndListene;
    onExited === null || onExited === void 0 || onExited(node);
    onDestroyEvents();
    (_transitionEndListene = transitionEndListener.current) === null || _transitionEndListene === void 0 || _transitionEndListene.off();
    transitionEndListener.current = null;
  }, [onDestroyEvents, onExited]);
  var handleEntered = (0, _react.useCallback)(function (node) {
    onEntered === null || onEntered === void 0 || onEntered(node);
    onChangeBodyStyles();
  }, [onChangeBodyStyles, onEntered]);
  var handleEntering = (0, _react.useCallback)(function (node) {
    onEntering === null || onEntering === void 0 || onEntering(node);
    onChangeBodyStyles(true);
  }, [onChangeBodyStyles, onEntering]);
  var backdropClick = _react.default.useRef();
  var handleMouseDown = (0, _react.useCallback)(function (event) {
    backdropClick.current = event.target === event.currentTarget;
  }, []);
  var handleBackdropClick = (0, _react.useCallback)(function (event) {
    // Ignore click events from non-backdrop.
    // fix: https://github.com/rsuite/rsuite/issues/3394
    if (!backdropClick.current) {
      return;
    }

    // Ignore click events from dialog.
    if (event.target === dialogRef.current) {
      return;
    }

    // Ignore click events from dialog children.
    if (event.target !== event.currentTarget) {
      return;
    }

    // When the value of `backdrop` is `static`, a jitter animation will be added to the dialog when clicked.
    if (backdrop === 'static') {
      setShake(true);
      if (!transitionEndListener.current && dialogRef.current) {
        //fix: https://github.com/rsuite/rsuite/blob/a93d13c14fb20cc58204babe3331d3c3da3fe1fd/src/Modal/styles/index.less#L59
        transitionEndListener.current = (0, _on.default)(dialogRef.current, (0, _getAnimationEnd.default)(), function () {
          setShake(false);
        });
      }
      return;
    }
    onClose === null || onClose === void 0 || onClose(event);
  }, [backdrop, onClose]);
  (0, _hooks.useWillUnmount)(function () {
    var _transitionEndListene2;
    (_transitionEndListene2 = transitionEndListener.current) === null || _transitionEndListene2 === void 0 || _transitionEndListene2.off();
  });
  var sizeKey = 'width';
  if (isDrawer) {
    var _ref = animationProps || {},
      placement = _ref.placement;
    // The width or height of the drawer depends on the placement.
    sizeKey = placement === 'top' || placement === 'bottom' ? 'height' : 'width';
  }
  var enforceFocus = (0, _react.useMemo)(function () {
    if (typeof enforceFocusProp === 'boolean') {
      return enforceFocusProp;
    }

    // When the Drawer is displayed and the backdrop is not displayed, the focus is not restricted.
    if (isDrawer && backdrop === false) {
      return false;
    }
  }, [backdrop, enforceFocusProp, isDrawer]);
  var wrapperClassName = merge(prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["wrapper"]))), (_merge = {}, _merge[prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["no-backdrop"])))] = backdrop === false, _merge));
  return /*#__PURE__*/_react.default.createElement(_ModalContext.ModalContext.Provider, {
    value: modalContextValue
  }, /*#__PURE__*/_react.default.createElement(_Modal.default, (0, _extends2.default)({
    "data-testid": isDrawer ? 'drawer-wrapper' : 'modal-wrapper'
  }, rest, {
    ref: ref,
    backdrop: backdrop,
    enforceFocus: enforceFocus,
    open: open,
    onClose: onClose,
    className: wrapperClassName,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExited: handleExited,
    backdropClassName: merge(prefix(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteralLoose2.default)(["backdrop"]))), backdropClassName, inClass),
    containerClassName: prefix({
      open: open,
      'has-backdrop': backdrop
    }),
    transition: animation ? animation : undefined,
    animationProps: animationProps,
    dialogTransitionTimeout: animationTimeout,
    backdropTransitionTimeout: 150,
    onClick: backdrop ? handleBackdropClick : undefined,
    onMouseDown: handleMouseDown
  }), function (transitionProps, transitionRef) {
    var _ref2;
    var transitionClassName = transitionProps.className,
      transitionRest = (0, _objectWithoutPropertiesLoose2.default)(transitionProps, _excluded2);
    return /*#__PURE__*/_react.default.createElement(Dialog, (0, _extends2.default)({
      role: role,
      id: dialogId,
      "aria-labelledby": ariaLabelledby !== null && ariaLabelledby !== void 0 ? ariaLabelledby : dialogId + "-title",
      "aria-describedby": ariaDescribedby,
      style: (_ref2 = {}, _ref2[sizeKey] = modalSizes.includes(size) ? undefined : size, _ref2)
    }, transitionRest, (0, _pick.default)(rest, Object.keys(_ModalDialog.modalDialogPropTypes)), {
      ref: (0, _utils.mergeRefs)(dialogRef, transitionRef),
      classPrefix: classPrefix,
      className: merge(classes, transitionClassName, prefix({
        shake: shake
      })),
      dialogClassName: dialogClassName,
      dialogStyle: dialogStyle
    }), children);
  }));
});
Modal.Body = _ModalBody.default;
Modal.Header = _ModalHeader.default;
Modal.Title = _ModalTitle.default;
Modal.Footer = _ModalFooter.default;
Modal.Dialog = _ModalDialog.default;
Modal.displayName = 'Modal';
Modal.propTypes = (0, _extends2.default)({}, _Modal.modalPropTypes, {
  animation: _propTypes.default.any,
  animationTimeout: _propTypes.default.number,
  classPrefix: _propTypes.default.string,
  dialogClassName: _propTypes.default.string,
  size: _propTypes.default.oneOfType([(0, _propTypes2.oneOf)(modalSizes), _propTypes.default.number, _propTypes.default.string]),
  dialogStyle: _propTypes.default.object,
  dialogAs: _propTypes.default.elementType,
  full: (0, _propTypes2.deprecatePropType)(_propTypes.default.bool, 'Use size="full" instead.'),
  overflow: _propTypes.default.bool
});
var _default = exports.default = Modal;