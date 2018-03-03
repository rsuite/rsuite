// @flow

import * as React from 'react';
import classNames from 'classnames';
import Navbar from './Navbar';
import { prefix, defaultProps } from './utils';

type Props = {
  children?: React.Node,
  className?: string,
  classPrefix?: string
};

class Header extends React.Component<Props> {
  render() {
    const { children, className, classPrefix, ...props } = this.props;

    const classes = classNames(classPrefix, className);
    const addPrefix = prefix(classPrefix);

    return (
      <Navbar {...props} className={classes}>
        <div className={addPrefix('inner')}>{children}</div>
      </Navbar>
    );
  }
}

export default defaultProps({
  classPrefix: 'header'
})(Header);
