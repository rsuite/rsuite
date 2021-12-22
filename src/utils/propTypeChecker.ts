import PropTypes from 'prop-types';

export function tupleType<T>(...typeCheckers) {
  return PropTypes.arrayOf(function (value, index, ...rest) {
    return typeCheckers[index].call(PropTypes, value, index, ...rest);
  }) as unknown as PropTypes.Requireable<T>;
}

export const refType = PropTypes.oneOfType([PropTypes.func, PropTypes.any]);
