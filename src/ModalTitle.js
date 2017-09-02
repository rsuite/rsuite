import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  prefixClass: PropTypes.string
};

const defaultProps = {
  prefixClass: 'modal'
};

class ModalTitle extends React.Component {
  render() {
    const { className, prefixClass, children, ...props } = this.props;
    const classes = classNames(`${prefixClass}-title`, className);
    return (
      <h4
        {...props}
        className={classes}
      >
        {children}
      </h4>
    );
  }
}

ModalTitle.propTypes = propTypes;
ModalTitle.defaultProps = defaultProps;

export default ModalTitle;
