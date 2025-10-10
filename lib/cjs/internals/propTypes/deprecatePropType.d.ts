import * as PropTypes from 'prop-types';
/**
 * Prints deprecation message when user uses a deprecated prop
 *
 * @deprecated Use {@link deprecatePropTypeNew} which prints clearer messages.
 */
export default function deprecatePropType<T extends PropTypes.Validator<any>>(propType: T, explanation?: string): typeof propType;
/**
 * Prints deprecation message when user uses a deprecated prop
 *
 * @example
 *
 *   deprecatePropTypeNew(PropTypes.bool, 'Use Dropdown.Separator component instead.')
 *
 */
export declare function deprecatePropTypeNew<T extends PropTypes.Validator<any>>(propType: T, explanation?: string): typeof propType;
