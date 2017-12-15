import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';


const propTypes = {
  classPrefix: PropTypes.string
};

const defaultProps = {
  classPrefix: 'modal'
};

class ModalFooter extends React.Component {
  render() {
    const { classPrefix, className, ...props } = this.props;
    let classes = classNames(`${classPrefix}-footer`, className);
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
