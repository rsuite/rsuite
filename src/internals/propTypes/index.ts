import PropTypes from 'prop-types';

export { default as oneOf } from './oneOf';
export { default as deprecatePropType, deprecatePropTypeNew } from './deprecatePropType';

export function tupleType<T>(...typeCheckers) {
  return PropTypes.arrayOf(function (value, index, ...rest) {
    return typeCheckers[index].call(PropTypes, value, index, ...rest);
  }) as unknown as PropTypes.Requireable<T>;
}

export const refType = PropTypes.oneOfType([PropTypes.func, PropTypes.any]);
