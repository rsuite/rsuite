import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import decorate, { getClassNames } from './utils/decorate';

const propTypes = {
  prefixClass: PropTypes.string,
  dialogClassName: PropTypes.string
};

const defaultProps = {
  prefixClass: 'modal',
  dialogClassName: null
};

class ModalDialog extends React.Component {
  render() {

    const {
      className,
      style,
      children,
      dialogClassName,
      prefixClass,
      ...props
    } = this.props;

    const modalStyle = {
      display: 'block',
      ...style
    };

    const modalClasses = classNames(prefixClass, className);
    const dialogClasses = classNames({
      ...getClassNames(this.props),
      [prefixClass]: false,
    }, `${prefixClass}-dialog`, dialogClassName);

    return (
      <div
        title={null}
        role="dialog"
        style={modalStyle}
        className={modalClasses}
        {...props}
      >
        <div className={dialogClasses}>
          <div className={`${prefixClass}-content`} role="document">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

ModalDialog.propTypes = propTypes;
ModalDialog.defaultProps = defaultProps;

export default decorate({
  size: true
})(ModalDialog);
