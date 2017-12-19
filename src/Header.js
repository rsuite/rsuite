// @flow

import * as React from 'react';
import classNames from 'classnames';
import Navbar from './Navbar';
import prefix, { globalKey } from './utils/prefix';


type Props = {
  children?: React.Node,
  className?: string,
  classPrefix?: string
}

class Header extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}header`,
  };
  render() {
    const {
      children,
      className,
      classPrefix,
      ...props
    } = this.props;

    const classes = classNames(classPrefix, className);
    const addPrefix = prefix(classPrefix);

    return (
      <Navbar
        {...props}
        fixedTop
        className={classes}
      >
        <div className={addPrefix('inner')}>
          {children}
        </div>
      </Navbar>
    );
  }
}

export default Header;
