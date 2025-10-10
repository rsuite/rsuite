'use client';
import getPosition from 'dom-lib/getPosition';
import scrollTop from 'dom-lib/scrollTop';
export function scrollToTime(time, row) {
  if (!row) return;
  var scrollToPosition = function scrollToPosition(container, value, type) {
    var node = container.querySelector("[data-key=\"" + type + "-" + value + "\"]");
    if (node) {
      var position = getPosition(node, container);
      if (position) {
        scrollTop(container, position.top);
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