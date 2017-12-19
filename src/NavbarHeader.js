
// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string
}

class NavbarHeader extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}navbar-header`
  };

  render() {
    const {
      className,
      classPrefix,
      ...props
    } = this.props;

    const classes = classNames(classPrefix, className);

    return (
      <div {...props} className={classes} />
    );
  }
}

export default NavbarHeader;
