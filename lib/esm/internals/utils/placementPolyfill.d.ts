/**
 * Replaces the placement string with its polyfilled counterpart based on the given RTL (Right-to-Left) value.
 * @example
 * ```
 * placementPolyfill('bottomLeft');
 * // 'bottomStart'
 * ```
 */
export declare function placementPolyfill<T = string>(placement: T, rtl?: boolean): T;
export default placementPolyfill;
