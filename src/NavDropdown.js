import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dropdown from './Dropdown';

const propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool
};

class NavDropdown extends React.Component {
  getMountNode() {
    return this.mountNode;
  }
  render() {
    const { className, active, disabled, ...props } = this.props;
    const classes = classNames('nav-dropdown', {
      active,
      disabled
    }, className);

    return (
      <Dropdown
        {...props}
        componentClass="li"
        useAnchor
        className={classes}
        disabled={disabled}
        ref={(ref) => {
          this.mountNode = ref;
        }}
      />
    );
  }
}

NavDropdown.propTypes = propTypes;

export default NavDropdown;
