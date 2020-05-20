import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';
import { FormGroupContext } from '../FormGroup/FormGroup';

import { ControlLabelProps } from './ControlLabel.d';

class ControlLabel extends React.Component<ControlLabelProps> {
  static propTypes = {
    className: PropTypes.string,
    htmlFor: PropTypes.string,
    classPrefix: PropTypes.string,
    srOnly: PropTypes.bool
  };
  render() {
    const { srOnly, htmlFor, className, classPrefix, ...rest } = this.props;
    const classes = classNames(classPrefix, className, {
      'sr-only': srOnly
    });

    return (
      <FormGroupContext.Consumer>
        {controlId => <label {...rest} htmlFor={htmlFor || controlId} className={classes} />}
      </FormGroupContext.Consumer>
    );
  }
}

export default defaultProps<ControlLabelProps>({
  classPrefix: 'control-label'
})(ControlLabel);
