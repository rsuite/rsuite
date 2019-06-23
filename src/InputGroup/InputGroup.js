// @flow

import * as React from 'react';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';
import compose from 'recompose/compose';
import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';
import { prefix, withStyleProps, defaultProps, createContext } from './utils';

export const InputGroupContext = createContext(null);

type Props = {
  className?: string,
  classPrefix: string,
  inside?: boolean,
  disabled?: boolean,
  children?: React.Node
};

type State = {
  focus?: boolean
};

class InputGroup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      focus: false
    };
  }

  handleFocus = () => {
    this.setState({ focus: true });
  };

  handleBlur = () => {
    this.setState({ focus: false });
  };

  disabledChildren() {
    const { children } = this.props;
    return React.Children.map(children, item => {
      if (React.isValidElement(item)) {
        return React.cloneElement(item, { disabled: true });
      }
      return item;
    });
  }

  render() {
    const { className, classPrefix, disabled, inside, children, ...props } = this.props;
    const { focus } = this.state;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('inside')]: inside,
      [addPrefix('focus')]: focus,
      [addPrefix('disabled')]: disabled
    });

    return (
      <InputGroupContext.Provider
        value={{
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }}
      >
        <div {...props} className={classes}>
          {disabled ? this.disabledChildren() : children}
        </div>
      </InputGroupContext.Provider>
    );
  }
}

const EnhancedInputGroup = compose(
  withStyleProps({
    hasSize: true
  }),
  defaultProps({
    classPrefix: 'input-group'
  })
)(InputGroup);

setStatic('Addon', InputGroupAddon)(EnhancedInputGroup);
setStatic('Button', InputGroupButton)(EnhancedInputGroup);

export default EnhancedInputGroup;
