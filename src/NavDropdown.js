import React from 'react';
import classNames from 'classnames';
import Dropdown from './Dropdown';

class NavDropdown extends React.Component {
  getMountNode() {
    return this.mountNode;
  }
  render() {
    const { className, ...props } = this.props;
    return (
      <Dropdown
        {...props}
        componentClass="li"
        useAnchor
        className={classNames('nav-dropdown', className)}
        ref={(ref) => {
          this.mountNode = ref;
        }}
      />
    );
  }
}

export default NavDropdown;
