'use client';
import { useImperativeHandle, useRef } from 'react';
import { useEventCallback } from "../../hooks/index.js";
import { RSUITE_PICKER_TYPE } from "../../symbols.js";
/**
 * A hook of the exposed method of Picker
 */
function usePickerRef(ref) {
  var trigger = useRef(null);
  var root = useRef(null);
  var target = useRef(null);
  var overlay = useRef(null);
  var list = useRef(null);
  var searchInput = useRef(null);
  var treeView = useRef(null);
  var handleOpen = useEventCallback(function () {
    var _trigger$current;
    trigger === null || trigger === void 0 || (_trigger$current = trigger.current) === null || _trigger$current === void 0 || _trigger$current.open();
  });
  var handleClose = useEventCallback(function () {
    var _trigger$current2;
    trigger === null || trigger === void 0 || (_trigger$current2 = trigger.current) === null || _trigger$current2 === void 0 || _trigger$current2.close();
  });
  var handleUpdatePosition = useEventCallback(function () {
    var _trigger$current3;
    trigger === null || trigger === void 0 || (_trigger$current3 = trigger.current) === null || _trigger$current3 === void 0 || _trigger$current3.updatePosition();
  });
  useImperativeHandle(ref, function () {
    return {
      get root() {
        var _ref, _trigger$current4;
        return (_ref = (root === null || root === void 0 ? void 0 : root.current) || (trigger === null || trigger === void 0 || (_trigger$current4 = trigger.current) === null || _trigger$current4 === void 0 ? void 0 : _trigger$current4.root)) !== null && _ref !== void 0 ? _ref : null;
      },
      get overlay() {
        var _overlay$current;
        if (!(overlay !== null && overlay !== void 0 && overlay.current)) {
          throw new Error('The overlay is not found. Please confirm whether the picker is open.');
        }
        return (_overlay$current = overlay === null || overlay === void 0 ? void 0 : overlay.current) !== null && _overlay$current !== void 0 ? _overlay$current : null;
      },
      get target() {
        var _target$current;
        return (_target$current = target === null || target === void 0 ? void 0 : target.current) !== null && _target$current !== void 0 ? _target$current : null;
      },
      get list() {
        if (!(list !== null && list !== void 0 && list.current)) {
          throw new Error("\n            The list is not found.\n            1.Please set virtualized for the component.\n            2.Please confirm whether the picker is open.\n          ");
        }
        return list === null || list === void 0 ? void 0 : list.current;
      },
      type: RSUITE_PICKER_TYPE,
      updatePosition: handleUpdatePosition,
      open: handleOpen,
      close: handleClose
    };
  });
  return {
    trigger: trigger,
    root: root,
    overlay: overlay,
    target: target,
    list: list,
    searchInput: searchInput,
    treeView: treeView
  };
}
export default usePickerRef;