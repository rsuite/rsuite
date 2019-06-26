import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';

import {
  ReactChildren,
  defaultProps,
  getUnhandledProps,
  prefix,
  createChainedFunction
} from '../utils';

import { RadioGroupProps } from './RadioGroup.d';

interface RadioGroupState {
  value: any;
}

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
    itemChecked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { onChange } = this.props;
    this.setState({ value: nextValue });
    onChange && onChange(nextValue, event);
  };

  render() {
    const { className, inline, name, children, classPrefix, appearance, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(appearance), className, {
      [addPrefix('inline')]: inline
    });
    const nextValue = this.getValue();
    const items = ReactChildren.mapCloneElement(children, child => {
      if (child.type.displayName === 'Radio') {
        return {
          inline,
          name,
          checked: shallowEqual(nextValue, child.props.value),
          onChange: createChainedFunction(this.handleChange, child.props.onChange)
        };
      }
      return child.props;
    });

    const unhandled = getUnhandledProps(RadioGroup, rest);

    return (
      <div {...unhandled} className={classes} role="button">
        {items}
      </div>
    );
  }
}

export default defaultProps<RadioGroupProps>({
  classPrefix: 'radio-group'
})(RadioGroup);
