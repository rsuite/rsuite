import React from 'react';
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
export declare function useEnsuredRef<T = undefined>(ref: any): React.MutableRefObject<T | undefined>;
export default useEnsuredRef;
