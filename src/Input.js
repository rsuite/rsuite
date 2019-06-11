/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';
import _ from 'lodash';

import { withStyleProps, defaultProps, createChainedFunction, getUnhandledProps } from './utils';
import { FormPlaintextContext } from './FormContext';
import { FormGroupContext } from './FormGroup';
import { InputGroupContext } from './InputGroup';

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
  static contextType = InputGroupContext;
  static defaultProps = {
    type: 'text'
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
    const {
      type,
      className,
      classPrefix,
      componentClass: Component,
      onFocus,
      onBlur,
      disabled,
      value,
      defaultValue,
      inputRef,
      id,
      ...rest
    } = this.props;

    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(Input, rest);
    const plaintextInput = (
      <div {...unhandled} className={classes}>
        {_.isUndefined(value) ? defaultValue : value}
      </div>
    );

    const input = (
      <FormGroupContext.Consumer>
        {controlId => (
          <Component
            {...unhandled}
            ref={inputRef}
            type={type}
            id={id || controlId}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            onKeyDown={this.handleKeyDown}
            onFocus={createChainedFunction(onFocus, _.get(this.context, 'onFocus'))}
            onBlur={createChainedFunction(onBlur, _.get(this.context, 'onBlur'))}
            className={classes}
            onChange={this.handleChange}
          />
        )}
      </FormGroupContext.Consumer>
    );

    return (
      <FormPlaintextContext.Consumer>
        {plaintext => (plaintext ? plaintextInput : input)}
      </FormPlaintextContext.Consumer>
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
