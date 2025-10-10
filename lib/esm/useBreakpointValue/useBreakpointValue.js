'use client';
import useMediaQuery from "../useMediaQuery/index.js";
/**
 * A React Hook that returns different values based on different screen sizes in responsive design.
 * @version 5.63.0
 * @unstable Please note that this API is not stable and may change in the future.
 * @see https://rsuitejs.com/components/use-breakpoint-value
 *
 * @example
 * ```ts
 * const fontSize = useBreakpointValue({ sm: "14px", lg: "24px" }, { defaultValue: "16px" });
 * const direction = useBreakpointValue({ sm: 'row' }, { defaultValue:'column' });
 * ```
 *
 */
export function useBreakpointValue(breakpoints, options) {
  var _ref = options || {},
    defaultValue = _ref.defaultValue;
  var keys = Object.keys(breakpoints);
  var values = Object.values(breakpoints);
  var matches = useMediaQuery(keys);
  var index = matches.indexOf(true);
  return index !== -1 ? values[index] : defaultValue;
}
export default useBreakpointValue;