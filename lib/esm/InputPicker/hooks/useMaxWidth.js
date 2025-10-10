'use client';
import { useState, useEffect } from 'react';
import getWidth from 'dom-lib/getWidth';
function useMaxWidth(triggerRef) {
  var _useState = useState(100),
    maxWidth = _useState[0],
    setMaxWidth = _useState[1];
  useEffect(function () {
    var _triggerRef$current;
    // In multiple selection, you need to set a maximum width for the input.
    if ((_triggerRef$current = triggerRef.current) !== null && _triggerRef$current !== void 0 && _triggerRef$current.root) {
      var _triggerRef$current2;
      setMaxWidth(getWidth((_triggerRef$current2 = triggerRef.current) === null || _triggerRef$current2 === void 0 ? void 0 : _triggerRef$current2.root));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return maxWidth;
}
export default useMaxWidth;