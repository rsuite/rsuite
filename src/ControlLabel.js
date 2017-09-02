import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  htmlFor: PropTypes.string,
  srOnly: PropTypes.bool
};

const defaultProps = {
  htmlFor: undefined,
  srOnly: false
};

const contextTypes = {
  formGroup: PropTypes.object
};

class ControlLabel extends React.Component {
  render() {
    const { formGroup = {} } = this.context;
    const {
      htmlFor = formGroup.controlId,
      srOnly,
      className,
      ...props,
    } = this.props;

    const classes = classNames({
      'sr-only': srOnly,
    }, 'control-label', className);

    return (
      <label
        {...props}
        htmlFor={htmlFor}
        className={classes}
      />
    );
  }
}

ControlLabel.propTypes = propTypes;
ControlLabel.defaultProps = defaultProps;
ControlLabel.contextTypes = contextTypes;

export default ControlLabel;
