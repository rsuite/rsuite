'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["className", "placement", "classPrefix", "animation", "closeButton"];
import React from 'react';
import PropTypes from 'prop-types';
import Slide from "../Animation/Slide.js";
import Modal from "../Modal/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { deprecateComponent } from "../internals/utils/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
import DrawerBody from "./DrawerBody.js";
import DrawerHeader from "./DrawerHeader.js";
import DrawerActions from "./DrawerActions.js";
import DrawerFooter from "./DrawerFooter.js";
import DrawerTitle from "./DrawerTitle.js";
/**
 * The Drawer component is used to display extra content from a main content.
 * @see https://rsuitejs.com/components/drawer
 */
var Drawer = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Drawer', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var className = propsWithDefaults.className,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'right' : _propsWithDefaults$pl,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'drawer' : _propsWithDefaults$cl,
    _propsWithDefaults$an = propsWithDefaults.animation,
    animation = _propsWithDefaults$an === void 0 ? Slide : _propsWithDefaults$an,
    _propsWithDefaults$cl2 = propsWithDefaults.closeButton,
    closeButton = _propsWithDefaults$cl2 === void 0 ? true : _propsWithDefaults$cl2,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, prefix(placement));
  var animationProps = {
    placement: placement
  };
  return /*#__PURE__*/React.createElement(Modal, _extends({}, rest, {
    ref: ref,
    overflow: false,
    classPrefix: classPrefix,
    className: classes,
    animation: animation,
    animationProps: animationProps,
    isDrawer: true,
    closeButton: closeButton
  }));
});
DrawerBody.displayName = 'DrawerBody';
DrawerHeader.displayName = 'DrawerHeader';
DrawerActions.displayName = 'DrawerActions';
DrawerFooter.displayName = 'DrawerFooter';
DrawerTitle.displayName = 'DrawerTitle';
Drawer.Body = DrawerBody;
Drawer.Header = DrawerHeader;
Drawer.Actions = DrawerActions;
Drawer.Footer = deprecateComponent(DrawerFooter, '<Drawer.Footer> has been deprecated, use <Drawer.Actions> instead.');
Drawer.Title = DrawerTitle;
Drawer.displayName = 'Drawer';
Drawer.propTypes = _extends({}, Modal.propTypes, {
  classPrefix: PropTypes.string,
  placement: oneOf(['top', 'right', 'bottom', 'left']),
  children: PropTypes.node,
  className: PropTypes.string
});
export default Drawer;