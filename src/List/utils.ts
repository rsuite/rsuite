import * as React from 'react';

export const setInlineStyles = (node: any, styles: React.CSSProperties) =>
  Object.keys(styles).forEach(key => (node.style[key] = styles[key]));
export const setTranslate3d = (node: any, translate: any) =>
  (node.style['transform'] = translate && `translate3d(${translate.x}px,${translate.y}px,0)`);
export const setTransitionDuration = (node: any, duration) =>
  (node.style['transitionDuration'] = duration && `${duration}ms`);
const isScrollable = el => {
  const computedStyle = window.getComputedStyle(el);
  const overflowRegex = /(auto|scroll)/;
  const properties = ['overflow', 'overflowX', 'overflowY'];
  return properties.find(property => overflowRegex.test(computedStyle[property]));
};
export const closest: any = (el, fn) => {
  while (el) {
    if (fn(el)) {
      return el;
    }
    el = el instanceof Element && el.parentNode;
  }
  return null;
};
export const getPosition = (event: React.SyntheticEvent<any>) => {
  if (event instanceof TouchEvent && event.touches && event.touches.length) {
    return {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY
    };
  } else if (event instanceof TouchEvent && event.changedTouches && event.changedTouches.length) {
    return {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY
    };
  } else if (event instanceof MouseEvent) {
    return {
      x: event.pageX,
      y: event.pageY
    };
  }
  return {
    x: 0,
    y: 0
  };
};
export const getEdgeOffset = (node, parent, offset = { left: 0, top: 0 }) => {
  // Get the actual offsetTop / offsetLeft value, no matter how deep the node is nested
  const nodeOffset = {
    left: offset.left + node.offsetLeft,
    top: offset.top + node.offsetTop
  };
  if (node.parentNode === parent) {
    return nodeOffset;
  }
  return getEdgeOffset(node.parentNode, parent, nodeOffset);
};
export const getScrollingParent = el => {
  if (!(el instanceof HTMLElement)) {
    return null;
  } else if (isScrollable(el)) {
    return el;
  } else {
    return getScrollingParent(el.parentNode);
  }
};
