/**
 * Processes and returns a value suitable for CSS (with a unit).
 */
export function getCssValue(value?: number | string, unit = 'px') {
  // If the value is a number, append the default unit (defaults to 'px')
  if (typeof value === 'number') {
    return `${value}${unit}`;
  }

  // If the value is already a string (and likely contains a unit), return it as is
  if (typeof value === 'string') {
    return value;
  }
}

type CSSVariables = Partial<Record<`--${string}`, string>>;
type StyleProperties = React.CSSProperties & CSSVariables;

/**
 * Merge multiple style objects, filtering out undefined values
 */
export function mergeStyles(...styles: (React.CSSProperties | undefined)[]): StyleProperties {
  return styles.reduce<StyleProperties>((acc, style) => {
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
