/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import compose from 'recompose/compose';

import { withStyleProps, defaultProps, prefix } from './utils';

type Props = {
  controlId?: string,
  isValid?: boolean,
  className?: string,
  classPrefix: string,
  validationState?: 'success' | 'warning' | 'error'
};

class FormGroup extends React.Component<Props> {
  static childContextTypes = {
    formGroup: PropTypes.object.isRequired
  };

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
    const { validationState, className, controlId, isValid, classPrefix, ...props } = this.props;

    const addPrefix = prefix(classPrefix);

    const classes = classNames(
      classPrefix,
      {
        [addPrefix('has-success')]: !validationState && isValid,
        [addPrefix('has-error')]: !validationState && isValid === false,
        [addPrefix(`has-${validationState || ''}`)]: !_.isUndefined(validationState)
      },
      className
    );

    return <div {...props} className={classes} role="group" />;
  }
}

export default compose(
  withStyleProps({
    hasSize: true
  }),
  defaultProps({
    classPrefix: 'form-group'
  })
)(FormGroup);
