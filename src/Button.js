import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import elementType from 'rsuite-utils/lib/propTypes/elementType';
import SafeAnchor from './SafeAnchor';
import decorate, { STATE, STYLES, getClassNames } from './utils/decorate';

const propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  href: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  componentClass: elementType,
  prefixClass: PropTypes.string
};

const defaultProps = {
  prefixClass: 'btn',
  href: null,
  componentClass: 'button',
  className: null,
  active: false,
  type: 'button',
  disabled: false,
  block: false
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
    const { componentClass, prefixClass, active, block, ...elementProps } = this.props;

    return (
      <SafeAnchor
        {...elementProps}
        className={this.getClassNames()}
      />
    );

  }

  renderButton() {
    const { componentClass, prefixClass, active, block, ...elementProps } = this.props;
    const Component = componentClass || 'button';

    return (
      <Component
        {...elementProps}
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
    oneOf: [...Object.values(STATE), ...Object.values(STYLES)],
    default: STATE.default
  }
})(Button);
