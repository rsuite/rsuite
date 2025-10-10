'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.createConcatChildrenFunction = createConcatChildrenFunction;
exports.onMenuKeyDown = onMenuKeyDown;
exports.shouldDisplay = shouldDisplay;
var _react = _interopRequireDefault(require("react"));
var _trim = _interopRequireDefault(require("lodash/trim"));
var _constants = require("../constants");
var _utils = require("../Tree/utils");
var _utils2 = require("../utils");
var defaultNodeKeys = {
  valueKey: 'value',
  childrenKey: 'children'
};
function createConcatChildrenFunction(node, nodeValue, nodeKeys) {
  if (nodeKeys === void 0) {
    nodeKeys = defaultNodeKeys;
  }
  var _nodeKeys = nodeKeys,
    valueKey = _nodeKeys.valueKey,
    childrenKey = _nodeKeys.childrenKey;
  return function (data, children) {
    if (nodeValue) {
      node = (0, _utils.findNodeOfTree)(data, function (item) {
        return nodeValue === item[valueKey];
      });
    }
    node[childrenKey] = children;
    return data.concat([]);
  };
}
function shouldDisplay(label, searchKeyword) {
  if (!(0, _trim.default)(searchKeyword)) {
    return true;
  }
  var keyword = searchKeyword.toLocaleLowerCase();
  if (typeof label === 'string' || typeof label === 'number') {
    return ("" + label).toLocaleLowerCase().indexOf(keyword) >= 0;
  } else if (/*#__PURE__*/_react.default.isValidElement(label)) {
    var nodes = (0, _utils2.reactToString)(label);
    return nodes.join('').toLocaleLowerCase().indexOf(keyword) >= 0;
  }
  return false;
}
/**
 * Handling keyboard events...
 * @param event Keyboard event object
 * @param events Event callback functions
 */
function onMenuKeyDown(event, events) {
  var down = events.down,
    up = events.up,
    enter = events.enter,
    del = events.del,
    esc = events.esc,
    right = events.right,
    left = events.left;
  switch (event.key) {
    // down
    case _constants.KEY_VALUES.DOWN:
      down === null || down === void 0 || down(event);
      event.preventDefault();
      break;
    // up
    case _constants.KEY_VALUES.UP:
      up === null || up === void 0 || up(event);
      event.preventDefault();
      break;
    // enter
    case _constants.KEY_VALUES.ENTER:
      enter === null || enter === void 0 || enter(event);
      event.preventDefault();
      break;
    // delete
    case _constants.KEY_VALUES.BACKSPACE:
      del === null || del === void 0 || del(event);
      break;
    // esc | tab
    case _constants.KEY_VALUES.ESC:
    case _constants.KEY_VALUES.TAB:
      esc === null || esc === void 0 || esc(event);
      break;
    // left arrow
    case _constants.KEY_VALUES.LEFT:
      left === null || left === void 0 || left(event);
      break;
    // right arrow
    case _constants.KEY_VALUES.RIGHT:
      right === null || right === void 0 || right(event);
      break;
    default:
  }
}