/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import _ from 'lodash';

import { withStyleProps, defaultProps, createChainedFunction, getUnhandledProps } from './utils';

type Props = {
  type: string,
  componentClass: React.ElementType,
  id?: string,
  classPrefix: string,
  className?: string,
  disabled?: boolean,
  value?: string | number,
  defaultValue?: string | number,
  inputRef?: React.ElementRef<*>,
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (event: SyntheticEvent<*>) => void,
  onBlur?: (event: SyntheticEvent<*>) => void,
  onKeyDown?: (event: SyntheticEvent<*>) => void,
  onPressEnter?: (event: SyntheticEvent<*>) => void
};

class Input extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'input',
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

  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    const { onKeyDown, onPressEnter } = this.props;

    if (event.keyCode === 13) {
      onPressEnter && onPressEnter(event);
    }

    onKeyDown && onKeyDown(event);
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
      inputRef,
      ...rest
    } = this.props;

    const classes = classNames(classPrefix, className);
    const { inputGroup } = this.context;
    const Component = componentClass;
    const unhandled = getUnhandledProps(Input, rest);

    return (
      <Component
        {...unhandled}
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onKeyDown={this.handleKeyDown}
        onFocus={createChainedFunction(onFocus, _.get(inputGroup, 'onFocus'))}
        onBlur={createChainedFunction(onBlur, _.get(inputGroup, 'onBlur'))}
        className={classes}
        onChange={this.handleChange}
      />
    );
  }
}

export default compose(
  defaultProps({
    classPrefix: 'input',
    componentClass: 'input'
  }),
  withStyleProps({
    hasSize: true
  })
)(Input);
