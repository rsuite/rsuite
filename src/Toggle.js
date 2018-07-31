// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import compose from 'recompose/compose';

import { prefix, withStyleProps, defaultProps, getUnhandledProps } from './utils';

type Props = {
  disabled?: boolean,
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: (checked: boolean, event: SyntheticEvent<*>) => void,
  checkedChildren?: React.Node,
  unCheckedChildren?: React.Node,
  classPrefix: string,
  className?: string
};

type State = {
  checked?: boolean
};

class Toggle extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { checked, defaultChecked } = props;
    this.state = {
      checked: _.isUndefined(checked) ? defaultChecked : checked
    };
  }

  getCheckedStatus() {
    const { checked } = this.props;
    return _.isUndefined(checked) ? this.state.checked : checked;
  }

  handleChange = (event: SyntheticEvent<*>) => {
    const { onChange, disabled } = this.props;
    const checked = !this.state.checked;

    if (disabled) {
      return;
    }

    this.setState({ checked }, () => {
      onChange && onChange(checked, event);
    });
  };

  render() {
    const {
      disabled,
      className,
      onChange,
      checkedChildren,
      unCheckedChildren,
      classPrefix,
      ...rest
    } = this.props;

    const checked = this.getCheckedStatus();
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('checked')]: checked,
      [addPrefix('disabled')]: disabled
    });

    const inner = checked ? checkedChildren : unCheckedChildren;
    const unhandled = getUnhandledProps(Toggle, rest);

    return (
      <span
        {...unhandled}
        className={classes}
        role="button"
        tabIndex={-1}
        onClick={this.handleChange}
      >
        <span className={addPrefix('inner')}>{inner}</span>
      </span>
    );
  }
}

export default compose(
  withStyleProps({
    hasSize: true
  }),
  defaultProps({
    classPrefix: 'btn-toggle'
  })
)(Toggle);
