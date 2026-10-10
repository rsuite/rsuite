import React, { useRef, useEffect, useState, useCallback, useSyncExternalStore } from 'react';
import classNames from 'classnames';
import contains from 'dom-lib/contains';
import on from 'dom-lib/on';
import ModalManager, { ModalInstance } from './ModalManager';
import getTabbableElements from './getTabbableElements';
import Fade from '../../Animation/Fade';
import Box, { BoxProps } from '@/internals/Box';
import { OverlayProvider } from './OverlayProvider';
import { KEY_VALUES } from '@/internals/constants';
import { usePortal, useWillUnmount, useEventCallback } from '@/internals/hooks';
import { forwardRef, mergeRefs, createChainedFunction } from '@/internals/utils';
import type { AnimationEventProps } from '@/internals/types';

export interface BaseModalProps
  extends Omit<BoxProps, 'children' | 'transition' | 'color' | 'overflow'>,
    AnimationEventProps {
  /** Animation-related properties */
  animationProps?: any;

  /** Reduce motion; when omitted, use the provider setting or system preference. */
  reduceMotion?: boolean;

  /** Primary content */
  children?: any;

  /**
   * Add an optional extra class name to .modal-backdrop
   * It could end up looking like class="modal-backdrop foo-modal-backdrop in"
   */
  backdropClassName?: string;

  /** CSS style applied to backdrop DOM nodes  */
  backdropStyle?: React.CSSProperties;

  /** Open  modal */
  open?: boolean;

  /**
   * When set to true, the Modal will display the background when it is opened.
   * Clicking on the background will close the Modal. If you do not want to close the Modal,
   * set it to 'static'.
   */
  backdrop?: boolean | 'static';

  /** Close Modal when esc key is pressed */
  keyboard?: boolean;

  /**
   * When set to true, the Modal is opened and is automatically focused on its own,
   * accessible to screen readers
   */
  autoFocus?: boolean;

  /**
   * When set to true, Modal will prevent the focus from leaving when opened,
   * making it easier for the secondary screen reader to access
   */
  enforceFocus?: boolean;

  /** Called when Modal is displayed */
  onOpen?: () => void;

  /** Called when Modal is closed */
  onClose?: (event?: React.SyntheticEvent) => void;
  container?: HTMLElement | (() => HTMLElement);
  containerClassName?: string;
  backdropTransitionTimeout?: number;
  dialogTransitionTimeout?: number;
  transition?: React.ElementType;
  onEsc?: React.KeyboardEventHandler;
  onClick?: React.MouseEventHandler;
  onMouseDown?: React.MouseEventHandler;

  // @deprecated
  onBackdropClick?: React.MouseEventHandler;
}

let manager: ModalManager;

const subscribeToClientRender = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function getManager() {
  if (!manager) manager = new ModalManager();
  return manager;
}

