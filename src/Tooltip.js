import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  positionLeft: PropTypes.number,
  positionTop: PropTypes.number,
  prefixClass: PropTypes.string,
  arrowOffsetLeft: PropTypes.number,
  arrowOffsetTop: PropTypes.number
};

const defaultProps = {
  placement: 'right',
  prefixClass: 'tooltip'
};

class Tooltip extends React.Component {
  render() {
    let {
      placement,
      className,
      positionLeft,
      arrowOffsetLeft,
      arrowOffsetTop,
      positionTop,
      prefixClass,
      children,
      style,
      ...props
    } = this.props;

    const classes = classNames('tooltip', {
      [placement]: true
    }, className);

    const styles = {
      left: positionLeft,
      top: positionTop,
      ...style
    };

    const arrowStyle = {
      left: arrowOffsetLeft,
      top: arrowOffsetTop
    };

    return (
      <div
        {...props}
        role="tooltip"
        className={classes}
        style={styles}
      >
        <div className={`${prefixClass}-arrow`} style={arrowStyle} />
        <div className={`${prefixClass}-inner`}>
          {children}
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
