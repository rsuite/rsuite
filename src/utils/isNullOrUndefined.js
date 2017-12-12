/* @flow */

import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';

export default function isNullOrUndefined(value: any): boolean {
  return isNull(value) || isUndefined(value);
}
