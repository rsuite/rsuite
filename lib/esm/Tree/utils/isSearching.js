'use client';
import isEmpty from 'lodash/isEmpty';
export function isSearching(searchKeyword) {
  return !isEmpty(searchKeyword);
}