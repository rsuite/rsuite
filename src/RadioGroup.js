// @flow

import * as React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';

import { ReactChildren, defaultProps, getUnhandledProps, prefix } from './utils';

type Props = {
  appearance: 'default' | 'picker',
  name?: string,
  inline?: boolean,
  value?: any,
  defaultValue?: any,
  className?: string,
  classPrefix?: string,
  children?: React.Node,
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void
};

type State = {
  value: any
};

class RadioGroup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  getValue() {
    const { value } = this.props;
    return _.isUndefined(value) ? this.state.value : value;
  }

  handleChange = (nextValue: any, itemChecked: boolean, event: SyntheticInputEvent<*>) => {
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
          onChange: this.handleChange
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

export default defaultProps({
  appearance: 'default',
  classPrefix: 'radio-group'
})(RadioGroup);
