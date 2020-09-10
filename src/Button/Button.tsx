import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import SafeAnchor from '../SafeAnchor';
import Ripple from '../Ripple';

import { withStyleProps, getUnhandledProps, defaultProps, prefix, isOneOf } from '../utils';
import { ButtonProps } from './Button.d';

class Button extends React.Component<ButtonProps> {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'primary', 'link', 'subtle', 'ghost']),
    active: PropTypes.bool,
    componentClass: PropTypes.elementType,
    children: PropTypes.node,
    block: PropTypes.bool,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    ripple: PropTypes.bool
  };

  static defaultProps = {
    appearance: 'default',
    ripple: true
  };

  render() {
    const {
      active,
      disabled,
      loading,
      block,
      className,
      classPrefix,
      appearance,
      children,
      ripple,
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

    const rippleElement = ripple && !isOneOf(appearance, ['link', 'ghost']) ? <Ripple /> : null;
    const spin = <span className={addPrefix('spin')} />;

    if (Component === 'button') {
      if (unhandled.href) {
        return (
          <SafeAnchor
            {...unhandled}
            aria-disabled={disabled}
            disabled={disabled}
            className={classes}
          >
            {loading && spin}
            {children}
            {rippleElement}
          </SafeAnchor>
        );
      }
      unhandled.type = unhandled.type || 'button';
    }

    return (
      <Component {...unhandled} disabled={disabled} className={classes}>
        {loading && spin}
        {children}
        {rippleElement}
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
