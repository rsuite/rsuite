'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2, _templateObject3;
var _excluded = ["animation", "animationProps", "animationTimeout", "aria-labelledby", "aria-describedby", "backdropClassName", "backdrop", "className", "children", "classPrefix", "dialogClassName", "dialogStyle", "dialogAs", "enforceFocus", "full", "overflow", "open", "onClose", "onEntered", "onEntering", "onExited", "role", "size", "id", "isDrawer", "closeButton"],
  _excluded2 = ["className"];
import React, { useRef, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import on from 'dom-lib/on';
import getAnimationEnd from 'dom-lib/getAnimationEnd';
import BaseModal, { modalPropTypes } from "../internals/Overlay/Modal.js";
import Bounce from "../Animation/Bounce.js";
import ModalDialog, { modalDialogPropTypes } from "./ModalDialog.js";
import ModalBody from "./ModalBody.js";
import ModalHeader from "./ModalHeader.js";
import ModalTitle from "./ModalTitle.js";
import ModalFooter from "./ModalFooter.js";
import { useClassNames, useWillUnmount, useUniqueId } from "../internals/hooks/index.js";
import { mergeRefs } from "../internals/utils/index.js";
import { ModalContext } from "./ModalContext.js";
import { useBodyStyles } from "./utils.js";
import { deprecatePropType, oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
var modalSizes = ['xs', 'sm', 'md', 'lg', 'full'];
/**
 * The `Modal` component is used to show content in a layer above the app.
 * @see https://rsuitejs.com/components/modal
 */
var Modal = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _prefix, _merge;
  var _useCustom = useCustom('Modal', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$an = propsWithDefaults.animation,
    animation = _propsWithDefaults$an === void 0 ? Bounce : _propsWithDefaults$an,
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
    Dialog = _propsWithDefaults$di === void 0 ? ModalDialog : _propsWithDefaults$di,
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
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var inClass = {
    in: open && !animation
  };
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useState = useState(false),
    shake = _useState[0],
    setShake = _useState[1];
  var classes = merge(className, prefix((_prefix = {
    full: full
  }, _prefix[size] = modalSizes.includes(size), _prefix)));
  var dialogRef = useRef(null);
  var transitionEndListener = useRef();

  // The style of the Modal body will be updated with the size of the window or container.
  var _useBodyStyles = useBodyStyles(dialogRef, {
      overflow: overflow,
      prefix: prefix,
      size: size
    }),
    bodyStyles = _useBodyStyles[0],
    onChangeBodyStyles = _useBodyStyles[1],
    onDestroyEvents = _useBodyStyles[2];
  var dialogId = useUniqueId('dialog-', idProp);
  var modalContextValue = useMemo(function () {
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
  var handleExited = useCallback(function (node) {
    var _transitionEndListene;
    onExited === null || onExited === void 0 || onExited(node);
    onDestroyEvents();
    (_transitionEndListene = transitionEndListener.current) === null || _transitionEndListene === void 0 || _transitionEndListene.off();
    transitionEndListener.current = null;
  }, [onDestroyEvents, onExited]);
  var handleEntered = useCallback(function (node) {
    onEntered === null || onEntered === void 0 || onEntered(node);
    onChangeBodyStyles();
  }, [onChangeBodyStyles, onEntered]);
  var handleEntering = useCallback(function (node) {
    onEntering === null || onEntering === void 0 || onEntering(node);
    onChangeBodyStyles(true);
  }, [onChangeBodyStyles, onEntering]);
  var backdropClick = React.useRef();
  var handleMouseDown = useCallback(function (event) {
    backdropClick.current = event.target === event.currentTarget;
  }, []);
  var handleBackdropClick = useCallback(function (event) {
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
        transitionEndListener.current = on(dialogRef.current, getAnimationEnd(), function () {
          setShake(false);
        });
      }
      return;
    }
    onClose === null || onClose === void 0 || onClose(event);
  }, [backdrop, onClose]);
  useWillUnmount(function () {
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
  var enforceFocus = useMemo(function () {
    if (typeof enforceFocusProp === 'boolean') {
      return enforceFocusProp;
    }

    // When the Drawer is displayed and the backdrop is not displayed, the focus is not restricted.
    if (isDrawer && backdrop === false) {
      return false;
    }
  }, [backdrop, enforceFocusProp, isDrawer]);
  var wrapperClassName = merge(prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["wrapper"]))), (_merge = {}, _merge[prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["no-backdrop"])))] = backdrop === false, _merge));
  return /*#__PURE__*/React.createElement(ModalContext.Provider, {
    value: modalContextValue
  }, /*#__PURE__*/React.createElement(BaseModal, _extends({
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
    backdropClassName: merge(prefix(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["backdrop"]))), backdropClassName, inClass),
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
      transitionRest = _objectWithoutPropertiesLoose(transitionProps, _excluded2);
    return /*#__PURE__*/React.createElement(Dialog, _extends({
      role: role,
      id: dialogId,
      "aria-labelledby": ariaLabelledby !== null && ariaLabelledby !== void 0 ? ariaLabelledby : dialogId + "-title",
      "aria-describedby": ariaDescribedby,
      style: (_ref2 = {}, _ref2[sizeKey] = modalSizes.includes(size) ? undefined : size, _ref2)
    }, transitionRest, pick(rest, Object.keys(modalDialogPropTypes)), {
      ref: mergeRefs(dialogRef, transitionRef),
      classPrefix: classPrefix,
      className: merge(classes, transitionClassName, prefix({
        shake: shake
      })),
      dialogClassName: dialogClassName,
      dialogStyle: dialogStyle
    }), children);
  }));
});
Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Footer = ModalFooter;
Modal.Dialog = ModalDialog;
Modal.displayName = 'Modal';
Modal.propTypes = _extends({}, modalPropTypes, {
  animation: PropTypes.any,
  animationTimeout: PropTypes.number,
  classPrefix: PropTypes.string,
  dialogClassName: PropTypes.string,
  size: PropTypes.oneOfType([oneOf(modalSizes), PropTypes.number, PropTypes.string]),
  dialogStyle: PropTypes.object,
  dialogAs: PropTypes.elementType,
  full: deprecatePropType(PropTypes.bool, 'Use size="full" instead.'),
  overflow: PropTypes.bool
});
export default Modal;