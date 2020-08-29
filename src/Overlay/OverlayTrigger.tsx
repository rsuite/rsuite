import React, { useRef, useEffect, useImperativeHandle, useCallback } from 'react';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { contains } from 'dom-lib';
import Overlay, { OverlayProps } from './Overlay';
import { createChainedFunction, usePortal, useControlled } from '../utils';
import isOneOf from '../utils/isOneOf';
import { AnimationEventProps, StandardProps, TypeAttributes } from '../@types/common';
import { PositionInstance } from './Position';
import { isUndefined } from 'lodash';
export type OverlayTriggerTrigger = 'click' | 'hover' | 'focus' | 'active' | 'none';

export interface OverlayTriggerProps extends StandardProps, AnimationEventProps {
  /** Triggering events */
  trigger?: OverlayTriggerTrigger | OverlayTriggerTrigger[];

  /** Display placement */
  placement?: TypeAttributes.Placement;

  /** Delay time */
  delay?: number;

  /** Open delay time */
  delayOpen?: number;

  /** Close delay time */
  delayClose?: number;

  /** Sets the rendering container */
  container?: HTMLElement | (() => HTMLElement);

  /** Container padding */
  containerPadding?: number;

  /** display element */
  speaker?: (props: any, ref: React.RefObject<any>) => React.ReactElement;

  /** Prevent floating element overflow */
  preventOverflow?: boolean;

  /** Opern  overlay */
  open?: boolean;

  /** The overlay is open by default */
  defaultOpen?: boolean;

  /** Whether mouse is allowed to enter the floating layer of popover, whose default value is false. */
  enterable?: boolean;

  /** For the monitored component, the event will be bound to this component. */
  children?: React.ReactElement | ((props: any, ref) => React.ReactElement);

  /** Whether to allow clicking document to close the overlay */
  rootClose?: boolean;

  /** Once disabled, the event cannot be triggered. */
  disabled?: boolean;

  /** Lose Focus callback function */
  onBlur?: () => void;

  /** Click on the callback function */
  onClick?: () => void;

  /** Callback function to get focus */
  onFocus?: () => void;

  /** Mouse leave callback function */
  onMouseOut?: () => void;

  /** Mouse over callback function */
  onMouseOver?: () => void;

  /** Callback fired when open component */
  onOpen?: () => void;

  /** Callback fired when close component */
  onClose?: () => void;
}

/**
 * Useful for mouseover and mouseout.
 * In order to resolve the node entering the mouseover element, a mouseout event and a mouseover event will be triggered.
 * https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave
 * @param handler
 * @param event
 */
function onMouseEventHandler(handler: React.MouseEventHandler, event: React.MouseEvent) {
  const target = event.currentTarget;
  const related = event.relatedTarget || get(event, ['nativeEvent', 'toElement']);

  if ((!related || related !== target) && !contains(target, related)) {
    handler(event);
  }
}

const defaultProps: Partial<OverlayTriggerProps> = {
  trigger: ['hover', 'focus'],
  delayClose: 200,
  placement: 'bottomStart',
  rootClose: true
};

