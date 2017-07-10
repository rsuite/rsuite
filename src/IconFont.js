import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import elementType from 'rsuite-utils/lib/propTypes/elementType';

const propTypes = {
  prefixClass: PropTypes.string,
  componentClass: elementType,
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
  flip: PropTypes.oneOf(['horizontal', 'vertical']),
  stack: PropTypes.oneOf(['1x', '2x']),
  rotate: PropTypes.number,
  fixedWidth: PropTypes.bool,
  spin: PropTypes.bool,
  pulse: PropTypes.bool,
};

const defaultProps = {
  componentClass: 'i',
  prefixClass: 'icon',
  size: null,
  flip: null,
  rotate: null,
  stack: null,
  fixedWidth: false,
  spin: false,
  pulse: false
};

class IconFont extends React.Component {
  render() {
    const {
      componentClass: Component,
      className,
      prefixClass,
      icon,
      size,
      fixedWidth,
      spin,
      pulse,
      rotate,
      flip,
      stack,
      ...props
    } = this.props;

    const classes = classNames(
      `${prefixClass}`,
      `${prefixClass}-${icon}`, {
        [`${prefixClass}-${size}`]: size,
        [`${prefixClass}-fw`]: fixedWidth,
        [`${prefixClass}-spin`]: spin,
        [`${prefixClass}-pulse`]: pulse,
        [`${prefixClass}-flip-${flip}`]: flip,
        [`${prefixClass}-rotate-${rotate}`]: rotate,
        [`${prefixClass}-stack-${stack}`]: stack
      }, className);

    return (
      <Component {...props} className={classes} />
    );
  }
}

IconFont.propTypes = propTypes;
IconFont.defaultProps = defaultProps;

export default IconFont;
