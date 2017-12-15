import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  classPrefix: PropTypes.string
};

const defaultProps = {
  classPrefix: 'modal'
};

class ModalTitle extends React.Component {
  render() {
    const { className, classPrefix, children, ...props } = this.props;
    const classes = classNames(`${classPrefix}-title`, className);
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
