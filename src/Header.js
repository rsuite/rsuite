import React from 'react';
import classNames from 'classnames';
import Navbar from './Navbar';

class Header extends React.Component {
  render() {
    const {
      children,
      className,
      ...props
    } = this.props;

    const classes = classNames('header', className);

    return (
      <Navbar
        {...props}
        fixedTop
        className={classes}
      >
        <div className="header-inner">
          {children}
        </div>
      </Navbar>
    );
  }
}

export default Header;
