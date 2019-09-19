import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import SafeAnchor from '../SafeAnchor';
import Ripple from '../Ripple';

import { withStyleProps, getUnhandledProps, defaultProps, prefix } from '../utils';
import { ButtonProps } from './Button.d';

class Button extends React.Component<ButtonProps> {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'primary', 'link', 'subtle', 'ghost']),
    active: PropTypes.bool,
    componentClass: PropTypes.elementType,
    children: PropTypes.node,
    block: PropTypes.bool,
    href: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool
  };

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
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(appearance), className, {
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled,
      [addPrefix('loading')]: loading,
      [addPrefix('block')]: block
    });
    const ripple = appearance !== 'link' && appearance !== 'ghost' ? <Ripple /> : null;
    const spin = <span className={addPrefix('spin')} />;

    if (href) {
      return (
        <SafeAnchor
          {...unhandled}
          role="button"
          aria-disabled={disabled}
          href={href}
          className={classes}
        >
          {loading && spin}
          {children}
          {ripple}
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
        {ripple}
      </Component>
    );
  }
}

export default compose<any, ButtonProps>(
  withStyleProps<ButtonProps>({
    hasSize: true,
    hasColor: true
  }),
  defaultProps<ButtonProps>({
    classPrefix: 'btn',
    componentClass: 'button'
  })
)(Button);
