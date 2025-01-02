/**
 * Processes and returns a value suitable for CSS (with a unit).
 */
export function getCssValue(value?: number | string | null, unit = 'px') {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  // If the value is 0, return it as a string without unit
  if (value === 0) {
    return '0';
  }

  // If the value is a number, append the default unit (defaults to 'px')
  if (typeof value === 'number') {
    return `${value}${unit}`;
  }

  // Return string values as is
  return value.toString();
}

type CSSVariables = Partial<Record<`--${string}`, string>>;
type StyleProperties = React.CSSProperties & CSSVariables;

/**
 * Merge multiple style objects, filtering out undefined values
 */
export function mergeStyles(
  ...styles: (React.CSSProperties | undefined | null)[]
): StyleProperties {
  return styles.filter(Boolean).reduce<StyleProperties>((acc, style) => {
    if (!style) return acc;
    return { ...acc, ...style };
  }, {});
}

/**
 * Create CSS variables for offset positioning
 */
export function createOffsetStyles(
  offset?: [number | string, number | string],
  prefix = '--rs-offset'
): React.CSSProperties | undefined {
  if (!offset) return undefined;

  const [x, y] = offset;
  return {
    [`${prefix}-x`]: getCssValue(x),
    [`${prefix}-y`]: getCssValue(y)
  };
}
