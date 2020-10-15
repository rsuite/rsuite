import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import helper from '../DOMHelper';
import positionUtils, { PositionType } from './positionUtils';
import { getDOMNode } from '../utils';
import { TypeAttributes } from '../@types/common';

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
  const containerScrollListenerRef = useRef<{ off: () => void }>();
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
    (placementChanged = true) => {
      if (!triggerTarget?.current) {
        return;
      }
      const targetElement = getDOMNode(triggerTarget);

      if (!helper.isElement(targetElement)) {
        throw new Error('`target` should return an HTMLElement');
      }

      /**
       * If the target and placement do not change, the position is not updated.
       */
      if (targetElement === lastTargetRef.current && !placementChanged) {
        return;
      }

      const overlay = getDOMNode(ref.current);
      const containerElement = helper.getContainer(
        typeof container === 'function' ? container() : container,
        helper.ownerDocument(ref.current).body
      );

      setPosition(utils.calcOverlayPosition(overlay, targetElement, containerElement));

      containerRef.current = containerElement;
      lastTargetRef.current = targetElement;
    },
    [container, ref, triggerTarget, utils]
  );

  useEffect(() => {
    updatePosition(false);
    if (containerRef.current && preventOverflow) {
      containerScrollListenerRef.current = helper.on(
        containerRef.current?.tagName === 'BODY' ? window : containerRef.current,
        'scroll',
        () => updatePosition()
      );
    }
    return () => {
      lastTargetRef.current = null;
      containerScrollListenerRef.current?.off();
    };
  }, [preventOverflow, updatePosition]);

  useEffect(() => updatePosition(), [updatePosition, placement]);

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
