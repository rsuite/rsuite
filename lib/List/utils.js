"use strict";

exports.__esModule = true;
exports.setInlineStyles = setInlineStyles;
exports.setTranslate3d = setTranslate3d;
exports.setTransitionDuration = setTransitionDuration;
exports.closest = closest;
exports.getPosition = getPosition;
exports.getEdgeOffset = getEdgeOffset;
exports.getScrollingParent = getScrollingParent;

function setInlineStyles(node, styles) {
  if (styles !== null) {
    Object.keys(styles).forEach(function (key) {
      if (node !== null) {
        node.style[key] = styles[key];
      }
    });
  }
}

function setTranslate3d(node, translate) {
  if (node !== null) {
    node.style['transform'] = translate ? "translate3d(" + translate.x + "px," + translate.y + "px,0)" : '';
  }
}

function setTransitionDuration(node, duration) {
  if (node !== null) {
    node.style['transitionDuration'] = duration ? duration + "ms" : '';
  }
}

function isScrollable(el) {
  var computedStyle = window.getComputedStyle(el);
  var overflowRegex = /(auto|scroll)/;
  var properties = ['overflow', 'overflowX', 'overflowY'];
  return properties.find(function (property) {
    return overflowRegex.test(computedStyle[property]);
  });
}

function closest(el, fn) {
  while (el) {
    if (fn(el)) {
      return el;
    }

    el = el instanceof Element && el.parentNode;
  }

  return null;
}

function getPosition(event) {
  return {
    x: event.pageX || 0,
    y: event.pageY || 0
  };
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
  } // Get the actual offsetTop / offsetLeft value, no matter how deep the node is nested


  var nodeOffset = {
    left: offset.left + node.offsetLeft,
    top: offset.top + node.offsetTop
  };

  if (node.parentNode === parent) {
    return nodeOffset;
  }

  return getEdgeOffset(node.parentNode, parent, nodeOffset);
}

function getScrollingParent(el) {
  if (!(el instanceof HTMLElement)) {
    return null;
  } else if (isScrollable(el)) {
    return el;
  } else {
    return getScrollingParent(el.parentNode);
  }
}