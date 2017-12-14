// @flow

import * as React from 'react';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import remove from 'lodash/remove';
import cloneDeep from 'lodash/cloneDeep';
import classNames from 'classnames';
import { mapCloneElement } from './utils/ReactChildren';

type Props = {
  name?: string,
  className?: string,
  inline?: boolean,
  value?: Array<any>,
  defaultValue?: Array<any>,
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void,
  children?: React.Node,
}

type States = {
  value: Array<any>
}

class CheckboxGroup extends React.Component<Props, States> {

  state = {
    value: []
  };

  componentWillMount() {

    const { value, defaultValue } = this.props;
    this.setState({
      value: value || defaultValue || []
    });

  }
  componentWillReceiveProps(nextProps: Props) {
    if (!isEqual(nextProps.value, this.props.value)) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  checkboxRefs: ?Object = {};

  handleChange = (itemValue: any, itemChecked: boolean, event: SyntheticInputEvent<*>) => {

    const nextValue = cloneDeep(this.state.value);
    const { onChange } = this.props;

    if (itemChecked) {
      nextValue.push(itemValue);
    } else {
      remove(nextValue, i => isEqual(i, itemValue));
    }

    this.setState({ value: nextValue });
    onChange && onChange(nextValue, event);
  }

  render() {

    const {
      className,
      inline,
      name,
      value,
      children
    } = this.props;

    const nextValue: Array<any> = value || this.state.value || [];
    const clesses: string = classNames('checkbox-list', className);
    const checkedKey = isUndefined(value) ? 'defaultChecked' : 'checked';

    const items: React.Node = mapCloneElement(children, (child) => {
      if (child.type.displayName === 'Checkbox') {
        return {
          ...child.props,
          name,
          inline,
          [checkedKey]: nextValue.some(i => i === child.props.value) || false,
          onChange: this.handleChange
        };
      }
      return child.props;

    });

    return (
      <div
        role="group"
        className={clesses}
      >
        {items}
      </div>
    );
  }
}


export default CheckboxGroup;
