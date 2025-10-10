'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import { useRef, useImperativeHandle } from 'react';
export default function useFormRef(ref, props) {
  var rootRef = useRef(null);
  var imperativeMethods = props.imperativeMethods;
  useImperativeHandle(ref, function () {
    return _extends({
      root: rootRef.current
    }, imperativeMethods);
  });
  return rootRef;
}