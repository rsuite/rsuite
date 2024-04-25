/**
 * Formats the reference key for a tree node.
 */
export function formatNodeRefKey(value: string | number) {
  return `${typeof value === 'number' ? 'Number_' : 'String_'}${value}`;
}
