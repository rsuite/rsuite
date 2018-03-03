// @flow

import * as React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { defaultProps } from './utils';

type Props = {
  className?: string,
  htmlFor?: string,
  classPrefix?: string,
  srOnly?: boolean
};

class ControlLabel extends React.Component<Props> {
  static contextTypes = {
    formGroup: PropTypes.object
  };

  render() {
    const controlId = _.get(this.context, 'formGroup.controlId');
    const { htmlFor = controlId, srOnly, className, classPrefix, ...rest } = this.props;

    const classes = classNames(
      classPrefix,
      {
        'sr-only': srOnly
      },
      className
    );

    return <label {...rest} htmlFor={htmlFor} className={classes} />;
  }
}

export default defaultProps({
  classPrefix: 'control-label'
})(ControlLabel);
