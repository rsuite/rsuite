'use client';
"use strict";

exports.__esModule = true;
exports.closestNode = closestNode;
exports.getEdgeOffset = getEdgeOffset;
exports.getScrollingParent = getScrollingParent;
exports.isContainInteractiveElement = isContainInteractiveElement;
exports.setInlineStyles = setInlineStyles;
exports.setTransitionDuration = setTransitionDuration;
exports.setTranslate3d = setTranslate3d;
/**
 * interactive elements should be skiped
 * */
var INTERACTIVE_ELEMENTS = ['A', 'BUTTON', 'INPUT', 'OPTION', 'TEXTAREA', 'SELECT'];
function isContainInteractiveElement(targetNode) {
  return INTERACTIVE_ELEMENTS.includes(targetNode.tagName) || targetNode.contentEditable === 'true';
}
function setInlineStyles(node, styles) {
  if (node !== null && styles !== null) {
    for (var _i = 0, _Object$entries = Object.entries(styles); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _Object$entries[_i],
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      node.style[key] = value;
    }
  }
}
function setTranslate3d(node, translate) {
  setInlineStyles(node, {
    transform: translate ? "translate3d(" + translate.x + "px," + translate.y + "px,0)" : ''
  });
}
function setTransitionDuration(node, duration) {
  setInlineStyles(node, {
    transitionDuration: duration ? duration + "ms" : ''
  });
}

/**
 * find closest target node from source node
 * */
function closestNode(sourceNode, judge) {
  var currentNode = sourceNode;
  while (currentNode) {
    if (judge(currentNode)) {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return null;
}
function getEdgeOffset(node, parent, offset) {
  if (offset === void 0) {
    offset = {
      left: 0,
      top: 0
    };
  }
  if (!node || !parent) {
    return {};
  }

  // Get the actual offsetTop / offsetLeft value, no matter how deep the node is nested
  var nodeOffset = {
    left: (offset.left || 0) + node.offsetLeft,
    top: (offset.top || 0) + node.offsetTop
  };
  if (node.parentNode === parent) {
    return nodeOffset;
  }
  return getEdgeOffset(node.parentNode, parent, nodeOffset);
}
function getScrollingParent(el) {
  if (!el || typeof window === 'undefined' || !window.getComputedStyle) {
    return null;
  }
  try {
    return closestNode(el, function (el) {
      var computedStyle = window.getComputedStyle(el);
      var overflowRegex = /(auto|scroll)/;
      var properties = ['overflow', 'overflowX', 'overflowY'];
      return properties.some(function (property) {
        return overflowRegex.test(computedStyle[property]);
      });
    });
  } catch (error) {
    // In test environments, errors may occur, so return null
    return null;
  }
}