import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { compose } from 'recompose';
import { withStyleProps, defaultProps, prefix, createContext } from '../utils';
import { FormGroupProps } from './FormGroup.d';

export const FormGroupContext = createContext(null);

class FormGroup extends React.Component<FormGroupProps> {
  static propTypes = {
    controlId: PropTypes.string,
    isValid: PropTypes.bool,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    validationState: PropTypes.oneOf(['success', 'warning', 'error'])
  };
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

export default compose<any, FormGroupProps>(
  withStyleProps<FormGroupProps>({
    hasSize: true
  }),
  defaultProps<FormGroupProps>({
    classPrefix: 'form-group'
  })
)(FormGroup);
