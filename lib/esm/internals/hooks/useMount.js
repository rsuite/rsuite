'use client';
import { useEffect, useRef } from 'react';
export var useMount = function useMount(callback) {
  var mountRef = useRef(callback);
  mountRef.current = callback;
  useEffect(function () {
    var _mountRef$current;
    (_mountRef$current = mountRef.current) === null || _mountRef$current === void 0 || _mountRef$current.call(mountRef);
  }, []);
};
export default useMount;