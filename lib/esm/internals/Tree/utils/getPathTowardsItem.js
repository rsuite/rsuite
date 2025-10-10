'use client';
/**
 * Returns an array indicating the hierarchy path from root towards `target` item
 */
export function getPathTowardsItem(target, getParent) {
  if (!target) return [];
  var path = [target];
  for (var parent = getParent(target); !!parent; parent = getParent(parent)) {
    path.unshift(parent);
  }
  return path;
}