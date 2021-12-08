import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import on from 'dom-lib/on';
import getTransitionEnd from 'dom-lib/getTransitionEnd';
import BaseModal, { BaseModalProps, modalPropTypes } from '../Overlay/Modal';
import Bounce from '../Animation/Bounce';
import { useClassNames, mergeRefs, SIZE } from '../utils';
import ModalDialog, { modalDialogPropTypes } from './ModalDialog';
import { ModalContext, ModalContextProps } from './ModalContext';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';
import { useBodyStyles } from './utils';
import { TypeAttributes, RsRefForwardingComponent } from '../@types/common';
import useUniqueId from '../utils/useUniqueId';

export interface ModalProps
  extends BaseModalProps,
    Pick<
      React.HTMLAttributes<HTMLElement>,
      'role' | 'id' | 'aria-labelledby' | 'aria-describedby'
    > {
  /** A modal can have different sizes */
  size?: TypeAttributes.Size;

  /** Set the duration of the animation */
  animationTimeout?: number;

  /** Set an animation effect for Modal, the default is Bounce.  */
  animation?: React.ElementType;

  /** CSS class applied to Dialog DOM nodes */
  dialogClassName?: string;

  /** CSS style applied to dialog DOM nodes */
  dialogStyle?: React.CSSProperties;

  /** Full screen */
  full?: boolean;

  /** You can use a custom element type for Dialog */
  dialogAs?: React.ElementType;

  /** Automatically sets the height when the body content is too long. */
  overflow?: boolean;

  /** Render Modal as Drawer */
  drawer?: boolean;
}
interface ModalComponent extends RsRefForwardingComponent<'div', ModalProps> {
  Body: typeof ModalBody;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Footer: typeof ModalFooter;
  Dialog: typeof ModalDialog;
}

const Modal: ModalComponent = React.forwardRef((props: ModalProps, ref) => {
  const {
    className,
    children,
    classPrefix = 'modal',
    dialogClassName,
    backdropClassName,
    backdrop = true,
    dialogStyle,
    animation = Bounce,
    open,
    size = 'sm',
    full,
    dialogAs: Dialog = ModalDialog,
    animationProps,
    animationTimeout = 300,
    overflow = true,
    drawer = false,
    onClose,
    onEntered,
    onEntering,
    onExited,
    role = 'dialog',
    id: idProp,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    ...rest
  } = props;

  const inClass = { in: open && !animation };
  const { merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, prefix(size, { full }));

  const dialogRef = useRef<HTMLElement>(null);
  const transitionEndListener = useRef<{ off: () => void }>();

  // The style of the Modal body will be updated with the size of the window or container.
  const [bodyStyles, onChangeBodyStyles, onDestroyEvents] = useBodyStyles(dialogRef, {
    overflow,
    drawer,
    prefix
  });

  const dialogId = useUniqueId('dialog-', idProp);

  const modalContextValue = useMemo<ModalContextProps>(
    () => ({
      dialogId,
      onModalClose: onClose,
      getBodyStyles: () => bodyStyles,
      isDrawer: drawer
    }),
    [dialogId, onClose, bodyStyles, drawer]
  );

  const [shake, setShake] = useState(false);
  const handleBackdropClick = useCallback(() => {
    // When the value of `backdrop` is `static`, a jitter animation will be added to the dialog when clicked.
    if (backdrop === 'static') {
      setShake(true);
      transitionEndListener.current = on(dialogRef.current!, getTransitionEnd(), () => {
        setShake(false);
      });
    }
  }, [backdrop]);

  const handleExited = useCallback(
    (node: HTMLElement) => {
      onExited?.(node);
      onDestroyEvents();
      transitionEndListener.current?.off();
    },
    [onDestroyEvents, onExited]
  );

  const handleEntered = useCallback(
    (node: HTMLElement) => {
      onEntered?.(node);
      onChangeBodyStyles();
    },
    [onChangeBodyStyles, onEntered]
  );

  const handleEntering = useCallback(
    (node: HTMLElement) => {
      onEntering?.(node);
      onChangeBodyStyles(true);
    },
    [onChangeBodyStyles, onEntering]
  );

  useEffect(() => {
    transitionEndListener.current?.off();
  }, []);

  return (
    <ModalContext.Provider value={modalContextValue}>
      <BaseModal
        {...rest}
        ref={ref}
        backdrop={backdrop}
        open={open}
        onClose={onClose}
        onBackdropClick={handleBackdropClick}
        className={prefix`wrapper`}
        onEntered={handleEntered}
        onEntering={handleEntering}
        onExited={handleExited}
        backdropClassName={merge(prefix`backdrop`, backdropClassName, inClass)}
        containerClassName={prefix({ open, 'has-backdrop': backdrop })}
        transition={animation ? animation : undefined}
        animationProps={animationProps}
        dialogTransitionTimeout={animationTimeout}
        backdropTransitionTimeout={150}
      >
        {(transitionProps, transitionRef) => {
          const { className: transitionClassName, ...transitionRest } = transitionProps;
          return (
            <Dialog
              role={role}
              id={dialogId}
              aria-labelledby={ariaLabelledby ?? `${dialogId}-title`}
              aria-describedby={ariaDescribedby}
              {...transitionRest}
              {...pick(rest, Object.keys(modalDialogPropTypes))}
              ref={mergeRefs(dialogRef, transitionRef)}
              classPrefix={classPrefix}
              className={merge(classes, transitionClassName, prefix({ shake }))}
              dialogClassName={dialogClassName}
              dialogStyle={dialogStyle}
            >
              {children}
            </Dialog>
          );
        }}
      </BaseModal>
    </ModalContext.Provider>
  );
}) as unknown as ModalComponent;

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Footer = ModalFooter;
Modal.Dialog = ModalDialog;

Modal.displayName = 'Modal';
Modal.propTypes = {
  ...modalPropTypes,
  animation: PropTypes.any,
  animationTimeout: PropTypes.number,
  classPrefix: PropTypes.string,
  dialogClassName: PropTypes.string,
  size: PropTypes.oneOf(SIZE),
  dialogStyle: PropTypes.object,
  dialogAs: PropTypes.elementType,
  full: PropTypes.bool,
  overflow: PropTypes.bool,
  drawer: PropTypes.bool
};

export default Modal;
