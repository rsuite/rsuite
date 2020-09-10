import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';

import { prefix, withStyleProps, defaultProps, getUnhandledProps } from '../utils';
import { ToggleProps } from './Toggle.d';

interface ToggleState {
  checked?: boolean;
}

class Toggle extends React.Component<ToggleProps, ToggleState> {
  static propTypes = {
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    checkedChildren: PropTypes.node,
    unCheckedChildren: PropTypes.node,
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      checked: props.defaultChecked
    };
  }

  getCheckedStatus() {
    const { checked } = this.props;
    return typeof checked === 'undefined' ? this.state.checked : checked;
  }

  handleChange = (event: React.MouseEvent<any>) => {
    const { onChange, disabled } = this.props;
    const checked = !this.getCheckedStatus();

    if (disabled) {
      return;
    }

    this.setState({ checked });
    onChange?.(checked, event);
  };

  render() {
    const {
      disabled,
      className,
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
        aria-pressed={checked}
        aria-disabled={disabled}
        aria-label={typeof inner === 'string' ? inner : null}
        role="button"
        tabIndex={-1}
        onClick={this.handleChange}
      >
        <span className={addPrefix('inner')}>{inner}</span>
      </span>
    );
  }
}

export default compose<any, ToggleProps>(
  withStyleProps<ToggleProps>({
    hasSize: true
  }),
  defaultProps<ToggleProps>({
    classPrefix: 'btn-toggle'
  })
)(Toggle);
