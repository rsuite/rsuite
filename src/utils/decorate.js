import PropTypes from 'prop-types';

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

export function getClassNames(props) {

  const { prefixClass, size, shape } = props;
  const classes = {
    [`${prefixClass}`]: true,
  };

  if (props.size) {
    classes[`${prefixClass}-${size}`] = true;
  }

  if (props.shape) {
    classes[`${prefixClass}-${shape}`] = true;
  }

  return classes;
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
      propTypes.size = PropTypes.oneOf(Object.values(SIZES));
      defaultProps.size = null;
    } else if (typeof size === 'object') {
      propTypes.size = PropTypes.oneOf(size.oneOf);
      defaultProps.size = size.default;
    }

    if (shape === true) {
      propTypes.shape = PropTypes.oneOf(Object.values(STYLES));
      defaultProps.shape = STYLES.DEFAULT;
    } else if (typeof shape === 'object') {
      propTypes.shape = PropTypes.oneOf(shape.oneOf);
      defaultProps.shape = shape.default;
    }

    return Component;
  };
}
