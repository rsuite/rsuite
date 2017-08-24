import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import elementType from 'rsuite-utils/lib/propTypes/elementType';
import createChainedFunction from './utils/createChainedFunction';
import SafeAnchor from './SafeAnchor';

const propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,
  eventKey: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  componentClass: elementType,
};

const defaultProps = {
  href: '',
  active: false,
  disabled: false,
  componentClass: SafeAnchor,
  onClick: undefined,
  onSelect: undefined,
  eventKey: undefined

};

class NavItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { onSelect, disabled, eventKey } = this.props;
    if (onSelect && !disabled) {
      onSelect(eventKey, event);
    }
  }

  render() {
    const {
      active,
      disabled,
      onClick,
      className,
      style,
      eventKey,
      children,
      componentClass: Component,
      ...props
    } = this.props;

    const classes = classNames({
      active,
      disabled
    }, className);

    return (
      <li
        role="presentation"
        className={classes}
        style={style}
      >
        <Component
          {...props}
          disabled={disabled}
          onClick={createChainedFunction(onClick, this.handleClick)}
        >
          {children}
        </Component>
      </li>
    );
  }
}

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;
NavItem.displayName = 'NavItem';

export default NavItem;
