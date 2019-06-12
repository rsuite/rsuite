/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import compose from 'recompose/compose';
import { withStyleProps, defaultProps, prefix, createContext } from './utils';

export const FormGroupContext = createContext(null);

type Props = {
  controlId?: string,
  isValid?: boolean,
  className?: string,
  classPrefix: string,
  validationState?: 'success' | 'warning' | 'error'
};

class FormGroup extends React.Component<Props> {
  render() {
    const { controlId, validationState, className, isValid, classPrefix, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);

    const classes = classNames(classPrefix, className, {
      [addPrefix('has-success')]: !validationState && isValid,
      [addPrefix('has-error')]: !validationState && isValid === false,
      [addPrefix(`has-${validationState || ''}`)]: !_.isUndefined(validationState)
    });

    return (
      <FormGroupContext.Provider value={controlId}>
        <div {...rest} className={classes} role="group" />
      </FormGroupContext.Provider>
    );
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
