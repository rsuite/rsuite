import on from 'dom-lib/on';
import getAnimationEnd from 'dom-lib/getAnimationEnd';
import type React from 'react';
import type { ModalContextProps } from './ModalContext';

type ElementRef = { current: HTMLElement | null };
type ListenerRef = { current: { off(): void } | null };
type NodeCallback = ((node: HTMLElement) => void) | undefined;

// Bound module functions keep stable callbacks from owning the render scope's
// unrelated children and props. They still receive the same render's inputs.
export function handleModalExited(
  onExited: NodeCallback,
  destroyEvents: () => void,
  listener: ListenerRef,
  node: HTMLElement
) {
  onExited?.(node);
  destroyEvents();
  listener.current?.off();
  listener.current = null;
}

export function handleModalEntered(
  onEntered: NodeCallback,
  changeBodyStyles: (entering?: boolean) => void,
  node: HTMLElement
) {
  onEntered?.(node);
  changeBodyStyles();
}

export function handleModalEntering(
  onEntering: NodeCallback,
  changeBodyStyles: (entering?: boolean) => void,
  node: HTMLElement
) {
  onEntering?.(node);
  changeBodyStyles(true);
}

export function recordBackdropMouseDown(
  backdropClick: { current: boolean | null },
  event: React.MouseEvent
) {
  backdropClick.current = event.target === event.currentTarget;
}

export function handleModalBackdropClick(
  backdropClick: { current: boolean | null },
  dialog: ElementRef,
  backdrop: boolean | 'static',
  motionReduced: boolean,
  setShake: (value: boolean) => void,
  listener: ListenerRef,
  onClose: ((event?: React.SyntheticEvent) => void) | undefined,
  event: React.MouseEvent
) {
  if (
    !backdropClick.current ||
    event.target === dialog.current ||
    event.target !== event.currentTarget
  ) {
    return;
  }
  if (backdrop === 'static') {
    if (motionReduced) return;
    setShake(true);
    if (!listener.current && dialog.current) {
      listener.current = on(dialog.current, getAnimationEnd(), () => setShake(false));
    }
    return;
  }
  onClose?.(event);
}

export function getModalBodyStyles(styles: React.CSSProperties | null) {
  return styles;
}

export function createModalContextValue(
  dialogId: string,
  onClose: ModalContextProps['onModalClose'],
  styles: React.CSSProperties | null,
  closeButton: ModalContextProps['closeButton'],
  isDrawer: boolean
): ModalContextProps {
  return {
    dialogId,
    onModalClose: onClose,
    getBodyStyles: getModalBodyStyles.bind(null, styles),
    closeButton,
    isDrawer
  };
}
