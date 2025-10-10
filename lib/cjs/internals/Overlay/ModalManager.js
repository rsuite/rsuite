'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _addClass = _interopRequireDefault(require("dom-lib/addClass"));
var _removeClass = _interopRequireDefault(require("dom-lib/removeClass"));
var _addStyle = _interopRequireDefault(require("dom-lib/addStyle"));
var _getStyle = _interopRequireDefault(require("dom-lib/getStyle"));
var _getScrollbarSize = _interopRequireDefault(require("dom-lib/getScrollbarSize"));
var _isOverflowing = _interopRequireDefault(require("dom-lib/isOverflowing"));
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
      overflowing: (0, _isOverflowing.default)(container)
    };
    if (containerState.overflowing) {
      var paddingRight = parseInt((0, _getStyle.default)(container, 'paddingRight') || 0, 10);
      var barSize = (0, _getScrollbarSize.default)();
      (0, _addStyle.default)(container, {
        paddingRight: (barSize ? paddingRight + barSize : paddingRight) + 'px'
      });
    }
    containerState.classes.forEach(_addClass.default.bind(null, container));
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
      containerState.classes.forEach(_removeClass.default.bind(null, container));
      this.containers.splice(containerIndex, 1);
      this.data.splice(containerIndex, 1);
    }
  };
  _proto.isTopModal = function isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  };
  return ModalManager;
}();
var _default = exports.default = ModalManager;