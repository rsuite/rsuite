// @flow
import * as React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { mapCloneElement } from './utils/ReactChildren';
import { globalKey } from './utils/prefix';


type Props = {
  name?: string,
  className?: string,
  inline?: boolean,
  value?: Array<any>,
  defaultValue?: Array<any>,
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void,
  children?: React.ChildrenArray<any>,
  classPrefix?: string
}

type States = {
  value: Array<any>
}

class CheckboxGroup extends React.Component<Props, States> {

  static defaultProps = {
    classPrefix: `${globalKey}checkbox-group`
  };

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
    if (!_.isEqual(nextProps.value, this.props.value)) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange = (itemValue: any, itemChecked: boolean, event: SyntheticInputEvent<*>) => {

    const nextValue = _.cloneDeep(this.state.value);
    const { onChange } = this.props;

    if (itemChecked) {
      nextValue.push(itemValue);
    } else {
      _.remove(nextValue, i => _.isEqual(i, itemValue));
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
      children,
      onChange,
      classPrefix,
      ...props
    } = this.props;

    const nextValue: Array<any> = value || this.state.value || [];
    const clesses: string = classNames(classPrefix, className);
    const checkedKey = _.isUndefined(value) ? 'defaultChecked' : 'checked';


    const items: React.Node = mapCloneElement(children, (child) => {
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

    return (
      <div
        {...props}
        role="group"
        className={clesses}
      >
        {items}
      </div>
    );
  }
}


export default CheckboxGroup;
