import { useRef, useCallback } from 'react';
import ModalManager, { ModalInstance } from './ModalManager';

let manager: ModalManager;

function getManager() {
  if (!manager) manager = new ModalManager();
  return manager;
}

export default function useModalManager() {
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
}
