'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useEnsuredRef = useEnsuredRef;
var _react = require("react");
/**
 * Used in forwardRef components to ensure ref exists
 * so that calling ref.current shall not throw error
 *
 * @example
 *
 * const Button = forwardRef((props, ref) => {
 *
 *   // if ref exists, buttonRef = ref
 *   // otherwise buttonRef is a newly created ref
 *   const buttonRef = useEnsuredRef(ref);
 *
 *   useEffect(() => {
 *     // buttonRef will not be null even if ref is null
 *     buttonRef.current.focus();
 *   }, []);
 *
 *   return <button ref={buttonRef} {...props} />;
 * });
 *
 */
function useEnsuredRef(ref) {
  var dumpRef = (0, _react.useRef)();
  if (ref) {
    return ref;
  }
  return dumpRef;
}
var _default = exports.default = useEnsuredRef;