const useModalManager = () => {
  const modalManager = getManager();
  const modal = useRef<ModalInstance>({ dialog: null, backdrop: null });

  return {
    get dialog() {
      return modal.current?.dialog;
    },
    add: (containerElement: HTMLElement, containerClassName?: string) =>
      modalManager.add(modal.current, containerElement, containerClassName),
    remove: () => modalManager.remove(modal.current),
    isTopModal: () => modalManager.isTopModal(modal.current),
    setDialogRef: useCallback((ref: HTMLElement | null) => {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: useCallback((ref: HTMLElement | null) => {
      modal.current.backdrop = ref;
    }, [])
  };
};

const Modal = forwardRef<'div', BaseModalProps, any, 'children'>((props, ref) => {
  const {
    as,
    children,
    transition: Transition,
    dialogTransitionTimeout,
    style,
    className,
    container,
    animationProps,
    reduceMotion,
    containerClassName,
    keyboard = true,
    enforceFocus = true,
    backdrop = true,
    backdropTransitionTimeout,
    backdropStyle,
    backdropClassName,
    open,
    autoFocus = true,
    onEsc,
    onExit,
    onExiting,
    onExited,
    onEnter,
    onEntering,
    onEntered,
    onClose,
    onOpen,
    ...rest
  } = props;

  // Keep the first hydration render empty, matching the server's portal output.
  const portalReady = useSyncExternalStore(
    subscribeToClientRender,
    getClientSnapshot,
    getServerSnapshot
  );
  const [exited, setExited] = useState(!open);
  const { Portal, target: containerElement } = usePortal({ container });
  const modal = useModalManager();

  if (open) {
    if (exited) setExited(false);
  } else if (!Transition && !exited) {
    setExited(true);
  }

  const mountModal = portalReady && (open || (Transition && !exited));

  const lastFocus = useRef<HTMLElement | null>(null);
  const startGuard = useRef<HTMLSpanElement>(null);
  const endGuard = useRef<HTMLSpanElement>(null);
  const tabNavigation = useRef<{ source: Element | null; backwards: boolean } | null>(null);
  const tabNavigationTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const clearTabNavigation = () => {
    clearTimeout(tabNavigationTimer.current);
    tabNavigation.current = null;
  };

  const focusNext = (source: Element | null, backwards: boolean) => {
    const dialog = modal.dialog;
    if (!dialog) return;
    const elements = getTabbableElements(dialog, backwards, source);
    const index = elements.indexOf(source as HTMLElement);
    const next =
      index < 0
        ? backwards
          ? elements[elements.length - 1]
          : elements[0]
        : elements[(index + (backwards ? -1 : 1) + elements.length) % elements.length];
    (next || dialog).focus();
  };

  const handleFocusGuard = (event: React.FocusEvent) => {
    if (!enforceFocus || !modal.isTopModal()) return;
    const navigation = tabNavigation.current;
    clearTabNavigation();
    focusNext(
      navigation?.source || null,
      navigation?.backwards ?? event.target === startGuard.current
    );
  };

  const handleDocumentKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    if (!modal.isTopModal()) return;

    if (keyboard && event.key === KEY_VALUES.ESC) {
      onEsc?.(event);
      onClose?.(event);
    }

    const dialog = modal.dialog;
    if (event.key !== KEY_VALUES.TAB || !enforceFocus || event.defaultPrevented || !dialog) {
      return;
    }

    const elements = getTabbableElements(dialog, event.shiftKey);
    const first = elements[0];
    const last = elements[elements.length - 1];
    const active = dialog.ownerDocument.activeElement;
    clearTabNavigation();
    if (!first || !active || active === dialog || !contains(dialog, active)) {
      event.preventDefault();
      focusNext(null, event.shiftKey);
      return;
    }

    // Guards bracket the ordered range, while native composite controls retain their inner stops.
    if (startGuard.current) startGuard.current.tabIndex = Math.max(0, first.tabIndex);
    if (endGuard.current) endGuard.current.tabIndex = Math.max(0, last.tabIndex);
    if (active && contains(dialog, active)) {
      tabNavigation.current = { source: active, backwards: event.shiftKey };
      // Only a focus move from this native Tab action uses the ordered destination.
      tabNavigationTimer.current = setTimeout(clearTabNavigation, 0);
    }
  });

  const restoreLastFocus = useCallback(() => {
    if (lastFocus.current) {
      lastFocus.current.focus?.();
      lastFocus.current = null;
    }
  }, []);

  /**
   * Determines if the currently focused element is inside the dialog,
   * and if not, returns the focus to the dialog.
   *
   */
  const handleFocusDialog = useEventCallback((onBeforeFocusCallback?: () => void) => {
    const dialog = modal.dialog;
    const currentActiveElement = dialog?.ownerDocument.activeElement as HTMLElement | null;

    if (dialog && currentActiveElement && !contains(dialog, currentActiveElement)) {
      onBeforeFocusCallback?.();
      dialog.focus();
    }
  });

  const handleEnforceFocus = useEventCallback(() => {
    if (!enforceFocus || !modal.isTopModal()) {
      return;
    }

    const dialog = modal.dialog;
    const navigation = tabNavigation.current;
    if (dialog && navigation && !dialog.contains(dialog.ownerDocument.activeElement)) {
      clearTabNavigation();
      focusNext(navigation.source, navigation.backwards);
      return;
    }
    handleFocusDialog();
  });

  const documentKeyDownListener = useRef<{ off: () => void } | null>(null);
  const documentFocusListener = useRef<{ off: () => void } | null>(null);

  const handleOpen = useEventCallback(() => {
    const dialogDocument =
      modal.dialog?.ownerDocument || containerElement?.ownerDocument || document;
    if (containerElement) {
      modal.add(containerElement, containerClassName);
    }

    if (!documentKeyDownListener.current) {
      documentKeyDownListener.current = on(dialogDocument, 'keydown', handleDocumentKeyDown);
    }

    if (!documentFocusListener.current) {
      documentFocusListener.current = on(dialogDocument, 'focus', handleEnforceFocus, true);
    }

    if (autoFocus) {
      handleFocusDialog(() => {
        const focusDocument = dialogDocument.hasFocus() ? dialogDocument : document;
        lastFocus.current = focusDocument.activeElement as HTMLElement;
      });
    }

    onOpen?.();
  });

  const handleClose = useEventCallback(() => {
    clearTabNavigation();
    modal.remove();
    documentKeyDownListener.current?.off();
    documentKeyDownListener.current = null;
    documentFocusListener.current?.off();
    documentFocusListener.current = null;
    restoreLastFocus();
  });

  useEffect(() => {
    if (!open || !portalReady) {
      return;
    }

    handleOpen();
  }, [open, portalReady, handleOpen]);

  useEffect(() => {
    if (!exited) {
      return;
    }
    handleClose();
  }, [exited, handleClose]);

  useWillUnmount(() => {
    handleClose();
  });

  const handleExited = useCallback(() => {
    setExited(true);
  }, []);

  const overlayContainer = useCallback(() => {
    return modal.dialog;
  }, [modal.dialog]);

  if (!mountModal) {
    return null;
  }

  const renderBackdrop = () => {
    if (Transition) {
      return (
        <Fade
          transitionAppear
          in={open}
          timeout={backdropTransitionTimeout}
          reduceMotion={reduceMotion}
        >
          {(fadeProps, ref) => {
            const { className, ...rest } = fadeProps;
            return (
              <div
                aria-hidden
                data-testid="backdrop"
                {...rest}
                style={backdropStyle}
                ref={mergeRefs(modal.setBackdropRef, ref)}
                className={classNames(backdropClassName, className)}
              />
            );
          }}
        </Fade>
      );
    }

    return <div aria-hidden style={backdropStyle} className={backdropClassName} />;
  };

  const dialogElement = Transition ? (
    <Transition
      {...animationProps}
      reduceMotion={reduceMotion ?? animationProps?.reduceMotion}
      transitionAppear
      unmountOnExit
      in={open}
      timeout={dialogTransitionTimeout}
      onExit={onExit}
      onExiting={onExiting}
      onExited={createChainedFunction(handleExited, onExited)}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
    >
      {children}
    </Transition>
  ) : (
    children
  );

  const guardStyle: React.CSSProperties = {
    position: 'fixed',
    width: 1,
    height: 1,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    pointerEvents: 'none'
  };

  return (
    <OverlayProvider overlayContainer={overlayContainer}>
      <Portal>
        {backdrop && renderBackdrop()}
        <Box
          as={as}
          {...rest}
          ref={mergeRefs(modal.setDialogRef, ref as any)}
          style={style}
          className={className}
          tabIndex={-1}
        >
          {enforceFocus && (
            <span
              ref={startGuard}
              aria-hidden="true"
              data-rsuite-modal-focus-guard
              tabIndex={0}
              style={guardStyle}
              onFocus={handleFocusGuard}
            />
          )}
          {dialogElement}
          {enforceFocus && (
            <span
              ref={endGuard}
              aria-hidden="true"
              data-rsuite-modal-focus-guard
              tabIndex={0}
              style={guardStyle}
              onFocus={handleFocusGuard}
            />
          )}
        </Box>
      </Portal>
    </OverlayProvider>
  );
});

Modal.displayName = 'OverlayModal';

export default Modal;
