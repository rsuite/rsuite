/**
 * Returns an array indicating the hierarchy path from root towards `target` item
 */
export function getPathTowardsItem<T>(
  target: T | undefined,
  getParent: (item: T) => T | undefined
) {
  if (!target) return [];

  const path = [target];
  for (let parent = getParent(target); parent; parent = getParent(parent)) {
    path.unshift(parent);
  }

  return path;
}
