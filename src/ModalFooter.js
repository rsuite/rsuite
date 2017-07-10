import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';


const propTypes = {
  prefixClass: PropTypes.string
};

const defaultProps = {
  prefixClass: 'modal'
};

class ModalFooter extends React.Component {
  render() {
    const { prefixClass, className, ...props } = this.props;
    let classes = classNames(`${prefixClass}-footer`, className);
    return (
      <div
        {...props}
        className={classes}
      />
    );
  }
}

ModalFooter.propTypes = propTypes;
ModalFooter.defaultProps = defaultProps;

export default ModalFooter;
