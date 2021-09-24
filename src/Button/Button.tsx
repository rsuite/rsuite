import React from 'react';
import PropTypes from 'prop-types';
import SafeAnchor from '../SafeAnchor';
import Ripple from '../Ripple';
import { isOneOf, useClassNames } from '../utils';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface ButtonProps extends WithAsProps, React.HTMLAttributes<HTMLElement> {
  /** A button can have different appearances. */
  appearance?: TypeAttributes.Appearance;

  /** A button can show it is currently the active user selection */
  active?: boolean;

  /** A button can have different sizes */
  size?: TypeAttributes.Size;

  /** A button can have different colors */
  color?: TypeAttributes.Color;

  /** Format button to appear inside a content bloc */
  block?: boolean;

  /** Providing a `href` will render an `<a>` element, _styled_ as a button */
  href?: string;

  /** Where to display the linked URL */
  target?: string;

  /** A button can show a loading indicator */
  loading?: boolean;

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** Ripple after button click */
  ripple?: boolean;

  /** Defines HTML button type attribute */
  type?: 'button' | 'reset' | 'submit';
}

const defaultProps: Partial<ButtonProps> = {
  appearance: 'default',
  classPrefix: 'btn',
  ripple: true
};

const Button: RsRefForwardingComponent<'button', ButtonProps> = React.forwardRef(
  (props: ButtonProps, ref) => {
    const {
      as,
      active,
      appearance,
      block,
      className,
      children,
      classPrefix,
      color,
      disabled,
      loading,
      ripple,
      size,
      type: typeProp,
      ...rest
    } = props;

    const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix(appearance, color, size, { active, disabled, loading, block })
    );

    const rippleElement = ripple && !isOneOf(appearance, ['link', 'ghost']) ? <Ripple /> : null;
    const spin = <span className={prefix`spin`} />;

    if (rest.href) {
      return (
        <SafeAnchor
          {...rest}
          as={as}
          ref={ref}
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

    const Component = as || 'button';
    const type = typeProp || (Component === 'button' ? 'button' : undefined);
    const role = rest.role || (Component !== 'button' ? 'button' : undefined);

    return (
      <Component
        {...rest}
        role={role}
        type={type}
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        className={classes}
      >
        {loading && spin}
        {children}
        {rippleElement}
      </Component>
    );
  }
);

Button.displayName = 'Button';
Button.defaultProps = defaultProps;
Button.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  appearance: PropTypes.oneOf(['default', 'primary', 'link', 'subtle', 'ghost']),
  block: PropTypes.bool,
  children: PropTypes.node,
  color: PropTypes.oneOf(['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']),
  disabled: PropTypes.bool,
  href: PropTypes.string,
  loading: PropTypes.bool,
  ripple: PropTypes.bool,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
};

export default Button;
