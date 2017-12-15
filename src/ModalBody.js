import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  classPrefix: PropTypes.string
};

const defaultProps = {
  classPrefix: 'modal'
};

class ModalBody extends React.Component {
  render() {
    const { classPrefix, className, ...props } = this.props;
    let classes = classNames(`${classPrefix}-body`, className);
    return (
      <div {...props} className={classes} />
    );
  }
}

ModalBody.propTypes = propTypes;
ModalBody.defaultProps = defaultProps;
ModalBody.displayName = 'ModalBody';


export default ModalBody;
