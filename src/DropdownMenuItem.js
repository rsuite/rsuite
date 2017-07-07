import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import elementType from 'rsuite-utils/lib/propTypes/elementType';

const propTypes = {
  divider: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  onKeyDown: PropTypes.func,
  eventKey: PropTypes.any,
  componentClass: elementType
};

const defaultProps = {
  componentClass: 'a',
  active: false,
  disabled: false,
  divider: false,
  onSelect: null,
  onKeyDown: null,
  eventKey: null
};

class DropdownMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let { onSelect, eventKey, disabled } = this.props;
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (onSelect) {
      onSelect(eventKey, this.props, event);
    }
  }

  render() {

    let {
      children,
      divider,
      onSelect,
      onKeyDown,
      active,
      disabled,
      componentClass: Component,
      ...props
    } = this.props;

    let classes = classNames({
      active,
      disabled
    });

    if (divider) {
      return <li role="separator" className="divider" />;
    }

    return (
      <li role="presentation" className={classes} >
        <Component
          {...props}
          role="menu"
          tabIndex="-1"
          onClick={this.handleClick}
        >
          {children}
        </Component>
      </li>
    );
  }
}

DropdownMenuItem.propTypes = propTypes;
DropdownMenuItem.defaultProps = defaultProps;

export default DropdownMenuItem;
