import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import _ from 'lodash';

import {
  withStyleProps,
  defaultProps,
  createChainedFunction,
  getUnhandledProps,
  refType
} from '../utils';
import { FormPlaintextContext } from '../Form/FormContext';
import { FormGroupContext } from '../FormGroup/FormGroup';
import { InputGroupContext } from '../InputGroup/InputGroup';
import { InputProps } from './Input.d';

class Input extends React.Component<InputProps> {
  static contextType = InputGroupContext;
  static propTypes = {
    type: PropTypes.string,
    componentClass: PropTypes.elementType,
    id: PropTypes.string,
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inputRef: refType,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onPressEnter: PropTypes.func
  };
  static defaultProps = {
    type: 'text'
  };

  handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const nextValue = _.get(event, 'target.value');
    this.props.onChange?.(nextValue, event);
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      this.props.onPressEnter?.(event);
    }
    this.props.onKeyDown?.(event);
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

export default compose<any, InputProps>(
  withStyleProps<InputProps>({
    hasSize: true
  }),
  defaultProps<InputProps>({
    classPrefix: 'input',
    componentClass: 'input'
  })
)(Input);
