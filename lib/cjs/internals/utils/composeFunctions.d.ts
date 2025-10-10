/**
 * Composes multiple functions into a single function.
 *
 * @example
 * ```
 * const a = () => console.log('a');
 * const b = () => console.log('b');
 * const c = () => console.log('c');
 *
 * const d = composeFunctions(a, b, c);
 *
 * d(); // a b c
 * ```
 */
export declare function composeFunctions(...fns: any[]): (first: any) => any;
export default composeFunctions;
