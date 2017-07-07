import _ from 'lodash';

export default function isNullOrUndefined(value) {
  return _.isNull(value) || _.isUndefined(value);
}
