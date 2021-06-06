import { useRef } from 'react';

/**
 * Useful in forwardRef components
 *
 * @example
 *
 * const Button = forwardRef((props, ref) => {
 *
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
export default function useEnsuredRef(ref) {
  const dumpRef = useRef();

  if (ref) {
    return ref;
  }

  return dumpRef;
}
