// Ref: https://github.com/thefrontside/deprecated-prop-type/blob/master/deprecated.js
import * as PropTypes from 'prop-types';
import warnOnce from './warnOnce';

export default function deprecatePropType<T extends PropTypes.Validator<any>>(
  propType: T,
  explanation?: string
): typeof propType {
  return function validate(props, propName, componentName, ...rest) {
    // Note ...rest here
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      warnOnce(message);
    }

    return propType(props, propName, componentName, ...rest); // and here
  } as T;
}
