import {
  addClass,
  removeClass,
  addStyle,
  getStyle,
  getScrollbarSize,
  isOverflowing
} from 'dom-lib';

function findIndexOf(arr, cb: (d: any, i: any) => boolean) {
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

class ModalManager {
  constructor(hideSiblingNodes = true) {
    this.hideSiblingNodes = hideSiblingNodes;
    this.modals = [];
    this.containers = [];
    this.data = [];
  }

  hideSiblingNodes = null;
  modals = [];
  containers = [];
  data = [];

  add(modal: any, container: any, className?: string) {
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
      const style = {
        paddingRight:
          parseInt(getStyle(container, 'paddingRight') || 0, 10) + getScrollbarSize() + 'px'
      };
      addStyle(container, style);
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
