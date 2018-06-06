/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';
import SafeAnchor from './SafeAnchor';

import { withStyleProps, prefix, getUnhandledProps, defaultProps } from './utils';

export type Props = {
  appearance: 'default' | 'primary' | 'link' | 'subtle' | 'ghost',
  classPrefix: string,
  componentClass: React.ElementType,
  className?: string,
  active?: boolean,
  block?: boolean,
  href?: string,
  loading?: boolean,
  disabled?: boolean,
  children?: React.Node
};

class Button extends React.Component<Props> {
  static defaultProps = {
    appearance: 'default'
  };

  render() {
    const {
      href,
      active,
      disabled,
      loading,
      block,
      className,
      classPrefix,
      appearance,
      children,
      componentClass: Component,
      ...props
    } = this.props;

    const unhandled = getUnhandledProps(Button, props);
    const addPrefix: Function = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(appearance), className, {
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled,
      [addPrefix('loading')]: loading,
      [addPrefix('block')]: block
    });

    const spin = <span className={addPrefix('spin')} />;

    if (href) {
      return (
        <SafeAnchor {...unhandled} role="button" href={href} className={classes}>
          {loading && spin}
          {children}
        </SafeAnchor>
      );
    }

    if (Component === 'button') {
      unhandled.type = unhandled.type || 'button';
    }

    return (
      <Component {...unhandled} disabled={disabled} className={classes}>
        {loading && spin}
        {children}
      </Component>
    );
  }
}

export default compose(
  withStyleProps({
    hasSize: true,
    hasColor: true
  }),
  defaultProps({
    classPrefix: 'btn',
    componentClass: 'button'
  })
)(Button);
