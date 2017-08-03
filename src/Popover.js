import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  prefixClass: PropTypes.string,
  title: PropTypes.node
};

const defaultProps = {
  prefixClass: 'popover',
  placement: 'right'
};

class Popover extends React.Component {
  render() {
    const {
      prefixClass,
      title,
      children,
      style,
      placement,
      className,
      ...props
    } = this.props;
    const classes = classNames('popover', {
      [placement]: true
    }, className);

    const styles = {
      display: 'block',
      ...style
    };

    return (
      <div
        {...props}
        className={classes}
        style={styles}
      >
        <div className="arrow" />
        {
          title ? (
            <h3 className={`${prefixClass}-title`}>
              {title}
            </h3>
          ) : null
        }
        <div className={`${prefixClass}-content`}>
          {children}
        </div>
      </div>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
