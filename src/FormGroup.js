/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';
import withStyleProps from './utils/withStyleProps';

type Props = {
  controlId?: string,
  isValid?: boolean,
  className?: string,
  classPrefix?: string,
  validationState?: 'success' | 'warning' | 'error'
}


class FormGroup extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'form-group',
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
      ...props
    } = this.props;


    const classes = classNames({
      'has-success': !validationState && isValid,
      'has-error': !validationState && isValid === false,
      [`has-${validationState || ''}`]: !isUndefined(validationState)
    }, className);

    return (
      <div
        {...omit(props, ['classPrefix'])}
        className={classes}
        role="group"
      />
    );
  }

}

export default withStyleProps({
  hasSize: true
})(FormGroup);

