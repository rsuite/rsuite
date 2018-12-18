// @flow

import * as React from 'react';
import classNames from 'classnames';

import Ripple from '../Ripple';
import { prefix, getUnhandledProps, defaultProps } from '../utils';

type Props = {
  classPrefix?: string,
  hasValue?: boolean,
  cleanable?: boolean,
  className?: string,
  children?: React.Node,
  caret?: boolean,
  componentClass: React.ElementType,
  onClean?: (event: SyntheticEvent<*>) => void,
  active?: boolean
};

type State = {
  active?: boolean
};

class PickerToggle extends React.Component<Props, State> {
  static defaultProps = {
    componentClass: 'a',
    caret: true
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      active: false
    };
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleClean = (event: SyntheticEvent<*>) => {
    const { onClean } = this.props;
    onClean && onClean(event);
    event.stopPropagation();
    this.handleBlur();
  };

  handleFocus = () => {
    this.setState({ active: true });
  };

  handleBlur = () => {
    this.setState({ active: false });
  };

  onFocus = () => {
    if (this.toggle && typeof this.toggle.focus === 'function') {
      this.toggle.focus();
    }
  };

  renderToggleClean() {
    return (
      <span
        className={this.addPrefix('clean')}
        role="button"
        tabIndex="-1"
        onClick={this.handleClean}
      >
        ✕
      </span>
    );
  }

  toggle = null;
  bindToggleRef = (ref: React.ElementRef<*>) => {
    this.toggle = ref;
  };

  render() {
    const {
      componentClass: Component,
      children,
      className,
      hasValue,
      cleanable,
      classPrefix,
      caret,
      active,
      ...rest
    } = this.props;

    const defaultClassName = Component === 'a' ? classPrefix : this.addPrefix('custom');
    const classes = classNames(defaultClassName, className, {
      active: active || this.state.active
    });
    const unhandled = getUnhandledProps(PickerToggle, rest);

    return (
      <Component
        {...unhandled}
        role="combobox"
        tabIndex="0"
        className={classes}
        ref={this.bindToggleRef}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <span className={this.addPrefix(hasValue ? 'value' : 'placeholder')}>{children}</span>
        {hasValue && cleanable && this.renderToggleClean()}
        {caret && <span className={this.addPrefix('caret')} />}
        <Ripple />
      </Component>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'picker-toggle'
});

export default enhance(PickerToggle);
