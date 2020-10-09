import PropTypes from 'prop-types';

const ANONYMOUS = '';

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;

    if (props[propName] == null) {
      if (isRequired) {
        if (props[propName] === null) {
          return new Error(
            'The ' +
              location +
              ' `' +
              propFullName +
              '` is marked as required ' +
              ('in `' + componentName + '`, but its value is `null`.')
          );
        }
        return new Error(
          'The ' +
            location +
            ' `' +
            propFullName +
            '` is marked as required in ' +
            ('`' + componentName + '`, but its value is `undefined`.')
        );
      }
      return null;
    } else {
      return validate(props, propName, componentName, location, propFullName, secret);
    }
  }

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

export function tupleType(...types) {
  return createChainableTypeChecker(
    (props, propName, componentName, location, propFullName, secret) => {
      const value = props[propName];
      if (!location) {
        location = 'prop';
      }
      if (!propFullName) {
        propFullName = propName;
      }

      if (!Array.isArray(value)) {
        return new Error(
          `Invalid ${location} \`${propFullName}\` supplied to \`${componentName}\`, expected ${types.length}-element array`
        );
      }

      if (value.length === 0) {
        return null;
      }

      if (value.length !== types.length) {
        return new Error(
          `Invalid ${location} \`${propFullName}\` supplied to \`${componentName}\`, expected ${types.length}-element array, got array of length ${value.length}`
        );
      }
      for (let i = 0; i < value.length; ++i) {
        const error = types[i](value, i, componentName, 'element', `${propFullName}[${i}]`, secret);
        if (error) {
          return error;
        }
      }

      return null;
    }
  );
}

export const refType = PropTypes.oneOfType([PropTypes.func, PropTypes.any]);
