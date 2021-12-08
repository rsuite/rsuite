import PropTypes, { Requireable, Validator } from 'prop-types';

const ANONYMOUS = '';

function createChainableTypeChecker<T>(validate): Requireable<T> {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
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
      return validate(props, propName, componentName, location, propFullName);
    }
  }

  const chainedCheckType: Requireable<T> = Object.assign(checkType.bind(null, false), {
    isRequired: checkType.bind(null, true)
  });

  return chainedCheckType;
}

type ExtractValue<T extends ReadonlyArray<Validator<any>>> = {
  [K in keyof T]: T[K] extends Validator<infer V> ? V : never;
};

export function tupleType<T extends readonly Validator<any>[]>(
  ...types: T
): Requireable<ExtractValue<T>> {
  return createChainableTypeChecker<ExtractValue<T>>(
    (props, propName, componentName, location, propFullName) => {
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
        const error = types[i](value, String(i), componentName, 'element', `${propFullName}[${i}]`);
        if (error) {
          return error;
        }
      }

      return null;
    }
  );
}

export const refType = PropTypes.oneOfType([PropTypes.func, PropTypes.any]);
