import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import decorate, { getClassNames } from './utils/decorate';


const propTypes = {
  prefixClass: PropTypes.string,
  controlId: PropTypes.string,
  isValid: PropTypes.bool,
  validationState: PropTypes.oneOf(['success', 'warning', 'error'])
};

const defaultProps = {
  prefixClass: 'form-group',
  controlId: undefined,
  isValid: undefined,
  validationState: undefined
};

const childContextTypes = {
  formGroup: PropTypes.object.isRequired
};

class FormGroup extends React.Component {
  getChildContext() {
    const { controlId, validationState } = this.props;
    return {
      formGroup: {
        controlId,
        validationState
      }
    };
  }

  render() {

    const {
      validationState,
      className,
      controlId,
      prefixClass,
      isValid,
      ...props
    } = this.props;

    const classes = classNames({
      ...getClassNames(this.props),
      [`has-${validationState}`]: !!validationState,
      'has-success': !validationState && isValid,
      'has-error': !validationState && isValid === false,
    }, className);

    return (
      <div
        {...props}
        className={classes}
        role="group"
      />
    );
  }

}

FormGroup.propTypes = propTypes;
FormGroup.defaultProps = defaultProps;
FormGroup.childContextTypes = childContextTypes;

export default decorate({
  size: true
})(FormGroup);

