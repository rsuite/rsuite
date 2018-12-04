// @flow
import * as React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';

import { ReactChildren, getUnhandledProps, defaultProps } from './utils';

type Props = {
  name?: string,
  className?: string,
  inline?: boolean,
  value?: any[],
  defaultValue?: any[],
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void,
  children?: React.ChildrenArray<any>,
  classPrefix?: string
};

type State = {
  value: any[]
};

class CheckboxGroup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.defaultValue || []
    };
  }

  getValue() {
    const { value } = this.props;
    return _.isUndefined(value) ? this.state.value : value;
  }

  handleChange = (itemValue: any, itemChecked: boolean, event: SyntheticInputEvent<*>) => {
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
    const {
      className,
      inline,
      name,
      value,
      children,
      onChange,
      classPrefix,
      ...props
    } = this.props;

    const nextValue = this.getValue() || [];
    const classes: string = classNames(classPrefix, className);
    const checkedKey = _.isUndefined(value) ? 'defaultChecked' : 'checked';

    const items: React.Node = ReactChildren.mapCloneElement(children, child => {
      if (child.type.displayName === 'Checkbox') {
        return {
          ...child.props,
          name,
          inline,
          [checkedKey]: nextValue.some(i => i === child.props.value),
          onChange: this.handleChange
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

export default defaultProps({
  classPrefix: 'checkbox-group'
})(CheckboxGroup);
