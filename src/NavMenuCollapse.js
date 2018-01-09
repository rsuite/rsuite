// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string
}

class NavMenuCollapse extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}nav-menu-collapse`
  };

  render() {
    const {
      classPrefix,
      className,
      ...props
    } = this.props;

    const classes = classNames(classPrefix, className);

    return (
      <div
        {...props}
        className={classes}
      />
    );
  }
}

export default NavMenuCollapse;
