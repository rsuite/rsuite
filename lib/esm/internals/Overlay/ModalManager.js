'use client';
import addClass from 'dom-lib/addClass';
import removeClass from 'dom-lib/removeClass';
import addStyle from 'dom-lib/addStyle';
import getStyle from 'dom-lib/getStyle';
import getScrollbarSize from 'dom-lib/getScrollbarSize';
import isOverflowing from 'dom-lib/isOverflowing';
function findIndexOf(arr, cb) {
  var index = -1;
  arr.some(function (d, i) {
    if (cb(d, i)) {
      index = i;
      return true;
    }
    return false;
  });
  return index;
}
function findContainer(data, modal) {
  return findIndexOf(data, function (d) {
    return d.modals.indexOf(modal) !== -1;
  });
}
var ModalManager = /*#__PURE__*/function () {
  function ModalManager() {
    this.modals = [];
    this.containers = [];
    this.data = [];
  }
  var _proto = ModalManager.prototype;
  _proto.add = function add(modal, container, className) {
    var modalIndex = this.modals.indexOf(modal);
    var containerIndex = this.containers.indexOf(container);
    if (modalIndex !== -1) {
      return modalIndex;
    }
    modalIndex = this.modals.length;
    this.modals.push(modal);
    if (containerIndex !== -1) {
      this.data[containerIndex].modals.push(modal);
      return modalIndex;
    }
    var containerState = {
      modals: [modal],
      classes: className ? className.split(/\s+/) : [],
      style: {
        overflow: container.style.overflow,
        paddingRight: container.style.paddingRight
      },
      overflowing: isOverflowing(container)
    };
    if (containerState.overflowing) {
      var paddingRight = parseInt(getStyle(container, 'paddingRight') || 0, 10);
      var barSize = getScrollbarSize();
      addStyle(container, {
        paddingRight: (barSize ? paddingRight + barSize : paddingRight) + 'px'
      });
    }
    containerState.classes.forEach(addClass.bind(null, container));
    this.containers.push(container);
    this.data.push(containerState);
    return modalIndex;
  };
  _proto.remove = function remove(modal) {
    var modalIndex = this.modals.indexOf(modal);
    if (modalIndex === -1) {
      return;
    }
    var containerIndex = findContainer(this.data, modal);
    var containerState = this.data[containerIndex];
    var container = this.containers[containerIndex];
    containerState.modals.splice(containerState.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);
    if (containerState.modals.length === 0) {
      Object.keys(containerState.style).forEach(function (key) {
        return container.style[key] = containerState.style[key];
      });
      containerState.classes.forEach(removeClass.bind(null, container));
      this.containers.splice(containerIndex, 1);
      this.data.splice(containerIndex, 1);
    }
  };
  _proto.isTopModal = function isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  };
  return ModalManager;
}();
export default ModalManager;