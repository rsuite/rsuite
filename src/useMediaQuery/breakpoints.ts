import type {
  BreakpointMap,
  BreakpointEntry,
  BreakpointConditions,
  BreakpointSystem,
  MediaQueryMap
} from './types';

/**
 * Capitalize the first letter of a string
 */
const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Adjust max-width value to avoid breakpoint overlapping
 */
function adjustMaxWidth(value: string): string {
  // Extract numeric part and unit
  const match = value.match(/^([\d.]+)(\w+)$/);
  if (!match) return value;

  const [, numStr, unit] = match;
  const num = parseFloat(numStr);

  // If value is 0, don't adjust
  if (num === 0) return value;

  // Subtract a small value to avoid overlap
  const adjustedNum = num - 0.01;
  return `${adjustedNum}${unit}`;
}

/**
 * Create media query string
 */
function createMediaQuery(options: { min?: string | undefined; max?: string | undefined }): string {
  const { min, max } = options;

  if (!min && !max) return '';

  const conditions: string[] = [];
  if (min) conditions.push(`(min-width: ${min})`);
  if (max) conditions.push(`(max-width: ${max})`);

  return conditions.join(' and ');
}

/**
 * Create traditional media query map compatible with previous versions
 */
function createLegacyMediaQueryMap(breakpoints: BreakpointMap): MediaQueryMap {
  const entries = Object.entries(breakpoints);
  const result: MediaQueryMap = {};

  // Special case for xs
  const xsValue = breakpoints.xs;
  if (xsValue) {
    // For xs, use max-width of the next breakpoint minus 0.01
    const nextBreakpoint = entries.find(([key]) => key === 'sm');
    if (nextBreakpoint) {
      result.xs = `(max-width: ${adjustMaxWidth(nextBreakpoint[1])})`;
    } else {
      result.xs = `(min-width: ${xsValue})`;
    }
  }

  // For all other breakpoints, use min-width
  entries.forEach(([key, value]) => {
    if (key !== 'xs') {
      result[key] = `(min-width: ${value})`;
    }
  });

  return result;
}

/**
 * Create breakpoint system
 *
 * This function takes a breakpoint map and returns an enhanced breakpoint system
 * that provides various media queries for responsive design.
 *
 * @example
 * ```ts
 * const breakpoints = createBreakpoints({
 *   xs: '0px',
 *   sm: '576px',
 *   md: '768px',
 *   lg: '992px',
 *   xl: '1200px'
 * });
 *
 * // Using breakpoints
 * breakpoints.up('md'); // '@media screen and (min-width: 768px)'
 * breakpoints.down('lg'); // '@media screen and (max-width: 991.99px)'
 * breakpoints.between('sm', 'lg'); // '@media screen and (min-width: 576px) and (max-width: 991.99px)'
 * ```
 */
export function createBreakpoints(breakpoints: BreakpointMap): BreakpointSystem {
  // Sort breakpoints by value
  const sortedEntries = Object.entries(breakpoints).sort((a, b) => {
    const valueA = parseInt(a[1].replace(/[^\d]/g, ''), 10);
    const valueB = parseInt(b[1].replace(/[^\d]/g, ''), 10);
    return valueA - valueB;
  });

  // Create breakpoint entries with min and max values
  const breakpointEntries: [string, BreakpointEntry][] = sortedEntries.map(
    ([name, value], index) => {
      let max: string | null = null;

      // If not the last breakpoint, use the next breakpoint's value minus 0.01 as the current max
      if (index < sortedEntries.length - 1) {
        max = adjustMaxWidth(sortedEntries[index + 1][1]);
      }

      return [name, { name, min: value, max }];
    }
  );

  const entries = Object.fromEntries(breakpointEntries) as Record<string, BreakpointEntry>;

  // Get breakpoint entry by name
  function getEntry(name: string): BreakpointEntry {
    return entries[name];
  }

  // Generate all possible breakpoint conditions
  function generateConditions(): BreakpointConditions {
    const conditions: Record<string, string> = {};
    const breakpointNames = Object.keys(entries);

    // Create basic conditions for each breakpoint
    breakpointNames.forEach(name => {
      const entry = getEntry(name);

      // Up condition (min-width)
      conditions[name] = createMediaQuery({
        min: entry.min === null ? undefined : entry.min
      });

      // Down condition (max-width)
      conditions[`${name}Down`] = createMediaQuery({
        max:
          entry.min !== null
            ? entry.min === '0px'
              ? entry.min
              : adjustMaxWidth(entry.min)
            : undefined
      });

      // Only condition (min-width and max-width)
      conditions[`${name}Only`] = createMediaQuery({
        min: entry.min === null ? undefined : entry.min,
        max: entry.max === null ? undefined : entry.max
      });
    });

    // Create range conditions
    for (let i = 0; i < breakpointNames.length; i++) {
      for (let j = i + 1; j < breakpointNames.length; j++) {
        const minName = breakpointNames[i];
        const maxName = breakpointNames[j];
        const minEntry = getEntry(minName);
        const maxEntry = getEntry(maxName);

        conditions[`${minName}To${capitalize(maxName)}`] = createMediaQuery({
          min: minEntry.min === null ? undefined : minEntry.min,
          max:
            maxEntry.min !== null
              ? maxEntry.min === '0px'
                ? maxEntry.min
                : adjustMaxWidth(maxEntry.min)
              : undefined
        });
      }
    }

    return conditions;
  }

  const conditions = generateConditions();

  // Create legacy media query map for backward compatibility
  const legacyMap = createLegacyMediaQueryMap(breakpoints);

  // Get condition by key
  function getCondition(key: string): string {
    return conditions[key] || '';
  }

  // Get all breakpoint keys
  function keys(): string[] {
    return ['base', ...Object.keys(entries)];
  }

  // Create up media query (min-width)
  function up(name: string): string {
    const entry = getEntry(name);
    return createMediaQuery({
      min: entry.min === null ? undefined : entry.min
    });
  }

  // Create down media query (max-width)
  function down(name: string): string {
    const entry = getEntry(name);
    return createMediaQuery({
      max:
        entry.min !== null
          ? entry.min === '0px'
            ? entry.min
            : adjustMaxWidth(entry.min)
          : undefined
    });
  }

  // Create only media query (min-width and max-width)
  function only(name: string): string {
    const entry = getEntry(name);
    return createMediaQuery({
      min: entry.min === null ? undefined : entry.min,
      max: entry.max === null ? undefined : entry.max
    });
  }

  // Create between media query
  function between(minName: string, maxName: string): string {
    const minEntry = getEntry(minName);
    const maxEntry = getEntry(maxName);

    return createMediaQuery({
      min: minEntry.min === null ? undefined : minEntry.min,
      max:
        maxEntry.min !== null
          ? maxEntry.min === '0px'
            ? maxEntry.min
            : adjustMaxWidth(maxEntry.min)
          : undefined
    });
  }

  // Create a combined media query map that merges legacy map with enhanced conditions
  function createMediaQueryMap(): MediaQueryMap {
    // Start with legacy map for backward compatibility
    const mediaQueryMap = { ...legacyMap };

    // Add enhanced conditions, excluding any keys that would override legacy map
    const breakpointKeys = Object.keys(legacyMap);
    Object.entries(conditions).forEach(([key, value]) => {
      if (!breakpointKeys.includes(key)) {
        mediaQueryMap[key] = value;
      }
    });

    return mediaQueryMap;
  }

  return {
    values: Object.values(entries),
    only,
    keys,
    conditions,
    getCondition,
    up,
    down,
    between,
    legacyMap,
    createMediaQueryMap
  };
}
