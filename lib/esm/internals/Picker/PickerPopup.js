'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "autoWidth", "className", "placement", "target"];
import React, { useRef, useCallback, useEffect } from 'react';
import omit from 'lodash/omit';
import addStyle from 'dom-lib/addStyle';
import getWidth from 'dom-lib/getWidth';
import { mergeRefs } from "../utils/index.js";
import { useElementResize, useClassNames, useEventCallback } from "../hooks/index.js";
import { getDOMNode } from "../utils/index.js";
var omitProps = ['placement', 'arrowOffsetLeft', 'arrowOffsetTop', 'positionLeft', 'positionTop', 'getPositionInstance', 'getToggleInstance', 'autoWidth'];
var resizePlacement = ['topStart', 'topEnd', 'leftEnd', 'rightEnd', 'auto', 'autoVerticalStart', 'autoVerticalEnd', 'autoHorizontalEnd'];
var PickerPopup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker-popup' : _props$classPrefix,
    autoWidth = props.autoWidth,
    className = props.className,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    target = props.target,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var overlayRef = useRef(null);
  var handleResize = useEventCallback(function () {
    var instance = target === null || target === void 0 ? void 0 : target.current;
    if (instance && resizePlacement.includes(placement)) {
      instance.updatePosition();
    }
  });
  useElementResize(useCallback(function () {
    return overlayRef.current;
  }, []), handleResize);
  useEffect(function () {
    var toggle = target === null || target === void 0 ? void 0 : target.current;
    if (autoWidth && toggle !== null && toggle !== void 0 && toggle.root) {
      // Get the width value of the button,
      // and then set it to the menu to make their width consistent.
      var width = getWidth(getDOMNode(toggle.root));
      if (overlayRef.current) {
        addStyle(overlayRef.current, 'min-width', width + "px");
      }
    }
  }, [autoWidth, target, overlayRef]);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Component, _extends({
    "data-testid": "picker-popup"
  }, omit(rest, omitProps), {
    ref: mergeRefs(overlayRef, ref),
    className: classes
  }));
});
PickerPopup.displayName = 'PickerPopup';
export default PickerPopup;