/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import compose from 'recompose/compose';
import { withStyleProps, defaultProps, prefix, getUnhandledProps } from './utils';

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
    const { validationState, className, isValid, classPrefix, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(FormGroup, rest);

    const classes = classNames(classPrefix, className, {
      [addPrefix('has-success')]: !validationState && isValid,
      [addPrefix('has-error')]: !validationState && isValid === false,
      [addPrefix(`has-${validationState || ''}`)]: !_.isUndefined(validationState)
    });

    return <div {...unhandled} className={classes} role="group" />;
  }
}

export default compose(
  defaultProps({
    classPrefix: 'form-group'
  }),
  withStyleProps({
    hasSize: true
  })
)(FormGroup);
