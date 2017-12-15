import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  classPrefix: PropTypes.string,
  title: PropTypes.node
};

const defaultProps = {
  classPrefix: 'popover',
  placement: 'right'
};

class Popover extends React.Component {
  render() {
    const {
      classPrefix,
      title,
      children,
      style,
      placement,
      className
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
        className={classes}
        style={styles}
      >
        <div className="arrow" />
        {
          title ? (
            <h3 className={`${classPrefix}-title`}>
              {title}
            </h3>
          ) : null
        }
        <div className={`${classPrefix}-content`}>
          {children}
        </div>
      </div>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
