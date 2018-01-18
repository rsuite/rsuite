/* @flow */

import _ from 'lodash';

export default function isNullOrUndefined(value: any): boolean {
  return _.isNull(value) || _.isUndefined(value);
}
