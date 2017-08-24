import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import elementType from 'rsuite-utils/lib/propTypes/elementType';

const propTypes = {
  divider: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  eventKey: PropTypes.any,  // eslint-disable-line react/forbid-prop-types
  componentClass: elementType
};

const defaultProps = {
  componentClass: 'a'
};

class DropdownMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let { onSelect, eventKey, disabled, onClick } = this.props;
    if (disabled) {
      event.preventDefault();
      return;
    }

    onSelect && onSelect(eventKey, this.props, event);
    onClick && onClick(event);
  }

  render() {

    let {
      children,
      divider,
      onSelect,
      active,
      disabled,
      className,
      eventKey,
      componentClass: Component,
      ...props
    } = this.props;

    let classes = classNames({
      active,
      disabled
    }, className);

    if (divider) {
      return <li role="separator" className="divider" />;
    }

    return (
      <li
        {...props}
        role="presentation"
        className={classes}
      >
        <Component
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
