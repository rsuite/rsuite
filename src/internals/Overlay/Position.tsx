import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle
} from 'react';
import classNames from 'classnames';
import getContainer from 'dom-lib/getContainer';
import ownerDocument from 'dom-lib/ownerDocument';
import removeClass from 'dom-lib/removeClass';
import on from 'dom-lib/on';
import addClass from 'dom-lib/addClass';
import addStyle from 'dom-lib/addStyle';
import isElement from '../../DOMHelper/isElement';
import positionUtils, { PositionType } from './positionUtils';
import { ResizeObserver } from '@juggle/resize-observer';
import { getDOMNode } from '../utils';
import { useUpdateEffect } from '../hooks';
import type { Placement } from '@/internals/types';
import type { CursorPosition } from './types';

export interface PositionChildProps {
  className: string;
  left?: number;
  top?: number;
  arrowOffsetLeft?: number;
  arrowOffsetTop?: number;
}

export interface PositionProps {
  children: (props: PositionChildProps, ref: React.RefObject<HTMLElement>) => React.ReactElement;
  className?: string;
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
  ref: React.RefObject<HTMLElement>
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

  const containerRef = useRef<Element | null>(null);
  const lastTargetRef = useRef<Element | null>(null);
  const overlayResizeObserver = useRef<ResizeObserver>();

  const defaultPosition = {
    positionLeft: 0,
    positionTop: 0,
    arrowOffsetLeft: undefined,
    arrowOffsetTop: undefined
  };
  const [position, setPosition] = useState<PositionType>(defaultPosition);
  const utils = useMemo(
    () =>
      positionUtils({
        placement,
        preventOverflow,
        padding: containerPadding
      }),
    [placement, preventOverflow, containerPadding]
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
      const containerElement = getContainer(
        typeof container === 'function' ? container() : (container ?? (null as any)),
        ownerDocument(ref.current).body
      ) as HTMLElement;

      const posi = utils.calcOverlayPosition(
        overlay,
        targetElement,
        containerElement,
        followCursor ? cursorPosition : undefined
      );

      if (forceUpdateDOM && overlay) {
        const preClassName = overlay?.className?.match(/(placement-\S+)/)?.[0];
        removeClass(overlay, preClassName);
        if (posi.positionClassName) {
          addClass(overlay, posi.positionClassName);
        }
        addStyle(overlay, { left: `${posi.positionLeft}px`, top: `${posi.positionTop}px` });
      } else {
        setPosition(posi);
      }

      containerRef.current = containerElement;
      lastTargetRef.current = targetElement;
    },
    [container, ref, triggerTarget, utils, followCursor, cursorPosition]
  );

  useEffect(() => {
    updatePosition(false);
    const overlay = getDOMNode(ref.current);
    let containerScrollListener;
    if (containerRef.current && preventOverflow) {
      // Update the overlay position when the container scroll bar is scrolling
      containerScrollListener = on(
        containerRef.current?.tagName === 'BODY' ? window : containerRef.current,
        'scroll',
        () => updatePosition(true, true)
      );
    }

    // Update the position when the window size changes
    const resizeListener = on(window, 'resize', () => updatePosition(true, true));

    if (overlay) {
      // Update the position when the size of the overlay changes
      overlayResizeObserver.current = new ResizeObserver(() => updatePosition(true, true));
      overlayResizeObserver.current.observe(overlay);
    }

    return () => {
      lastTargetRef.current = null;
      containerScrollListener?.off();
      resizeListener?.off();
      overlayResizeObserver.current?.disconnect();
    };
  }, [preventOverflow, ref, updatePosition]);

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
  const { children, className, followCursor, cursorPosition } = props;
  const childRef = React.useRef<HTMLElement>(null);

  const [position, updatePosition] = usePosition(props, childRef);
  const { positionClassName, arrowOffsetLeft, arrowOffsetTop, positionLeft, positionTop } =
    position;

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
      className: classNames(className, positionClassName),
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
