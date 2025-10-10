'use client';
import PropTypes from 'prop-types';
var oneOf = function oneOf(arr) {
  var checkType = PropTypes.oneOf(arr);

  // for [storybook/utils/propTypesToArgType.ts]
  checkType._argType_ = {
    type: 'oneOf',
    value: arr
  };
  return checkType;
};
export default oneOf;