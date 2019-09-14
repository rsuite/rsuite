import { Axis, Position } from './List';

type TargetNode = HTMLElement | null;

export function setInlineStyles(node: TargetNode, styles: any) {
  if (styles !== null) {
    Object.keys(styles).forEach(key => {
      if (node !== null) {
        node.style[key] = styles[key];
      }
    });
  }
}

export function setTranslate3d(node: TargetNode, translate: Axis | null) {
  if (node !== null) {
    node.style['transform'] = translate ? `translate3d(${translate.x}px,${translate.y}px,0)` : '';
  }
}

export function setTransitionDuration(node: TargetNode, duration?: number | null) {
  if (node !== null) {
    node.style['transitionDuration'] = duration ? `${duration}ms` : '';
  }
}

function isScrollable(el) {
  const computedStyle = window.getComputedStyle(el);
  const overflowRegex = /(auto|scroll)/;
  const properties = ['overflow', 'overflowX', 'overflowY'];
  return properties.find(property => overflowRegex.test(computedStyle[property]));
}

export function closest(el, fn) {
  while (el) {
    if (fn(el)) {
      return el;
    }
    el = el instanceof Element && el.parentNode;
  }
  return null;
}

export function getPosition(event: MouseEvent) {
  return {
    x: event.pageX || 0,
    y: event.pageY || 0
  };
}

export function getEdgeOffset(
  node: TargetNode,
  parent: TargetNode,
  offset: Position = { left: 0, top: 0 }
) {
  if (!node || !parent) {
    return {};
  }

  // Get the actual offsetTop / offsetLeft value, no matter how deep the node is nested
  const nodeOffset = {
    left: offset.left + node.offsetLeft,
    top: offset.top + node.offsetTop
  };
  if (node.parentNode === parent) {
    return nodeOffset;
  }
  return getEdgeOffset(node.parentNode as TargetNode, parent, nodeOffset);
}

export function getScrollingParent(el: TargetNode): HTMLElement | null {
  if (!(el instanceof HTMLElement)) {
    return null;
  } else if (isScrollable(el)) {
    return el;
  } else {
    return getScrollingParent(el.parentNode as TargetNode);
  }
}
