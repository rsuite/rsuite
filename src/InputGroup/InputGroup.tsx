import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setStatic, compose } from 'recompose';
import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';
import { prefix, withStyleProps, defaultProps, createContext } from '../utils';
import { InputGroupProps } from './InputGroup.d';

export const InputGroupContext = createContext(null);

interface InputGroupState {
  focus?: boolean;
}

class InputGroup extends React.Component<InputGroupProps, InputGroupState> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    inside: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node
  };
  constructor(props) {
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

const EnhancedInputGroup = compose<any, InputGroupProps>(
  withStyleProps<InputGroupProps>({
    hasSize: true
  }),
  defaultProps<InputGroupProps>({
    classPrefix: 'input-group'
  })
)(InputGroup);

setStatic('Addon', InputGroupAddon)(EnhancedInputGroup);
setStatic('Button', InputGroupButton)(EnhancedInputGroup);

export default EnhancedInputGroup;
