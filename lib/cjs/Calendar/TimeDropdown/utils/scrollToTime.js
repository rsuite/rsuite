'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.scrollToTime = scrollToTime;
var _getPosition = _interopRequireDefault(require("dom-lib/getPosition"));
var _scrollTop = _interopRequireDefault(require("dom-lib/scrollTop"));
function scrollToTime(time, row) {
  if (!row) return;
  var scrollToPosition = function scrollToPosition(container, value, type) {
    var node = container.querySelector("[data-key=\"" + type + "-" + value + "\"]");
    if (node) {
      var position = (0, _getPosition.default)(node, container);
      if (position) {
        (0, _scrollTop.default)(container, position.top);
      }
    }
  };
  Object.entries(time).forEach(function (_ref) {
    var type = _ref[0],
      value = _ref[1];
    var container = row.querySelector("[data-type=\"" + type + "\"]");
    if (container) {
      scrollToPosition(container, value, type);
    }
  });
}