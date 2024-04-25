import intersection from 'lodash/intersection';

/**
 * Determines whether a node should be shown based on the expanded state of its parent nodes.
 */
export function shouldShowNodeByParentExpanded<T>(
  expandItemValues: T[] = [],
  parentKeys: T[] = []
) {
  const intersectionKeys = intersection(expandItemValues, parentKeys);
  if (intersectionKeys.length === parentKeys.length) {
    return true;
  }
  return false;
}
