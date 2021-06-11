import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle
} from 'react';
import bindElementResize from 'element-resize-event';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import helper from '../DOMHelper';
import positionUtils, { PositionType } from './positionUtils';
import { getDOMNode } from '../utils';
import { TypeAttributes } from '../@types/common';
import { useUpdateEffect } from '../utils';

export interface PositionChildProps {
  className: string;
  left: number;
  top: number;
}

export interface PositionProps {
  children?: (props: PositionChildProps, ref) => React.ReactElement;
  className?: string;
  container?: HTMLElement | (() => HTMLElement);
  containerPadding?: number;
  placement?: TypeAttributes.Placement;
  preventOverflow?: boolean;
  triggerTarget?: React.RefObject<any>;
}

const defaultProps: Partial<PositionProps> = {
  containerPadding: 0,
  placement: 'right'
};

const usePosition = (
  props: PositionProps,
  ref: React.RefObject<HTMLElement>
): [PositionType, (placementChanged?: any) => void] => {
  const { placement, preventOverflow, containerPadding, container, triggerTarget } = props;
  const containerRef = useRef<Element>();
  const lastTargetRef = useRef<Element>();
  const defaultPosition = {
    positionLeft: 0,
    positionTop: 0,
    arrowOffsetLeft: null,
    arrowOffsetTop: null
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

      if (!helper.isElement(targetElement)) {
        throw new Error('`target` should return an HTMLElement');
      }

      //  If the target and placement do not change, the position is not updated.
      if (targetElement === lastTargetRef.current && !placementChanged) {
        return;
      }

      const overlay = getDOMNode(ref.current);
      const containerElement = helper.getContainer(
        typeof container === 'function' ? container() : container,
        helper.ownerDocument(ref.current).body
      );

      const posi = utils.calcOverlayPosition(overlay, targetElement, containerElement);

      if (forceUpdateDOM && overlay) {
        const preClassName = overlay?.className?.match(/(placement-\S+)/)?.[0];
        helper.removeClass(overlay, preClassName);
        helper.addClass(overlay, posi.positionClassName);
        helper.addStyle(overlay, { left: `${posi.positionLeft}px`, top: `${posi.positionTop}px` });
      } else {
        setPosition(posi);
      }

      containerRef.current = containerElement;
      lastTargetRef.current = targetElement;
    },
    [container, ref, triggerTarget, utils]
  );

  useEffect(() => {
    updatePosition(false);
    const overlay = getDOMNode(ref.current);
    let containerScrollListener;
    if (containerRef.current && preventOverflow) {
      // Update the overlay position when the container scroll bar is scrolling
      containerScrollListener = helper.on(
        containerRef.current?.tagName === 'BODY' ? window : containerRef.current,
        'scroll',
        () => updatePosition(true, true)
      );
    }

    // Update the position when the window size changes
    const resizeListener = helper.on(window, 'resize', () => updatePosition(true, true));

    if (overlay) {
      // Update the position when the size of the overlay changes
      bindElementResize(overlay, () => updatePosition(true, true));
    }

    return () => {
      lastTargetRef.current = null;
      containerScrollListener?.off();
      resizeListener?.off();
    };
  }, [preventOverflow, ref, updatePosition]);

  useUpdateEffect(() => updatePosition(), [updatePosition, placement]);

  return [position, updatePosition];
};

export interface PositionInstance {
  updatePosition?: () => void;
  child?: Element;
}

const Position = React.forwardRef((props: PositionProps, ref) => {
  const { children, className } = props;
  const childRef = React.useRef();

  const [position, updatePosition] = usePosition(props, childRef);
  const {
    positionClassName,
    arrowOffsetLeft,
    arrowOffsetTop,
    positionLeft,
    positionTop
  } = position;

  useImperativeHandle(ref, () => ({
    get child() {
      return childRef.current;
    },
    updatePosition
  }));

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
Position.defaultProps = defaultProps;
Position.propTypes = {
  className: PropTypes.string,
  children: PropTypes.func,
  container: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  containerPadding: PropTypes.number,
  placement: PropTypes.any,
  preventOverflow: PropTypes.bool,
  triggerTarget: PropTypes.any
};

export default Position;
