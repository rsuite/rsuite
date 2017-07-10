import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  prefixClass: PropTypes.string
};

const defaultProps = {
  prefixClass: 'modal'
};

class ModalBody extends React.Component {
  render() {
    const { prefixClass, className, ...props } = this.props;
    let classes = classNames(`${prefixClass}-body`, className);
    return (
      <div {...props} className={classes} />
    );
  }
}

ModalBody.propTypes = propTypes;
ModalBody.defaultProps = defaultProps;
ModalBody.displayName = 'ModalBody';


export default ModalBody;
