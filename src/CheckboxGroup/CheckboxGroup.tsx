import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import shallowEqual from '../utils/shallowEqual';

import { getUnhandledProps, defaultProps, prefix, createContext } from '../utils';
import { CheckboxGroupProps, CheckboxContextProps } from './CheckboxGroup.d';

interface State {
  value: any[];
}

export const CheckboxContext = createContext<CheckboxContextProps>({});

class CheckboxGroup extends React.Component<CheckboxGroupProps, State> {
  static propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    inline: PropTypes.bool,
    value: PropTypes.array,
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    children: PropTypes.array,
    classPrefix: PropTypes.string
  };
  constructor(props: CheckboxGroupProps) {
    super(props);
    this.state = {
      value: props.defaultValue || []
    };
  }

  getValue() {
    const { value } = this.props;
    return _.isUndefined(value) ? this.state.value : value;
  }

  getContextProps = (): CheckboxContextProps => {
    const { inline, name, value } = this.props;

    return {
      inline,
      name,
      value: this.getValue(),
      controlled: !_.isUndefined(value),
      onChange: this.handleChange
    };
  };

  handleChange = (
    itemValue: any,
    itemChecked: boolean,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    const nextValue = _.cloneDeep(this.getValue()) || [];

    if (itemChecked) {
      nextValue.push(itemValue);
    } else {
      _.remove(nextValue, i => shallowEqual(i, itemValue));
    }

    this.setState({ value: nextValue });
    this.props.onChange?.(nextValue, event);
  };

  render() {
    const { className, inline, children, classPrefix, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('inline')]: inline
    });

    const unhandled = getUnhandledProps(CheckboxGroup, props);

    return (
      <CheckboxContext.Provider value={this.getContextProps()}>
        <div {...unhandled} role="group" className={classes}>
          {children}
        </div>
      </CheckboxContext.Provider>
    );
  }
}

export default defaultProps<CheckboxGroupProps>({
  classPrefix: 'checkbox-group'
})(CheckboxGroup);
