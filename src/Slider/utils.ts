export const precisionMath = value => parseFloat(value.toFixed(10));

export function checkValue<T extends number | undefined | null>(
  value: T,
  min: number,
  max: number
) {
  if (typeof value === 'undefined' || value === null) {
    return value;
  }

  if (typeof value === 'number' && value < min) {
    return min;
  }

  if (typeof value === 'number' && value > max) {
    return max;
  }

  return value;
}

export function getPosition(e: React.MouseEvent | React.TouchEvent) {
  let event = 'touches' in e ? e.touches[0] : e;

  // For touchend event, we need to use `changedTouches` instead of `touches`
  if (e.type === 'touchend' && 'changedTouches' in e) {
    event = e.changedTouches[0];
  }

  return { pageX: event?.pageX || 0, pageY: event?.pageY || 0 };
}
