import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  useCallback,
  useContext,
  useState,
  useMemo,
  isValidElement,
  cloneElement
} from 'react';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import contains from 'dom-lib/contains';
import OverlayContext from './OverlayContext';
import Overlay, { OverlayProps } from './Overlay';
import { usePortal, useControlled } from '../hooks';
import { createChainedFunction, isOneOf } from '@/internals/utils';
import { isFragment } from '@/internals/utils/ReactChildren';
import type { AnimationEventProps, StandardProps, Placement } from '@/internals/types';
import type { PositionChildProps, PositionInstance } from './Position';
import type { CursorPosition } from './types';

export type OverlayTriggerType = 'click' | 'hover' | 'focus' | 'active' | 'contextMenu' | 'none';

function mergeEvents(events = {}, props = {}) {
  const nextEvents = {};

  Object.keys(events).forEach(eventName => {
    if (events[eventName]) {
      nextEvents[eventName] = createChainedFunction(events[eventName], props?.[eventName]);
    }
  });
  return nextEvents;
}

export interface OverlayTriggerProps extends Omit<StandardProps, 'children'>, AnimationEventProps {
  /** Triggering events */
  trigger?: OverlayTriggerType | OverlayTriggerType[];

  /** Display placement */
  placement?: Placement;

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
  speaker:
    | React.ReactElement
    | ((
        props: PositionChildProps &
          Pick<React.HTMLAttributes<HTMLElement>, 'id' | 'onMouseEnter' | 'onMouseLeave'> & {
            onClose: (delay?: number) => NodeJS.Timeout | void;
          },
        ref: React.RefCallback<HTMLElement>
      ) => React.ReactElement);

  /** Prevent floating element overflow */
  preventOverflow?: boolean;

  /** Opern  overlay */
  open?: boolean;

  /** The overlay is open by default */
  defaultOpen?: boolean;

  /** Whether mouse is allowed to enter the floating layer of popover, whose default value is false. */
  enterable?: boolean;

  /** For the monitored component, the event will be bound to this component. */
  children: React.ReactNode | ((props: any, ref) => React.ReactElement);

  /** Whether to allow clicking document to close the overlay */
  rootClose?: boolean;

  /** Once disabled, the event cannot be triggered. */
  disabled?: boolean;

  /** Render the control as plain text */
  plaintext?: boolean;

  /** Make the control readonly */
  readOnly?: boolean;

  /**  Set the `id` on `<Overlay>` and `aria-describedby` on `<OverlayTrigger>` */
  controlId?: string;

  /** Lose Focus callback function */
  onBlur?: React.FocusEventHandler;

  /** Click on the callback function */
  onClick?: React.MouseEventHandler;

  /** RightClick on the callback function */
  onContextMenu?: React.MouseEventHandler;

  /** Callback function to get focus */
  onFocus?: React.FocusEventHandler;

  /** Mouse leave callback function */
  onMouseOut?: React.MouseEventHandler;

  /** Mouse over callback function */
  onMouseOver?: React.MouseEventHandler;

  /** Mouse move callback function */
  onMouseMove?: React.MouseEventHandler;

  /** Callback fired when open component */
  onOpen?: () => void;

  /** Callback fired when close component */
  onClose?: (cause?: OverlayCloseCause) => void;

  /** Whether speaker to follow the cursor */
  followCursor?: boolean;
}

/**
 * The reason that triggers closing of an overlay
 * - Clicking outside of the overlay
 * - Direct invocation of triggerRef.current.close()
 */
export enum OverlayCloseCause {
  ClickOutside,
  ImperativeHandle
}

/**
 * Useful for mouseover and mouseout.
 * In order to resolve the node entering the mouseover element, a mouseout event and a mouseover event will be triggered.
 * https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave
 * @param handler
 * @param event
 */
function onMouseEventHandler(
  handler: (event: React.MouseEvent, delay?: number) => void,
  event: React.MouseEvent,
  relatedNative: 'fromElement' | 'toElement'
) {
  const target = event.currentTarget;
  const related = event.relatedTarget || get(event, ['nativeEvent', relatedNative]);

  if ((!related || related !== target) && !contains(target as HTMLElement, related)) {
    handler(event);
  }
}

export interface OverlayTriggerHandle {
  root?: HTMLElement | null;
  updatePosition: () => void;
  open: (delay?: number) => void;
  close: (delay?: number) => void;
  getState: () => { open?: boolean };
}

const defaultTrigger = ['hover', 'focus'];

/**
 * OverlayTrigger is used to display floating elements on another component.
 * @private
 */
