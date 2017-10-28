import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'rsuite-utils/lib/propTypes/elementType';

function isTrivialHref(href) {
  return !href || href.trim() === '#';
}

const propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  role: PropTypes.string,
  componentClass: elementType,
  style: PropTypes.object,      // eslint-disable-line react/forbid-prop-types
  tabIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
};

const defaultProps = {
  href: null,
  onClick: null,
  role: null,
  tabIndex: null,
  style: null,
  componentClass: 'a',
  disabled: false
};

class SafeAnchor extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let { disabled, href, onClick } = this.props;
    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }

  }

  render() {

    let {
      componentClass: Component,
      role,
      tabIndex,
      disabled,
      style,
      ...props
    } = this.props;

    if (isTrivialHref(props.href)) {
      props.role = props.role || 'button';
    }

    if (disabled) {
      tabIndex = -1;
    }

    return (
      <Component
        {...props}
        role={role}
        style={style}
        tabIndex={tabIndex}
        onClick={this.handleClick}
      />
    );
  }
}

SafeAnchor.propTypes = propTypes;
SafeAnchor.defaultProps = defaultProps;

export default SafeAnchor;
