import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';

import {
  ReactChildren,
  getUnhandledProps,
  defaultProps,
  prefix,
  createChainedFunction
} from '../utils';

import { CheckboxGroupProps } from './CheckboxGroup.d';

type State = {
  value: any[];
};

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

  handleChange = (
    itemValue: any,
    itemChecked: boolean,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    const nextValue = _.cloneDeep(this.getValue()) || [];
    const { onChange } = this.props;

    if (itemChecked) {
      nextValue.push(itemValue);
    } else {
      _.remove(nextValue, i => shallowEqual(i, itemValue));
    }

    this.setState({ value: nextValue });
    onChange && onChange(nextValue, event);
  };

  render() {
    const { className, inline, name, value, children, classPrefix, ...props } = this.props;
    const nextValue = this.getValue() || [];
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('inline')]: inline
    });
    const checkedKey = _.isUndefined(value) ? 'defaultChecked' : 'checked';

    const items = ReactChildren.mapCloneElement(children, child => {
      if (child.type.displayName === 'Checkbox') {
        return {
          ...child.props,
          name,
          inline,
          [checkedKey]: nextValue.some(i => i === child.props.value),
          onChange: createChainedFunction(this.handleChange, child.props.onChange)
        };
      }
      return child.props;
    });

    const unhandled = getUnhandledProps(CheckboxGroup, props);

    return (
      <div {...unhandled} role="group" className={classes}>
        {items}
      </div>
    );
  }
}

export default defaultProps<CheckboxGroupProps>({
  classPrefix: 'checkbox-group'
})(CheckboxGroup);
