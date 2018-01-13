// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string
}

class SidenavBody extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}sidenav-body`
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

export default SidenavBody;
