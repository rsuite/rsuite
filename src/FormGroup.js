/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import withStyleProps from './utils/withStyleProps';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  controlId?: string,
  isValid?: boolean,
  className?: string,
  classPrefix: string,
  validationState?: 'success' | 'warning' | 'error'
}


class FormGroup extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}form-group`,
  };

  static childContextTypes = {
    formGroup: PropTypes.object.isRequired
  }

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
      isValid,
      classPrefix,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);

    const classes = classNames(classPrefix, {
      [addPrefix('has-success')]: !validationState && isValid,
      [addPrefix('has-error')]: !validationState && isValid === false,
      [addPrefix(`has-${validationState || ''}`)]: !isUndefined(validationState)
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

export default withStyleProps({
  hasSize: true
})(FormGroup);

