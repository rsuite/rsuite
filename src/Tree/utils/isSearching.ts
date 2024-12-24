import { isEmpty } from 'lodash-es';

export function isSearching(searchKeyword?: string) {
  return !isEmpty(searchKeyword);
}
