import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { defaultProps, getUnhandledProps, prefix, createContext } from '../utils';
import { RadioGroupProps, RadioContextProps } from './RadioGroup.d';

interface RadioGroupState {
  value: any;
}

export const RadioContext = createContext<RadioContextProps>({});

class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'picker']),
    name: PropTypes.string,
    inline: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func
  };
  static defaultProps = {
    appearance: 'default'
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  getValue() {
    const { value } = this.props;
    return _.isUndefined(value) ? this.state.value : value;
  }

  handleChange = (
    nextValue: any,
    _itemChecked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ value: nextValue });
    this.props.onChange?.(nextValue, event);
  };

  getContextProps = (): RadioContextProps => {
    const { inline, name } = this.props;
    const value = this.getValue();

    return {
      inline,
      name,
      value: _.isUndefined(value) ? null : value,
      onChange: this.handleChange
    };
  };

  render() {
    const { className, inline, children, classPrefix, appearance, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(appearance), className, {
      [addPrefix('inline')]: inline
    });

    const unhandled = getUnhandledProps(RadioGroup, rest);

    return (
      <RadioContext.Provider value={this.getContextProps()}>
        <div {...unhandled} className={classes} role="button">
          {children}
        </div>
      </RadioContext.Provider>
    );
  }
}

export default defaultProps<RadioGroupProps>({
  classPrefix: 'radio-group'
})(RadioGroup);
