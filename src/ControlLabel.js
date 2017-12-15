// @flow

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import get from 'lodash/get';

type Props = {
  className?: string,
  htmlFor?: string,
  srOnly?: boolean
}

class ControlLabel extends React.Component<Props> {

  static contextTypes = {
    formGroup: PropTypes.object
  }

  render() {
    const controlId = get(this.context, 'formGroup.controlId');
    const {
      htmlFor = controlId,
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

export default ControlLabel;