const OverlayTrigger = React.forwardRef((props: OverlayTriggerProps, ref) => {
  const {
    children,
    container,
    defaultOpen,
    trigger,
    disabled,
    open: openProp,
    delay,
    delayOpen: delayOpenProp,
    delayClose: delayCloseProp,
    enterable,
    placement,
    speaker,
    onClick,
    onMouseOver,
    onMouseOut,
    onFocus,
    onBlur,
    onClose,
    ...rest
  } = props;

  const { Portal } = usePortal({ container });

  const triggerRef = useRef();
  const overlayRef = useRef<PositionInstance>();
  const [open, setOpen] = useControlled(openProp, defaultOpen);

  // Delay the timer to close/open the overlay
  // When the cursor moves from the trigger to the overlay, the overlay will be closed.
  // In order to keep the overlay open, a timer is used to delay the closing.
  const delayOpenTimer = useRef<ReturnType<typeof setTimeout>>();
  const delayCloseTimer = useRef<ReturnType<typeof setTimeout>>();

  const delayOpen = isNil(delayOpenProp) ? delay : delayOpenProp;
  const delayClose = isNil(delayCloseProp) ? delay : delayCloseProp;

  // Whether the cursor is on the overlay
  const isOnOverlay = useRef(false);

  // Whether the cursor is on the trigger
  const isOnTrigger = useRef(false);

  useEffect(() => {
    return () => {
      clearTimeout(delayOpenTimer.current);
      clearTimeout(delayCloseTimer.current);
    };
  }, []);

  const handleOpen = useCallback(
    (delay?: number) => {
      const ms = isUndefined(delay) ? delayOpen : delay;
      if (ms) {
        return (delayOpenTimer.current = setTimeout(() => {
          delayOpenTimer.current = null;
          setOpen(true);
        }, ms));
      }
      setOpen(true);
    },
    [delayOpen, setOpen]
  );

  const handleClose = useCallback(
    (delay?: number) => {
      const ms = isUndefined(delay) ? delayClose : delay;
      if (ms) {
        return (delayCloseTimer.current = setTimeout(() => {
          delayCloseTimer.current = null;
          setOpen(false);
        }, ms));
      }
      setOpen(false);
    },
    [delayClose, setOpen]
  );

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
    updatePosition: () => {
      overlayRef.current?.updatePosition?.();
    }
  }));

  const handleCloseWhenLeave = useCallback(() => {
    if (!isOnOverlay.current && !isOnTrigger.current) {
      handleClose();
    }
  }, [handleClose]);

  const handleOpenState = useCallback(() => {
    if (open) {
      handleCloseWhenLeave();
    } else {
      handleOpen();
    }
  }, [open, handleCloseWhenLeave, handleOpen]);

  const handleDelayedOpen = useCallback(() => {
    if (!enterable) {
      return handleOpen();
    }

    isOnTrigger.current = true;
    if (!isNil(delayCloseTimer.current)) {
      clearTimeout(delayCloseTimer.current);
      delayCloseTimer.current = null;
      return handleOpen();
    }

    if (open) {
      return;
    }

    handleOpen();
  }, [enterable, handleOpen, open]);

  const handleDelayedClose = useCallback(() => {
    if (!enterable) {
      handleClose();
    }

    isOnTrigger.current = false;
    if (!isNil(delayOpenTimer.current)) {
      clearTimeout(delayOpenTimer.current);
      delayOpenTimer.current = null;
      return;
    }

    if (!open || !isNil(delayCloseTimer.current)) {
      return;
    }

    if (!delayClose) {
      return handleCloseWhenLeave();
    }

    delayCloseTimer.current = setTimeout(() => {
      clearTimeout(delayCloseTimer.current);
      delayCloseTimer.current = null;
      handleCloseWhenLeave();
    }, delayClose);
  }, [delayClose, enterable, open, handleClose, handleCloseWhenLeave]);

  const handleSpeakerMouseEnter = useCallback(() => {
    isOnOverlay.current = true;
  }, []);

  const handleSpeakerMouseLeave = useCallback(() => {
    isOnOverlay.current = false;
    if (!isOneOf('click', trigger) && !isOneOf('active', trigger)) {
      handleCloseWhenLeave();
    }
  }, [handleCloseWhenLeave, trigger]);

  const triggerProps: React.HTMLAttributes<HTMLElement> = {
    'aria-expanded': open
  };

  if (!disabled) {
    if (isOneOf('click', trigger)) {
      triggerProps.onClick = createChainedFunction(handleOpenState, onClick);
    }

    if (isOneOf('active', trigger)) {
      triggerProps.onClick = createChainedFunction(handleDelayedOpen, onClick);
    }

    if (isOneOf('hover', trigger)) {
      let onMouseOverListener = null;
      let onMouseOutListener = null;

      if (trigger !== 'none') {
        onMouseOverListener = e => onMouseEventHandler(handleDelayedOpen, e);
        onMouseOutListener = e => onMouseEventHandler(handleDelayedClose, e);
      }
      triggerProps.onMouseOver = createChainedFunction(onMouseOverListener, onMouseOver);
      triggerProps.onMouseOut = createChainedFunction(onMouseOutListener, onMouseOut);
    }

    if (isOneOf('focus', trigger)) {
      triggerProps.onFocus = createChainedFunction(handleDelayedOpen, onFocus);
      triggerProps.onBlur = createChainedFunction(handleDelayedClose, onBlur);
    }
  }

  const renderOverlay = () => {
    const overlayProps: OverlayProps = {
      ...rest,
      placement,
      container,
      open,
      triggerTarget: triggerRef
    };

    if (isOneOf('click', trigger)) {
      overlayProps.onClose = createChainedFunction(handleClose, onClose);
    } else if (isOneOf('active', trigger)) {
      overlayProps.onClose = createChainedFunction(handleClose, onClose);
    }

    // The purpose of adding mouse entry and exit events to the Overlay is to record whether the current cursor is on the Overlay.
    // When `trigger` is equal to `hover`, if the cursor leaves the `triggerTarget` and stays on the Overlay,
    // the Overlay will continue to remain open.
    const speakerProps =
      trigger !== 'none' && enterable
        ? { onMouseEnter: handleSpeakerMouseEnter, onMouseLeave: handleSpeakerMouseLeave }
        : null;

    return (
      <Overlay {...overlayProps} ref={overlayRef} childrenProps={speakerProps}>
        {speaker}
      </Overlay>
    );
  };

  return (
    <>
      {typeof children === 'function'
        ? children(triggerProps, triggerRef)
        : React.cloneElement(children, { ...triggerProps, ref: triggerRef })}
      <Portal>{renderOverlay()}</Portal>
    </>
  );
});

OverlayTrigger.displayName = 'OverlayTrigger';
OverlayTrigger.defaultProps = defaultProps;

export default OverlayTrigger;
