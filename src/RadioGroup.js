// @flow

import * as React from 'react';
import isUndefined from 'lodash/isUndefined';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { mapCloneElement } from './utils/ReactChildren';
import { globalKey } from './utils/prefix';


type Props = {
  name?: string,
  inline?: boolean,
  value?: any,
  defaultValue?: any,
  className?: string,
  classPrefix?: string,
  children?: React.Node,
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void,
};

type States = {
  value: any
}

class RadioGroup extends React.Component<Props, States> {

  static defaultProps = {
    classPrefix: `${globalKey}radio-group`
  };

  state = {
    value: null
  };

  componentWillMount() {
    const { value, defaultValue } = this.props;
    this.setState({
      value: value || defaultValue
    });
  }

  handleChange = (nextValue: any, event: SyntheticInputEvent<*>) => {

    const { onChange } = this.props;
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
      classPrefix,
      onChange,
      ...props
    } = this.props;

    const clesses = classNames(classPrefix, className);
    const nextValue = isUndefined(value) ? this.state.value : value;
    const items = mapCloneElement(children, (child) => {
      if (child.type.displayName === 'Radio') {
        return {
          inline,
          name,
          checked: isEqual(nextValue, child.props.value),
          onChange: this.handleChange
        };
      }
      return child.props;
    });

    return (
      <div
        {...props}
        className={clesses}
        role="button"
      >
        {items}
      </div>
    );
  }
}

export default RadioGroup;
