// @flow

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { globalKey } from './utils/prefix';

type Props = {
  className?: string,
  htmlFor?: string,
  classPrefix?: string,
  srOnly?: boolean
}

class ControlLabel extends React.Component<Props> {

  static contextTypes = {
    formGroup: PropTypes.object
  }

  static defaultProps = {
    classPrefix: `${globalKey}control-label`
  };

  render() {
    const controlId = get(this.context, 'formGroup.controlId');
    const {
      htmlFor = controlId,
      srOnly,
      className,
      classPrefix,
      ...props,
    } = this.props;

    const classes = classNames(classPrefix, {
      'sr-only': srOnly,
    }, className);

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
