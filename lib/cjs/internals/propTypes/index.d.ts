import PropTypes from 'prop-types';
export { default as oneOf } from './oneOf';
export { default as deprecatePropType, deprecatePropTypeNew } from './deprecatePropType';
export declare function tupleType<T>(...typeCheckers: any[]): PropTypes.Requireable<T>;
export declare const refType: PropTypes.Requireable<any>;
