import React from 'react';
import addClass from 'dom-lib/addClass';
import removeClass from 'dom-lib/removeClass';
import addStyle from 'dom-lib/addStyle';
import getStyle from 'dom-lib/getStyle';
import getScrollbarSize from 'dom-lib/getScrollbarSize';
import isOverflowing from 'dom-lib/isOverflowing';

function findIndexOf(arr: any[], cb: (d: any, i: number) => boolean) {
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

function findContainer(data, modal) {
  return findIndexOf(data, d => d.modals.indexOf(modal) !== -1);
}

export type ModalElements = { dialog: HTMLElement | null; backdrop: HTMLElement | null };

type ModalData = {
  modals: ModalElements[];
  classes: string[];
  style: React.CSSProperties;
  overflowing: boolean;
};

class ModalManager {
  constructor(hideSiblingNodes = true) {
    this.hideSiblingNodes = hideSiblingNodes;
    this.modals = [];
    this.containers = [];
    this.data = [];
  }

  hideSiblingNodes!: boolean;
  modals: ModalElements[] = [];
  containers: HTMLElement[] = [];
  data: ModalData[] = [];

  add(modal: ModalElements, container: HTMLElement, className?: string) {
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

    const data = {
      modals: [modal],
      classes: className ? className.split(/\s+/) : [],
      style: {
        overflow: container.style.overflow,
        paddingRight: container.style.paddingRight
      },
      overflowing: isOverflowing(container)
    };

    if (data.overflowing) {
      const paddingRight = parseInt((getStyle(container, 'paddingRight') || 0) as string, 10);
      const barSize = getScrollbarSize();

      addStyle(container, {
        paddingRight: (barSize ? paddingRight + barSize : paddingRight) + 'px'
      });
    }

    data.classes.forEach(addClass.bind(null, container));

    this.containers.push(container);
    this.data.push(data);

    return modalIndex;
  }

  remove(modal) {
    const modalIndex = this.modals.indexOf(modal);

    if (modalIndex === -1) {
      return;
    }

    const containerIndex = findContainer(this.data, modal);
    const data = this.data[containerIndex];
    const container = this.containers[containerIndex];

    data.modals.splice(data.modals.indexOf(modal), 1);

    this.modals.splice(modalIndex, 1);

    if (data.modals.length === 0) {
      Object.keys(data.style).forEach(key => (container.style[key] = data.style[key]));

      data.classes.forEach(removeClass.bind(null, container));

      this.containers.splice(containerIndex, 1);
      this.data.splice(containerIndex, 1);
    }
  }

  isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  }
}

export default ModalManager;
