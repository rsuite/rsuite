'use client';
import { useState, useCallback } from 'react';
function useForceUpdate() {
  var _useState = useState(Object.create(null)),
    dispatch = _useState[1];
  var forceUpdate = useCallback(function () {
    dispatch(Object.create(null));
  }, [dispatch]);
  return forceUpdate;
}
export default useForceUpdate;