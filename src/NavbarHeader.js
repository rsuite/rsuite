
// @flow

import * as React from 'react';
import classNames from 'classnames';
import prefix from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string
}

class NavbarHeader extends React.Component<Props> {

  static defaultProps = {
    classPrefix: 'navbar'
  };

  render() {
    const {
      className,
      classPrefix,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(addPrefix('header'), className);

    return (
      <div {...props} className={classes} />
    );
  }
}

export default NavbarHeader;
