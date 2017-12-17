// @flow

import * as React from 'react';
import classNames from 'classnames';
import Dropdown from './Dropdown';

type Props = {
  className?: string,
  active?: boolean,
  disabled?: boolean
};

class NavDropdown extends React.Component<Props> {

  getMountNode() {
    return this.mountNode;
  }
  mountNode = null;
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
        className={classes}
        disabled={disabled}
        ref={(ref) => {
          this.mountNode = ref;
        }}
      />
    );
  }
}

export default NavDropdown;
