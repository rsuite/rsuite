import PropTypes from 'prop-types';

function propTypesToArgTypes(component) {
  const propTypes = component.propTypes;
  const argTypes = {};

  for (const key in propTypes) {
    if (key === 'classPrefix') {
      continue;
    }

    if (propTypes.hasOwnProperty(key)) {
      const propType = propTypes[key];

      switch (propType) {
        case PropTypes.string:
          argTypes[key] = { control: { type: 'text' } };
          break;
        case PropTypes.number:
          argTypes[key] = { control: { type: 'number' } };
          break;
        case PropTypes.bool:
          argTypes[key] = { control: { type: 'boolean' } };
          break;
      }

      if (typeof propType === 'function') {
        if (propType?._argType_?.type === 'oneOf') {
          argTypes[key] = { control: { type: 'select' }, options: propType._argType_.value };
        }
      }
    }
  }

  return argTypes;
}

export default propTypesToArgTypes;
