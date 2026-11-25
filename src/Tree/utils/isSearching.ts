import isEmpty from 'lodash/isEmpty';
export function isSearching(searchKeyword?: string) {
  return !isEmpty(searchKeyword);
}
