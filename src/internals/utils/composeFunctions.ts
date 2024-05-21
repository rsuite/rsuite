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
export function composeFunctions(...fns: any[]) {
  return (first: any) => fns.reduce((previousValue, fn) => fn(previousValue), first);
}

export default composeFunctions;
