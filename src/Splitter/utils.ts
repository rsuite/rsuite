export interface PanelLimits {
  min: number;
  max: number;
  resizable: boolean;
}

const EPSILON = 0.000001;

export function sameSizes(first: number[], second: number[]) {
  return (
    first.length === second.length &&
    first.every((size, index) => Math.abs(size - second[index]) < EPSILON)
  );
}

export function normalizeSizes(sizes: number[] | undefined, count: number) {
  if (!count) return [];

  const valid = sizes?.length === count && sizes.every(size => Number.isFinite(size) && size >= 0);
  const values = valid ? sizes! : Array(count).fill(1);
  const total = values.reduce((sum, size) => sum + size, 0);

  if (Math.abs(total - 100) < EPSILON) return values.slice();

  return total > 0 ? values.map(size => (size / total) * 100) : Array(count).fill(100 / count);
}

export function validLimits(limits: PanelLimits[]) {
  return (
    limits.every(
      ({ min, max }) =>
        Number.isFinite(min) && Number.isFinite(max) && min >= 0 && max <= 100 && min <= max
    ) &&
    limits.reduce((sum, panel) => sum + panel.min, 0) <= 100 + EPSILON &&
    limits.reduce((sum, panel) => sum + panel.max, 0) >= 100 - EPSILON
  );
}

export function initialSizes(sizes: number[] | undefined, limits: PanelLimits[]) {
  const values = normalizeSizes(sizes, limits.length);
  if (!limits.length || !validLimits(limits)) return values;

  const result = values.map((size, index) =>
    Math.max(limits[index].min, Math.min(limits[index].max, size))
  );

  // Distribute only the initial layout; interactions always change one adjacent pair.
  for (let iteration = 0; iteration < limits.length; iteration++) {
    const remainder = 100 - result.reduce((sum, size) => sum + size, 0);
    if (Math.abs(remainder) < EPSILON) break;
    const available = limits.map((panel, index) =>
      remainder > 0 ? panel.max - result[index] : result[index] - panel.min
    );
    const count = available.filter(capacity => capacity > EPSILON).length;
    if (!count) break;
    result.forEach((size, index) => {
      if (available[index] > EPSILON) {
        result[index] =
          size + Math.sign(remainder) * Math.min(available[index], Math.abs(remainder) / count);
      }
    });
  }

  return result;
}

export function resizeBounds(sizes: number[], limits: PanelLimits[], index: number) {
  const total = sizes[index] + sizes[index + 1];
  return {
    min: Math.max(limits[index].min, total - limits[index + 1].max),
    max: Math.min(limits[index].max, total - limits[index + 1].min)
  };
}

export function resizePair(
  sizes: number[],
  limits: PanelLimits[],
  index: number,
  nextSize: number
) {
  const { min, max } = resizeBounds(sizes, limits, index);
  const next = Math.max(min, Math.min(max, nextSize));
  const result = sizes.slice();
  result[index] = next;
  result[index + 1] = sizes[index] + sizes[index + 1] - next;
  return result;
}

export function validSizes(sizes: number[], limits: PanelLimits[]) {
  return sizes.every(
    (size, index) => size >= limits[index].min - EPSILON && size <= limits[index].max + EPSILON
  );
}
