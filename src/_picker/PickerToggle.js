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
  onClean?: (event: SyntheticEvent<*>) => void
};

class PickerToggle extends React.Component<Props> {
  static defaultProps = {
    componentClass: 'a',
    caret: true
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleClean = (event: SyntheticEvent<*>) => {
    const { onClean } = this.props;
    onClean && onClean(event);
    event.stopPropagation();
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
  render() {
    const {
      componentClass: Component,
      children,
      className,
      hasValue,
      cleanable,
      classPrefix,
      caret,
      ...rest
    } = this.props;

    const defaultClassName = Component === 'a' ? classPrefix : this.addPrefix('custom');
    const classes = classNames(defaultClassName, className);
    const unhandled = getUnhandledProps(PickerToggle, rest);

    return (
      <Component {...unhandled} role="button" tabIndex="-1" className={classes}>
        {hasValue ? (
          <span className={this.addPrefix('value')}>{children}</span>
        ) : (
          <span className={this.addPrefix('placeholder')}>{children}</span>
        )}
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
