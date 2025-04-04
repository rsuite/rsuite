import { CSSProperties } from 'react';
import { Offset } from '@/internals/types';

export interface Axis {
  x: number;
  y: number;
}

export type EdgeOffset = Omit<Offset, 'width' | 'height'>;

/**
 * interactive elements should be skiped
 * */
const INTERACTIVE_ELEMENTS = ['A', 'BUTTON', 'INPUT', 'OPTION', 'TEXTAREA', 'SELECT'];
export function isContainInteractiveElement(targetNode: HTMLElement) {
  return INTERACTIVE_ELEMENTS.includes(targetNode.tagName) || targetNode.contentEditable === 'true';
}

export function setInlineStyles(node: HTMLElement, styles: CSSProperties) {
  if (node !== null && styles !== null) {
    for (const [key, value] of Object.entries(styles)) {
      node.style[key] = value;
    }
  }
}

export function setTranslate3d(node: HTMLElement, translate: Axis | null) {
  setInlineStyles(node, {
    transform: translate ? `translate3d(${translate.x}px,${translate.y}px,0)` : ''
  });
}

export function setTransitionDuration(node: HTMLElement, duration?: number | null) {
  setInlineStyles(node, {
    transitionDuration: duration ? `${duration}ms` : ''
  });
}

/**
 * find closest target node from source node
 * */
export function closestNode(sourceNode: HTMLElement, judge: (target: HTMLElement) => boolean) {
  let currentNode = sourceNode;
  while (currentNode) {
    if (judge(currentNode)) {
      return currentNode;
    }
    currentNode = currentNode.parentNode as HTMLElement;
  }
  return null;
}

export function getEdgeOffset(
  node: HTMLElement,
  parent: HTMLElement,
  offset: EdgeOffset = { left: 0, top: 0 }
): Partial<EdgeOffset> {
  if (!node || !parent) {
    return {};
  }

  // Get the actual offsetTop / offsetLeft value, no matter how deep the node is nested
  const nodeOffset = {
    left: (offset.left || 0) + node.offsetLeft,
    top: (offset.top || 0) + node.offsetTop
  };
  if (node.parentNode === parent) {
    return nodeOffset;
  }
  return getEdgeOffset(node.parentNode as HTMLElement, parent, nodeOffset);
}

export function getScrollingParent(el: HTMLElement) {
  if (!el || typeof window === 'undefined' || !window.getComputedStyle) {
    return null;
  }

  try {
    return closestNode(el, el => {
      const computedStyle = window.getComputedStyle(el);
      const overflowRegex = /(auto|scroll)/;
      const properties = ['overflow', 'overflowX', 'overflowY'];
      return properties.some(property => overflowRegex.test(computedStyle[property]));
    });
  } catch (error) {
    // In test environments, errors may occur, so return null
    return null;
  }
}
