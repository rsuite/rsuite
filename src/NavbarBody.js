// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';


type Props = {
  classPrefix?: string,
  className?: string,
  children?: React.Node
}

class NavbarBody extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}navbar-body`
  };

  render() {
    const {
      children,
      classPrefix,
      className,
      ...props
    } = this.props;

    const classes = classNames(classPrefix, className);

    return (
      <div
        {...props}
        className={classes}
      >
        {children}
      </div>
    );
  }
}

export default NavbarBody;
