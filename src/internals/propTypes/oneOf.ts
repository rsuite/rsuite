import PropTypes from 'prop-types';

const oneOf = (arr => {
  const checkType = PropTypes.oneOf(arr);

  // for [storybook/utils/propTypesToArgType.ts]
  (checkType as any)._argType_ = {
    type: 'oneOf',
    value: arr
  };
  return checkType;
}) as typeof PropTypes.oneOf;

export default oneOf;
