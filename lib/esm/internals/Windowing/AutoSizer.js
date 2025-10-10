'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["children", "className", "disableHeight", "disableWidth", "defaultHeight", "defaultWidth", "style", "onResize"];
import React, { useState, useRef } from 'react';
import { useCallback } from 'react';
import getStyle from 'dom-lib/getStyle';
import { useElementResize, useMount } from "../hooks/index.js";
import { mergeRefs } from "../utils/index.js";
/**
 * High-order component that automatically adjusts the width and height of a single child.
 *
 * @private
 */
var AutoSizer = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className,
    disableHeight = props.disableHeight,
    disableWidth = props.disableWidth,
    defaultHeight = props.defaultHeight,
    defaultWidth = props.defaultWidth,
    style = props.style,
    onResize = props.onResize,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useState = useState(defaultHeight || 0),
    height = _useState[0],
    setHeight = _useState[1];
  var _useState2 = useState(defaultWidth || 0),
    width = _useState2[0],
    setWidth = _useState2[1];
  var rootRef = useRef(null);
  var getParentNode = useCallback(function () {
    var _rootRef$current;
    if ((_rootRef$current = rootRef.current) !== null && _rootRef$current !== void 0 && _rootRef$current.parentNode && rootRef.current.parentNode.ownerDocument && rootRef.current.parentNode.ownerDocument.defaultView && rootRef.current.parentNode instanceof rootRef.current.parentNode.ownerDocument.defaultView.HTMLElement) {
      return rootRef.current.parentNode;
    }
    return null;
  }, []);
  var handleResize = useCallback(function () {
    var parentNode = getParentNode();
    if (parentNode) {
      var offsetHeight = parentNode.offsetHeight || 0;
      var offsetWidth = parentNode.offsetWidth || 0;
      var _style = getStyle(parentNode);
      var paddingLeft = parseInt(_style.paddingLeft, 10) || 0;
      var paddingRight = parseInt(_style.paddingRight, 10) || 0;
      var paddingTop = parseInt(_style.paddingTop, 10) || 0;
      var paddingBottom = parseInt(_style.paddingBottom, 10) || 0;
      var newHeight = offsetHeight - paddingTop - paddingBottom;
      var newWidth = offsetWidth - paddingLeft - paddingRight;
      if (!disableHeight && height !== newHeight || !disableWidth && width !== newWidth) {
        setHeight(offsetHeight - paddingTop - paddingBottom);
        setWidth(offsetWidth - paddingLeft - paddingRight);
        onResize === null || onResize === void 0 || onResize({
          height: offsetHeight,
          width: offsetWidth
        });
      }
    }
  }, [disableHeight, disableWidth, getParentNode, height, onResize, width]);
  useMount(handleResize);
  useElementResize(getParentNode(), handleResize);
  var outerStyle = {
    overflow: 'visible'
  };
  var childParams = {
    width: 0,
    height: 0
  };
  if (!disableHeight) {
    outerStyle.height = 0;
    childParams.height = height;
  }
  if (!disableWidth) {
    outerStyle.width = 0;
    childParams.width = width;
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    ref: mergeRefs(rootRef, ref),
    style: _extends({}, outerStyle, style)
  }, rest), children(childParams));
});
export default AutoSizer;