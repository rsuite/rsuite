import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import helper from '../DOMHelper';
import ModalManager from './ModalManager';
import Fade from '../Animation/Fade';
import { animationPropTypes } from '../Animation/utils';
import { mergeRefs, getDOMNode, usePortal, createChainedFunction } from '../utils';
import { WithAsProps, AnimationEventProps, RsRefForwardingComponent } from '../@types/common';

export interface BaseModalProps extends WithAsProps, AnimationEventProps {
  /** Animation-related properties */
  animationProps?: any;

  /** Primary content */
  children?: React.ReactNode;

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
  onClose?: (event: React.SyntheticEvent) => void;
}

interface ModalProps extends BaseModalProps {
  children: (props, ref) => React.ReactElement;
  container?: HTMLElement | (() => HTMLElement);
  containerClassName?: string;
  backdropTransitionTimeout?: number;
  dialogTransitionTimeout?: number;
  transition: React.ElementType;
  onEscapeKeyUp?: React.KeyboardEventHandler;
  onBackdropClick?: React.MouseEventHandler;
}

const modalManager = new ModalManager();

const defaultProps: Partial<ModalProps> = {
  as: 'div',
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true
};

const Modal: RsRefForwardingComponent<'div', ModalProps> = React.forwardRef(
  (props: ModalProps, ref) => {
    const {
      as: Component,
      children,
      transition: Transition,
      dialogTransitionTimeout,
      style,
      className,
      container,
      animationProps,
      containerClassName,
      keyboard,
      enforceFocus,
      backdrop,
      backdropTransitionTimeout,
      backdropStyle,
      backdropClassName,
      open,
      autoFocus,
      onBackdropClick,
      onEscapeKeyUp,
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

    const [exited, setExited] = useState(!open);
    const { Portal } = usePortal({ container });

    if (open) {
      if (exited) setExited(false);
    } else if (!Transition && !exited) {
      setExited(true);
    }

    const mountModal = open || (Transition && !exited);

    const rootRef = useRef<HTMLElement>();
    const lastFocus = useRef<HTMLElement>();

    const isTopModal = () => {
      return modalManager.isTopModal(rootRef.current);
    };

    const handleDocumentKeyUp = useCallback(
      (event: React.KeyboardEvent) => {
        if (keyboard && event.keyCode === 27 && isTopModal()) {
          onEscapeKeyUp?.(event);
          onClose?.(event);
        }
      },
      [keyboard, onEscapeKeyUp, onClose]
    );

    const checkForFocus = () => {
      if (helper.canUseDOM) {
        lastFocus.current = helper.activeElement() as HTMLElement;
      }
    };

    const restoreLastFocus = () => {
      if (lastFocus.current) {
        lastFocus.current.focus?.();
        lastFocus.current = null;
      }
    };

    const getDialogElement = () => {
      return getDOMNode(rootRef.current) as HTMLElement;
    };

    const handleEnforceFocus = useCallback(() => {
      if (!enforceFocus || !isTopModal()) {
        return;
      }

      const currentActiveElement = helper.activeElement();
      const dialog = getDialogElement();

      if (
        dialog &&
        dialog !== currentActiveElement &&
        !helper.contains(dialog, currentActiveElement)
      ) {
        dialog.focus();
      }
    }, [enforceFocus]);

    const handleBackdropClick = (event: React.MouseEvent) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      onBackdropClick?.(event);

      if (backdrop === true) {
        onClose?.(event);
      }
    };
    const documentKeyupListener = useRef<{ off: () => void }>();
    const docusinListener = useRef<{ off: () => void }>();
    const handleOpen = useCallback(() => {
      const dialog = getDialogElement();
      const containerElement = helper.getContainer(container, document.body);
      modalManager.add(rootRef.current, containerElement, containerClassName);

      documentKeyupListener.current = helper.on(document, 'keydown', handleDocumentKeyUp);
      docusinListener.current = helper.on(document, 'focus', handleEnforceFocus, true);
      onOpen?.();
      checkForFocus();

      if (autoFocus) {
        dialog?.focus();
      }
    }, [autoFocus, container, containerClassName, handleDocumentKeyUp, handleEnforceFocus, onOpen]);

    const handleClose = useCallback(() => {
      modalManager.remove(rootRef.current);
      documentKeyupListener.current?.off();
      docusinListener.current?.off();
      restoreLastFocus();
    }, []);

    useEffect(() => {
      if (exited) {
        handleClose();
      } else if (open) {
        handleOpen();
      }
    }, [open, exited, handleOpen, handleClose]);

    useEffect(() => {
      return () => {
        handleClose();
      };
    }, [handleClose]);

    const handleExited = useCallback(() => {
      setExited(true);
    }, []);

    if (!mountModal) {
      return null;
    }

    const renderBackdrop = () => {
      const backdropPorps = {
        style: backdropStyle,
        onClick: handleBackdropClick
      };

      if (Transition) {
        return (
          <Fade transitionAppear in={open} timeout={backdropTransitionTimeout}>
            {(fadeProps, ref) => {
              const { className, ...rest } = fadeProps;
              return (
                <div
                  aria-hidden
                  {...rest}
                  {...backdropPorps}
                  ref={ref}
                  className={classNames(backdropClassName, className)}
                />
              );
            }}
          </Fade>
        );
      }

      return <div aria-hidden {...backdropPorps} className={backdropClassName} />;
    };

    const dialogElement = Transition ? (
      <Transition
        {...animationProps}
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

    return (
      <Portal>
        <Component
          role="dialog"
          {...rest}
          ref={mergeRefs(rootRef, ref)}
          style={style}
          className={className}
          tabIndex={-1}
        >
          {backdrop && renderBackdrop()}
          {dialogElement}
        </Component>
      </Portal>
    );
  }
);

export const modalPropTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  backdropClassName: PropTypes.string,
  style: PropTypes.object,
  backdropStyle: PropTypes.object,
  open: PropTypes.bool,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  keyboard: PropTypes.bool,
  autoFocus: PropTypes.bool,
  enforceFocus: PropTypes.bool,
  animationProps: PropTypes.object,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

Modal.displayName = 'OverlayModal';
Modal.defaultProps = defaultProps;
Modal.propTypes = {
  ...animationPropTypes,
  ...modalPropTypes,
  children: PropTypes.func,
  container: PropTypes.any,
  containerClassName: PropTypes.string,
  dialogTransitionTimeout: PropTypes.number,
  backdropTransitionTimeout: PropTypes.number,
  transition: PropTypes.any,
  onEscapeKeyUp: PropTypes.func,
  onBackdropClick: PropTypes.func
};

export default Modal;
