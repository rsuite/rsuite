// @flow

import * as React from 'react';
import classNames from 'classnames';
import Dropdown from './Dropdown';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  className?: string,
  classPrefix?: string,
  active?: boolean,
  disabled?: boolean
};

class NavDropdown extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}nav-dropdown`
  };

  getMountNode() {
    return this.mountNode;
  }
  mountNode = null;
  render() {
    const { className, classPrefix, active, disabled, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled
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
