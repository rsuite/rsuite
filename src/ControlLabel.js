// @flow

import * as React from 'react';
import classNames from 'classnames';
import { defaultProps } from './utils';
import { FormGroupContext } from './FormGroup';

type Props = {
  className?: string,
  htmlFor?: string,
  classPrefix?: string,
  srOnly?: boolean
};

class ControlLabel extends React.Component<Props> {
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

export default defaultProps({
  classPrefix: 'control-label'
})(ControlLabel);
