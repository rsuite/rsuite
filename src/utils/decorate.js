import PropTypes from 'prop-types';
import values from 'lodash/values';

export const SIZES = {
  LARGE: 'lg',
  MEDIUM: 'md',
  SMALL: 'sm',
  XSMALL: 'xs'
};

export const STATE = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info'
};

export const STYLES = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  LINK: 'link',
  INVERSE: 'inverse'
};

export function getClassNames(props, prefixClass) {

  const { size, shape, prefixClass: className } = props;
  let pre = prefixClass || className;

  pre = pre ? `${pre}-` : '';

  return {
    [`${className}`]: !!className,
    [`${pre}${size}`]: !!size,
    [`${pre}${shape}`]: !!shape
  };
}

export function getProps(props) {
  const elementProps = {};
  Object.entries(props).forEach(([propName, propValue]) => {
    elementProps[propName] = propValue;
  });
  return elementProps;
}


export default function decorate(skin = {
  size: null,
  shape: null
}) {
  return (Component) => {
    const { size, shape } = skin;
    let propTypes = Component.propTypes || (Component.propTypes = {});
    let defaultProps = Component.defaultProps || (Component.defaultProps = {});

    if (size === true) {
      propTypes.size = PropTypes.oneOf(values(SIZES));
      defaultProps.size = null;
    } else if (typeof size === 'object') {
      propTypes.size = PropTypes.oneOf(size.oneOf);
      defaultProps.size = size.default;
    }

    if (shape === true) {
      propTypes.shape = PropTypes.oneOf([...values(STATE), ...values(STYLES)]);
      defaultProps.shape = STYLES.DEFAULT;
    } else if (typeof shape === 'object') {
      propTypes.shape = PropTypes.oneOf(shape.oneOf);
      defaultProps.shape = shape.default;
    }

    return Component;
  };
}
