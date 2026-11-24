import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle
} from 'react';
import getContainer from 'dom-lib/getContainer';
import ownerDocument from 'dom-lib/ownerDocument';
import on from 'dom-lib/on';
import addStyle from 'dom-lib/addStyle';
import isElement from '../../DOMHelper/isElement';
import { calcPosition } from './utils/position';
import { ResizeObserver } from '@juggle/resize-observer';
import { getDOMNode, kebabPlace } from '../utils';
import { useIsomorphicLayoutEffect, useUpdateEffect } from '../hooks';
import type { Placement } from '@/internals/types';
import type { CursorPosition, PositionType, PositionChildProps } from './types';

const CSS_POSITION_X = '--rs-position-x';
const CSS_POSITION_Y = '--rs-position-y';

function getParent(node: Node): Node | null {
  return (node as Element).assignedSlot || node.parentNode || (node as ShadowRoot).host || null;
}

export const getPositionStyle = (x?: number, y?: number) => {
  return {
    [CSS_POSITION_X]: x !== undefined ? `${x}px` : undefined,
    [CSS_POSITION_Y]: y !== undefined ? `${y}px` : undefined
  };
};

export interface PositionProps {
  children: (
    props: PositionChildProps,
    ref: React.RefObject<HTMLElement | null>
  ) => React.ReactElement;
  container?: HTMLElement | (() => HTMLElement | null) | null;
  containerPadding?: number;
  placement?: Placement;
  preventOverflow?: boolean;
  triggerTarget?: React.RefObject<any>;
  followCursor?: boolean;
  cursorPosition?: CursorPosition | null;
}

const usePosition = (
  props: PositionProps,
  ref: React.RefObject<HTMLElement | null>
): [PositionType, (placementChanged?: any) => void] => {
  const {
    placement = 'right',
    preventOverflow = false,
    containerPadding = 0,
    container,
    triggerTarget,
    followCursor,
    cursorPosition
  } = props;

  const lastTargetRef = useRef<Element | null>(null);

  const defaultPosition = {
    placement,
    positionLeft: 0,
    positionTop: 0,
    arrowOffsetLeft: undefined,
    arrowOffsetTop: undefined
  };
  const [position, setPosition] = useState<PositionType>(defaultPosition);
  const utils = useMemo(
    () =>
      calcPosition({
        placement,
        preventOverflow,
        padding: containerPadding
      }),
    [placement, preventOverflow, containerPadding]
  );

  const getContainerElement = useCallback(
    () =>
      getContainer(
        typeof container === 'function' ? container() : (container ?? (null as any)),
        ownerDocument(ref.current).body
      ) as HTMLElement,
    [container, ref]
  );

  const updatePosition = useCallback(
    /**
     * @param placementChanged  Whether the placement has changed
     * @param forceUpdateDOM Whether to update the DOM directly
     * @returns void
     */
    (placementChanged = true, forceUpdateDOM?: boolean) => {
      if (!triggerTarget?.current) {
        return;
      }
      const targetElement = getDOMNode(triggerTarget);

      if (!isElement(targetElement)) {
        throw new Error('`target` should return an HTMLElement');
      }

      //  If the target and placement do not change, the position is not updated.
      if (targetElement === lastTargetRef.current && !placementChanged) {
        return;
      }

      const overlay = getDOMNode(ref.current);
      const containerElement = getContainerElement();

      const posi = utils.calcOverlayPosition(
        overlay,
        targetElement,
        containerElement,
        followCursor ? cursorPosition : undefined
      );

      if (overlay && posi.placement) {
        overlay.dataset.placement = kebabPlace(posi.placement);
      }

      if (forceUpdateDOM && overlay) {
        addStyle(overlay, getPositionStyle(posi.positionLeft, posi.positionTop));
      } else {
        setPosition(posi);
      }

      lastTargetRef.current = targetElement;
    },
    [getContainerElement, ref, triggerTarget, utils, followCursor, cursorPosition]
  );

  useIsomorphicLayoutEffect(() => {
    updatePosition(false);
    const overlay = getDOMNode(ref.current);
    const scrollParents = new Set<Node>();

    // Either side of a portal can move independently. Element scroll events do
    // not bubble, so listen to each ancestor, including those across a shadow root.
    for (const element of [getDOMNode(triggerTarget), overlay]) {
      let parent = element ? getParent(element) : null;
      while (parent) {
        scrollParents.add(parent);
        parent = getParent(parent);
      }
    }

    const scrollListeners = Array.from(scrollParents, parent =>
      on(parent, 'scroll', () => updatePosition(true, true))
    );

    // Update the position when the window size changes
    const view = ownerDocument(overlay).defaultView;
    const resizeListener = view && on(view, 'resize', () => updatePosition(true, true));

    const resizeObserver = new ResizeObserver(() => updatePosition(true, true));
    // Trigger content and container layout can change without a window resize.
    const observedElements = new Set([getDOMNode(triggerTarget), overlay, getContainerElement()]);
    observedElements.forEach(element => {
      if (isElement(element)) resizeObserver.observe(element, { box: 'border-box' });
    });

    return () => {
      lastTargetRef.current = null;
      scrollListeners.forEach(listener => listener.off());
      resizeListener?.off();
      resizeObserver.disconnect();
    };
  }, [ref, triggerTarget, updatePosition, getContainerElement]);

  useUpdateEffect(() => updatePosition(), [updatePosition, placement]);

  return [position, updatePosition];
};

export interface PositionInstance {
  updatePosition?: () => void;
  child?: Element;
}

/**
 * The `Position` component calculates the position of the child element.
 * @private
 */
const Position = React.forwardRef((props: PositionProps, ref) => {
  const { children, followCursor, cursorPosition } = props;
  const childRef = React.useRef<HTMLElement>(null);

  const [position, updatePosition] = usePosition(props, childRef);
  const { arrowOffsetLeft, arrowOffsetTop, positionLeft, positionTop, placement } = position;

  useImperativeHandle(ref, () => ({
    get child() {
      return childRef.current;
    },
    updatePosition
  }));

  useEffect(() => {
    if (!followCursor || !cursorPosition) return;
    updatePosition();
  }, [followCursor, cursorPosition, updatePosition]);

  if (typeof children === 'function') {
    const childProps = {
      placement,
      arrowOffsetLeft,
      arrowOffsetTop,
      left: positionLeft,
      top: positionTop
    };

    return children(childProps, childRef);
  }

  return children;
});

Position.displayName = 'Position';

export default Position;
