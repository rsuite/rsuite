'use client';
import React from 'react';
import trim from 'lodash/trim';
import { KEY_VALUES } from "../constants/index.js";
import { findNodeOfTree } from "../Tree/utils/index.js";
import { reactToString } from "../utils/index.js";
var defaultNodeKeys = {
  valueKey: 'value',
  childrenKey: 'children'
};
export function createConcatChildrenFunction(node, nodeValue, nodeKeys) {
  if (nodeKeys === void 0) {
    nodeKeys = defaultNodeKeys;
  }
  var _nodeKeys = nodeKeys,
    valueKey = _nodeKeys.valueKey,
    childrenKey = _nodeKeys.childrenKey;
  return function (data, children) {
    if (nodeValue) {
      node = findNodeOfTree(data, function (item) {
        return nodeValue === item[valueKey];
      });
    }
    node[childrenKey] = children;
    return data.concat([]);
  };
}
export function shouldDisplay(label, searchKeyword) {
  if (!trim(searchKeyword)) {
    return true;
  }
  var keyword = searchKeyword.toLocaleLowerCase();
  if (typeof label === 'string' || typeof label === 'number') {
    return ("" + label).toLocaleLowerCase().indexOf(keyword) >= 0;
  } else if (/*#__PURE__*/React.isValidElement(label)) {
    var nodes = reactToString(label);
    return nodes.join('').toLocaleLowerCase().indexOf(keyword) >= 0;
  }
  return false;
}
/**
 * Handling keyboard events...
 * @param event Keyboard event object
 * @param events Event callback functions
 */
export function onMenuKeyDown(event, events) {
  var down = events.down,
    up = events.up,
    enter = events.enter,
    del = events.del,
    esc = events.esc,
    right = events.right,
    left = events.left;
  switch (event.key) {
    // down
    case KEY_VALUES.DOWN:
      down === null || down === void 0 || down(event);
      event.preventDefault();
      break;
    // up
    case KEY_VALUES.UP:
      up === null || up === void 0 || up(event);
      event.preventDefault();
      break;
    // enter
    case KEY_VALUES.ENTER:
      enter === null || enter === void 0 || enter(event);
      event.preventDefault();
      break;
    // delete
    case KEY_VALUES.BACKSPACE:
      del === null || del === void 0 || del(event);
      break;
    // esc | tab
    case KEY_VALUES.ESC:
    case KEY_VALUES.TAB:
      esc === null || esc === void 0 || esc(event);
      break;
    // left arrow
    case KEY_VALUES.LEFT:
      left === null || left === void 0 || left(event);
      break;
    // right arrow
    case KEY_VALUES.RIGHT:
      right === null || right === void 0 || right(event);
      break;
    default:
  }
}