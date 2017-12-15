import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  positionLeft: PropTypes.number,
  positionTop: PropTypes.number,
  classPrefix: PropTypes.string,
  arrowOffsetLeft: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  arrowOffsetTop: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
};

const defaultProps = {
  placement: 'right',
  classPrefix: 'tooltip'
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
      classPrefix,
      children,
      style
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
        role="tooltip"
        className={classes}
        style={styles}
      >
        <div className={`${classPrefix}-arrow`} style={arrowStyle} />
        <div className={`${classPrefix}-inner`}>
          {children}
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
