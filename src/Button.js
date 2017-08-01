import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import elementType from 'rsuite-utils/lib/propTypes/elementType';
import SafeAnchor from './SafeAnchor';
import decorate, { STATE, STYLES, getClassNames } from './utils/decorate';

const propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  href: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  componentClass: elementType,
  prefixClass: PropTypes.string
};

const defaultProps = {
  prefixClass: 'btn',
  href: null,
  componentClass: 'button',
  active: false,
  type: 'button',
  disabled: false,
  block: false,
  shape: 'default'
};

class Button extends React.Component {

  getClassNames() {
    const { active, disabled, block, className, prefixClass } = this.props;
    return classNames({
      ...getClassNames(this.props),
      active,
      disabled,
      [`${prefixClass}-block`]: block
    }, className);
  }

  renderAnchor() {
    const { href, ...props } = this.props;
    const elementProps = _.omit(props, Object.keys(propTypes));
    return (
      <SafeAnchor
        href={href}
        {...elementProps}
        className={this.getClassNames()}
      />
    );
  }

  renderButton() {
    const { componentClass: Component, disabled, type, ...props } = this.props;
    const elementProps = _.omit(props, Object.keys(propTypes));

    return (
      <Component
        {...elementProps}
        type={type}
        disabled={disabled}
        className={this.getClassNames()}
      />
    );
  }

  render() {

    if (this.props.href) {
      return this.renderAnchor();
    }

    return this.renderButton();
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default decorate({
  size: true,
  shape: {
    oneOf: [..._.values(STATE), ..._.values(STYLES)],
    default: STYLES.DEFAULT
  }
})(Button);
