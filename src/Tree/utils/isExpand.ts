import { isSearching } from './isSearching';

/**
 * Determines whether the tree node should be expanded based on the search keyword and expand flag.
 * If a search keyword is provided, the node is always expanded.
 * Otherwise, the node is expanded if the expand flag is true.
 */
export function isExpand(searchKeyword: string, expand: boolean) {
  return isSearching(searchKeyword) ? true : expand;
}
