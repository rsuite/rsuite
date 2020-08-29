import React, { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Position, { PositionProps } from './Position';
import { TypeAttributes, AnimationEventProps } from '../@types/common';
import { refType, mergeRefs, useRootClose } from '../utils';
import Fade from '../Animation/Fade';

export interface OverlayProps extends AnimationEventProps {
  container?: HTMLElement | (() => HTMLElement);
  children?: React.ReactElement | ((props: any, ref) => React.ReactElement);
  childrenProps?: React.HTMLAttributes<HTMLElement>;
  className?: string;
  containerPadding?: number;
  placement?: TypeAttributes.Placement;
  preventOverflow?: boolean;
  open?: boolean;
  rootClose?: boolean;
  transition?: React.ElementType;
  triggerTarget?: React.RefObject<any>;
  onClose?: () => void;
}

const defaultProps: Partial<OverlayProps> = {
  transition: Fade
};

export const overlayPropTypes = {
  container: PropTypes.any,
  children: PropTypes.any,
  childrenProps: PropTypes.object,
  className: PropTypes.string,
  containerPadding: PropTypes.number,
  placement: PropTypes.any,
  preventOverflow: PropTypes.bool,
  open: PropTypes.bool,
  rootClose: PropTypes.bool,
  transition: PropTypes.any,
  triggerTarget: refType,
  onClose: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
};

const Overlay = React.forwardRef((props: OverlayProps, ref) => {
  const {
    container,
    containerPadding,
    placement,
    rootClose,
    children,
    childrenProps,
    transition: Transition,
    open,
    preventOverflow,
    triggerTarget,
    onClose,
    onExited,
    onExit,
    onExiting,
    onEnter,
    onEntering,
    onEntered
  } = props;

  const [exited, setExited] = useState(!open);
  const overlayTarget = useRef();

  if (open) {
    if (exited) setExited(false);
  } else if (!Transition && !exited) {
    setExited(true);
  }

  const mountOverlay = open || (Transition && !exited);

  const handleExited = useCallback(
    (args: any) => {
      setExited(true);
      onExited?.(args);
    },
    [onExited]
  );

  useRootClose(onClose, { triggerTarget, overlayTarget, disabled: !rootClose || !mountOverlay });

  if (!mountOverlay) {
    return null;
  }

  const positionProps: PositionProps = {
    container,
    containerPadding,
    triggerTarget,
    placement,
    preventOverflow
  };

  const childWithPosition = (
    <Position {...positionProps} ref={ref}>
      {(childProps, childRef) => {
        // overlayTarget is the ref on the DOM of the Overlay.
        if (typeof children === 'function') {
          return children(
            Object.assign(childProps, childrenProps),
            mergeRefs(childRef, overlayTarget)
          );
        }

        // Position will return coordinates and className
        const { left, top, className } = childProps;
        return React.cloneElement(children, {
          ...childrenProps,
          className: classNames(className, children.props.className),
          style: { left, top, ...children.props.style },
          ref: mergeRefs(childRef, overlayTarget)
        });
      }}
    </Position>
  );

  if (Transition) {
    return (
      <Transition
        in={open}
        transitionAppear
        onExit={onExit}
        onExiting={onExiting}
        onExited={handleExited}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
      >
        {childWithPosition}
      </Transition>
    );
  }

  return childWithPosition;
});

Overlay.displayName = 'Overlay';
Overlay.defaultProps = defaultProps;
Overlay.propTypes = overlayPropTypes;

export default Overlay;
