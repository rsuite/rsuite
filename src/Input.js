/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import _ from 'lodash';

import { withStyleProps, defaultProps, createChainedFunction } from './utils';
import { globalKey } from './utils/prefix';

type Props = {
  type: string,
  componentClass: React.ElementType,
  id?: string,
  classPrefix: string,
  className?: string,
  disabled?: boolean,
  value?: string | number,
  defaultValue?: string | number,
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (event: SyntheticEvent<*>) => void,
  onBlur?: (event: SyntheticEvent<*>) => void
};

class Input extends React.Component<Props> {
  static defaultProps = {
    type: 'text'
  };

  static contextTypes = {
    formGroup: PropTypes.object,
    inputGroup: PropTypes.object
  };

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const nextValue = event.target.value;
    onChange && onChange(nextValue, event);
  };

  render() {
    const controlId = _.get(this.context, 'formGroup.controlId');
    const {
      type,
      className,
      classPrefix,
      componentClass,
      onChange,
      id = controlId,
      onFocus,
      onBlur,
      disabled,
      value,
      defaultValue,
      ...rest
    } = this.props;

    const classes = classNames(classPrefix, className, {
      // input[type="file"] should not have .form-control.
      [`${globalKey}form-control`]: type !== 'file'
    });

    const { inputGroup } = this.context;
    const Component = componentClass;

    return (
      <Component
        {...rest}
        type={type}
        id={id}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onFocus={createChainedFunction(onFocus, _.get(inputGroup, 'onFocus'))}
        onBlur={createChainedFunction(onBlur, _.get(inputGroup, 'onBlur'))}
        className={classes}
        onChange={this.handleChange}
      />
    );
  }
}

export default compose(
  withStyleProps({
    hasSize: true
  }),
  defaultProps({
    classPrefix: 'input',
    componentClass: 'input'
  })
)(Input);
