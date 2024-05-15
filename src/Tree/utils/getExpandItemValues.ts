interface ExpandOptions<T> {
  node: Record<string, unknown>;
  isExpand: boolean;
  expandItemValues: T[];
  valueKey: string;
}

/**
 * Returns an array of expanded item values.
 */
export function getExpandItemValues<T>({
  node,
  isExpand,
  expandItemValues,
  valueKey
}: ExpandOptions<T>): T[] {
  const newExpandItemValues = new Set<T>(expandItemValues);
  if (isExpand) {
    newExpandItemValues.add(node[valueKey] as T);
  } else {
    newExpandItemValues.delete(node[valueKey] as T);
  }
  return Array.from(newExpandItemValues);
}
