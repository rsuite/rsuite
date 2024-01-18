import React from 'react';
import addClass from 'dom-lib/addClass';
import removeClass from 'dom-lib/removeClass';
import addStyle from 'dom-lib/addStyle';
import getStyle from 'dom-lib/getStyle';
import getScrollbarSize from 'dom-lib/getScrollbarSize';
import isOverflowing from 'dom-lib/isOverflowing';

export interface ModalInstance {
  dialog: HTMLElement | null;
  backdrop: HTMLElement | null;
}

export interface ContainerState {
  classes: string[];
  modals: ModalInstance[];
  style: React.CSSProperties;
  overflowing: boolean;
}

function findIndexOf<T>(arr: T[], cb: (d: T, i: number) => boolean) {
  let index = -1;
  arr.some((d, i) => {
    if (cb(d, i)) {
      index = i;
      return true;
    }
    return false;
  });
  return index;
}

function findContainer(data: ContainerState[], modal: ModalInstance) {
  return findIndexOf(data, d => d.modals.indexOf(modal) !== -1);
}

class ModalManager {
  modals: ModalInstance[] = [];
  containers: HTMLElement[] = [];
  data: ContainerState[] = [];

  add(modal: ModalInstance, container: HTMLElement, className?: string) {
    let modalIndex = this.modals.indexOf(modal);
    const containerIndex = this.containers.indexOf(container);

    if (modalIndex !== -1) {
      return modalIndex;
    }

    modalIndex = this.modals.length;
    this.modals.push(modal);

    if (containerIndex !== -1) {
      this.data[containerIndex].modals.push(modal);
      return modalIndex;
    }

    const containerState: ContainerState = {
      modals: [modal],
      classes: className ? className.split(/\s+/) : [],
      style: {
        overflow: container.style.overflow,
        paddingRight: container.style.paddingRight
      },
      overflowing: isOverflowing(container)
    };

    if (containerState.overflowing) {
      const paddingRight = parseInt((getStyle(container, 'paddingRight') || 0) as string, 10);
      const barSize = getScrollbarSize();

      addStyle(container, {
        paddingRight: (barSize ? paddingRight + barSize : paddingRight) + 'px'
      });
    }

    containerState.classes.forEach(addClass.bind(null, container));

    this.containers.push(container);
    this.data.push(containerState);

    return modalIndex;
  }

  remove(modal: ModalInstance) {
    const modalIndex = this.modals.indexOf(modal);

    if (modalIndex === -1) {
      return;
    }

    const containerIndex = findContainer(this.data, modal);
    const containerState = this.data[containerIndex];
    const container = this.containers[containerIndex];

    containerState.modals.splice(containerState.modals.indexOf(modal), 1);

    this.modals.splice(modalIndex, 1);

    if (containerState.modals.length === 0) {
      Object.keys(containerState.style).forEach(
        key => (container.style[key] = containerState.style[key])
      );

      containerState.classes.forEach(removeClass.bind(null, container));

      this.containers.splice(containerIndex, 1);
      this.data.splice(containerIndex, 1);
    }
  }

  isTopModal(modal: ModalInstance) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  }
}

export default ModalManager;
