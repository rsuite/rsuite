// Ref: https://github.com/thefrontside/deprecated-prop-type/blob/master/deprecated.js
import * as PropTypes from 'prop-types';

let warned = {};

export default function deprecatePropType<T extends PropTypes.Validator<any>>(
  propType: T,
  explanation?: string
): typeof propType {
  return function validate(props, propName, componentName, ...rest) {
    // Note ...rest here
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      if (!warned[message]) {
        console.warn(message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName, ...rest); // and here
  } as T;
}

function _resetWarned() {
  warned = {};
}

deprecatePropType._resetWarned = _resetWarned;
