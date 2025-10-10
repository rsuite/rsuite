'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.handleLeftArrow = handleLeftArrow;
exports.handleRightArrow = handleRightArrow;
var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));
/**
 * Handles the left arrow key press event for tree navigation.
 * If the focus item is expanded, it collapses it. If the focus item is not expanded and has a parent,
 * it moves the focus to the parent item.
 */
function handleLeftArrow(props) {
  var focusItem = props.focusItem,
    expand = props.expand,
    onExpand = props.onExpand,
    onFocusItem = props.onFocusItem;
  if ((0, _isEmpty.default)(focusItem)) {
    return;
  }
  if (expand) {
    onExpand === null || onExpand === void 0 || onExpand(focusItem, expand);
  } else if (focusItem !== null && focusItem !== void 0 && focusItem.parent) {
    onFocusItem();
  }
}

/**
 * Handles the right arrow key press event for tree navigation.
 * If the focused item has children and is collapsed, it expands the item.
 * If the focused item has children and is expanded, it moves the focus to the next sibling.
 * If the focused item does not have children, it does nothing.
 */
function handleRightArrow(props) {
  var focusItem = props.focusItem,
    expand = props.expand,
    childrenKey = props.childrenKey,
    onExpand = props.onExpand,
    onFocusItem = props.onFocusItem;
  if ((0, _isEmpty.default)(focusItem) || !Array.isArray(focusItem[childrenKey])) {
    return;
  }
  if (!expand) {
    onExpand === null || onExpand === void 0 || onExpand(focusItem, expand);
  } else {
    onFocusItem();
  }
}