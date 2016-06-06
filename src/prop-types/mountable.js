import createChainableTypeChecker from './createChainableTypeChecker';
import { merge } from '../utils/stringFormatter';

/**
 * Checks whether a prop provides a DOM element
 *
 * The element can be provided in two forms:
 * - Directly passed
 * - Or passed an object that has a `render` method
 *
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error|undefined}
 */

function validate(props, propName, componentName) {
    if (typeof props[propName] !== 'object' ||
        typeof props[propName].render !== 'function' && props[propName].nodeType !== 1) {

        return new Error(merge(
            'Invalid prop `{0}` of value `{1}` supplied to `{2}` , expected a DOM element or an object that has a `render` method',
            propName,
            props[propName],
            componentName
        ));
    }
}

export default createChainableTypeChecker(validate);