const OverlayTrigger = React.forwardRef(
  (props: OverlayTriggerProps, ref: React.Ref<OverlayTriggerHandle>) => {
    const { overlayContainer } = useContext(OverlayContext);
    const {
      children,
      container = overlayContainer,
      controlId,
      defaultOpen,
      trigger = defaultTrigger,
      disabled,
      followCursor,
      readOnly,
      plaintext,
      open: openProp,
      delay,
      delayOpen: delayOpenProp,
      delayClose: delayCloseProp,
      enterable,
      placement = 'bottomStart',
      speaker,
      rootClose = true,
      onClick,
      onMouseOver,
      onMouseMove,
      onMouseOut,
      onContextMenu,
      onFocus,
      onBlur,
      onOpen,
      onClose,
      onExited,
      ...rest
    } = props;

    const { Portal, target: containerElement } = usePortal({ container });
    const triggerRef = useRef(null);
    const overlayRef = useRef<PositionInstance>();
    const [open, setOpen] = useControlled(openProp, defaultOpen);
    const [cursorPosition, setCursorPosition] = useState<CursorPosition | null>(null);

    // Delay the timer to close/open the overlay
    // When the cursor moves from the trigger to the overlay, the overlay will be closed.
    // In order to keep the overlay open, a timer is used to delay the closing.
    const delayOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const delayCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const delayOpen = isNil(delayOpenProp) ? delay : delayOpenProp;
    const delayClose = isNil(delayCloseProp) ? delay : delayCloseProp;

    // Whether the cursor is on the overlay
    const isOnOverlay = useRef(false);

    // Whether the cursor is on the trigger
    const isOnTrigger = useRef(false);

    useEffect(() => {
      return () => {
        if (!isNil(delayOpenTimer.current)) {
          clearTimeout(delayOpenTimer.current);
        }
        if (!isNil(delayCloseTimer.current)) {
          clearTimeout(delayCloseTimer.current);
        }
      };
    }, []);

    // Whether the cursor is on the overlay
    const mouseEnter = useRef(false);
    const handleOpenChange = useCallback(
      (nextOpen: boolean, closeCause?: OverlayCloseCause) => {
        // if the overlay open state is not changed, do not fire the event
        if (nextOpen === open) return;

        if (nextOpen) {
          onOpen?.();
        } else {
          onClose?.(closeCause);
        }
        setOpen(nextOpen);
      },
      [open, onOpen, onClose, setOpen]
    );

    const handleOpen = useCallback(
      (delay?: number) => {
        const ms = isUndefined(delay) ? delayOpen : delay;

        if (ms && typeof ms === 'number') {
          return (delayOpenTimer.current = setTimeout(() => {
            delayOpenTimer.current = null;

            if (mouseEnter.current) {
              handleOpenChange(true);
            }
          }, ms));
        }

        handleOpenChange(true);
      },
      [delayOpen, handleOpenChange]
    );

    const handleClose = useCallback(
      (delay?: number, closeCause?: OverlayCloseCause) => {
        const ms = isUndefined(delay) ? delayClose : delay;

        if (ms && typeof ms === 'number') {
          return (delayCloseTimer.current = setTimeout(() => {
            delayCloseTimer.current = null;
            handleOpenChange(false, closeCause);
          }, ms));
        }
        handleOpenChange(false, closeCause);
      },
      [delayClose, handleOpenChange]
    );

    const handleExited = useCallback(() => {
      setCursorPosition(null);
    }, []);

    useImperativeHandle(ref, () => ({
      get root() {
        return triggerRef.current;
      },
      get overlay() {
        return overlayRef.current?.child;
      },
      getState: () => ({ open }),
      open: handleOpen,
      close: (delay?: number) => handleClose(delay, OverlayCloseCause.ImperativeHandle),
      updatePosition: () => {
        overlayRef.current?.updatePosition?.();
      }
    }));

    /**
     * Close after the cursor leaves.
     */
    const handleCloseWhenLeave = useCallback(() => {
      // When the cursor is not on the overlay and not on the trigger, it is closed.
      if (!isOnOverlay.current && !isOnTrigger.current) {
        handleClose(undefined, OverlayCloseCause.ClickOutside);
      }
    }, [handleClose]);

    const handleDelayedOpen = useCallback(() => {
      mouseEnter.current = true;

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
    }, [enterable, open, handleOpen]);

    /**
     * Toggle open and closed state.
     */
    const handleOpenState = useCallback(() => {
      if (open) {
        handleCloseWhenLeave();
      } else {
        handleDelayedOpen();
      }
    }, [open, handleCloseWhenLeave, handleDelayedOpen]);

    const handleDelayedClose = useCallback(() => {
      mouseEnter.current = false;

      if (!enterable) {
        return handleClose();
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

      delayCloseTimer.current = setTimeout(() => {
        if (!isNil(delayCloseTimer.current)) {
          clearTimeout(delayCloseTimer.current);
          delayCloseTimer.current = null;
        }
        handleCloseWhenLeave();
      }, 200);
    }, [enterable, open, handleClose, handleCloseWhenLeave]);

    const handleSpeakerMouseEnter = useCallback(() => {
      isOnOverlay.current = true;
    }, []);

    const handleSpeakerMouseLeave = useCallback(() => {
      isOnOverlay.current = false;
      if (
        !isOneOf('click', trigger) &&
        !isOneOf('contextMenu', trigger) &&
        !isOneOf('active', trigger)
      ) {
        handleCloseWhenLeave();
      }
    }, [handleCloseWhenLeave, trigger]);

    const handledMoveOverlay = useCallback((event: React.MouseEvent<Element, MouseEvent>) => {
      setCursorPosition(() => ({
        top: event.pageY,
        left: event.pageX,
        clientTop: event.clientX,
        clientLeft: event.clientY
      }));
    }, []);

    const handleMouseOver = useCallback(
      (event: React.MouseEvent<Element, MouseEvent>) => {
        onMouseEventHandler(handleDelayedOpen, event, 'fromElement');
      },
      [handleDelayedOpen]
    );

    const handleMouseOut = useCallback(
      (event: React.MouseEvent<Element, MouseEvent>) => {
        onMouseEventHandler(handleDelayedClose, event, 'toElement');
      },
      [handleDelayedClose]
    );

    const preventDefault = useCallback((event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();
    }, []);

    const triggerEvents = useMemo(() => {
      // Pass events by props
      const events = {
        onClick,
        onContextMenu,
        onMouseOver,
        onMouseOut,
        onFocus,
        onBlur,
        onMouseMove
      };

      // When trigger is disabled, no predefined event listeners are added.
      if (disabled || readOnly || plaintext || trigger === 'none') {
        return events;
      }

      // Get the cursor position through onMouseMove.
      // https://rsuitejs.com/components/tooltip/#follow-cursor
      if (followCursor) {
        events.onMouseMove = createChainedFunction(handledMoveOverlay, onMouseMove);
      }

      // The `click` event is usually used in `toggle` scenarios.
      // The first click will open and the second click will close.
      if (isOneOf('click', trigger)) {
        events.onClick = createChainedFunction(handleOpenState, events.onClick);
        return events;
      }

      // The difference between it and the click event is that it does not trigger the close.
      if (isOneOf('active', trigger)) {
        events.onClick = createChainedFunction(handleDelayedOpen, events.onClick);
        return events;
      }

      if (isOneOf('hover', trigger)) {
        events.onMouseOver = createChainedFunction(handleMouseOver, events.onMouseOver);
        events.onMouseOut = createChainedFunction(handleMouseOut, events.onMouseOut);
      }

      if (isOneOf('focus', trigger)) {
        events.onFocus = createChainedFunction(handleDelayedOpen, events.onFocus);
        events.onBlur = createChainedFunction(handleDelayedClose, events.onBlur);
      }

      if (isOneOf('contextMenu', trigger)) {
        events.onContextMenu = createChainedFunction(
          preventDefault,
          handleOpenState,
          events.onContextMenu
        );
      }

      return events;
    }, [
      disabled,
      followCursor,
      handleDelayedClose,
      handleDelayedOpen,
      handleMouseOut,
      handleMouseOver,
      handleOpenState,
      handledMoveOverlay,
      onBlur,
      onClick,
      onContextMenu,
      onFocus,
      onMouseMove,
      onMouseOut,
      onMouseOver,
      plaintext,
      preventDefault,
      readOnly,
      trigger
    ]);

    const renderOverlay = () => {
      const overlayProps: Omit<OverlayProps, 'children'> = {
        ...rest,
        rootClose,
        triggerTarget: triggerRef,
        onClose:
          trigger !== 'none'
            ? () => handleClose(undefined, OverlayCloseCause.ClickOutside) as any
            : undefined,
        onExited: createChainedFunction(followCursor ? handleExited : undefined, onExited),
        placement,
        container: containerElement,
        open
      };

      const speakerProps: Pick<
        React.HTMLAttributes<HTMLElement>,
        'id' | 'onMouseEnter' | 'onMouseLeave'
      > = {
        id: controlId
      };

      // The purpose of adding mouse entry and exit events to the Overlay is to record whether the current cursor is on the Overlay.
      // When `trigger` is equal to `hover`, if the cursor leaves the `triggerTarget` and stays on the Overlay,
      // the Overlay will continue to remain open.
      if (trigger !== 'none' && enterable) {
        speakerProps.onMouseEnter = handleSpeakerMouseEnter;
        speakerProps.onMouseLeave = handleSpeakerMouseLeave;
      }

      return (
        <Overlay
          {...overlayProps}
          ref={overlayRef}
          childrenProps={speakerProps}
          followCursor={followCursor}
          cursorPosition={cursorPosition}
        >
          {typeof speaker === 'function'
            ? (props, ref) => {
                return speaker({ ...props, onClose: handleClose }, ref);
              }
            : speaker}
        </Overlay>
      );
    };

    const triggerElement = useMemo(() => {
      if (typeof children === 'function') {
        return children(triggerEvents, triggerRef);
      } else if (isFragment(children) || !isValidElement(children)) {
        return (
          <span ref={triggerRef} aria-describedby={controlId} {...triggerEvents}>
            {children}
          </span>
        );
      }

      return cloneElement(children as React.ReactElement, {
        ref: triggerRef,
        'aria-describedby': controlId,
        ...mergeEvents(triggerEvents, children.props)
      });
    }, [children, controlId, triggerEvents]);

    return (
      <>
        {triggerElement}
        <Portal>{renderOverlay()}</Portal>
      </>
    );
  }
);

OverlayTrigger.displayName = 'OverlayTrigger';

export default OverlayTrigger;
