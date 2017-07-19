import React from 'react';
import classNames from 'classnames';
import Dropdown from './Dropdown';

const NavDropdown = React.createClass({

  getMountNode() {
    return this.mountNode;
  },
  render: function () {
    const { className, ...props } = this.props;
    const classes = classNames({
      'nav-dropdown': true
    }, className);

    return (
      <Dropdown
        {...props}
        ref={ref => this.mountNode = ref}
        componentClass="li"
        useAnchor
        className={classes}
      />
    );
  }
});

export default NavDropdown;
