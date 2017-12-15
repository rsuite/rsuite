import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import decorate, { getClassNames } from './utils/decorate';

const propTypes = {
  classPrefix: PropTypes.string,
  dialogClassName: PropTypes.string,
  dialogStyle: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  classPrefix: 'modal'
};

class ModalDialog extends React.Component {
  render() {

    const {
      className,
      style,
      children,
      dialogClassName,
      dialogStyle,
      classPrefix,
      ...props
    } = this.props;

    const modalStyle = {
      display: 'block',
      ...style
    };

    const modalClasses = classNames(classPrefix, className);
    const dialogClasses = classNames({
      ...getClassNames(this.props),
      [classPrefix]: false,
    }, `${classPrefix}-dialog`, dialogClassName);

    return (
      <div
        title={null}
        role="dialog"
        style={modalStyle}
        className={modalClasses}
        {...props}
      >
        <div
          className={dialogClasses}
          style={dialogStyle}
        >
          <div className={`${classPrefix}-content`} role="document">
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
