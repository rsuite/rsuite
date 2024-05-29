import useMediaQuery, { Query } from '../useMediaQuery';

interface UseBreakpointValueOptions<T = any> {
  /**
   * The default value to return if no screen size matches.
   */
  defaultValue: T;
}

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
export function useBreakpointValue<T = any>(
  breakpoints: Record<Query, T>,
  options?: UseBreakpointValueOptions<T>
) {
  const { defaultValue } = options || {};
  const keys = Object.keys(breakpoints);
  const values = Object.values(breakpoints);
  const matches = useMediaQuery(keys);

  const index = matches.indexOf(true);

  return index !== -1 ? values[index] : defaultValue;
}

export default useBreakpointValue;
