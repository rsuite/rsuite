// @flow

import * as React from 'react';
import classNames from 'classnames';
import { prefix, defaultProps } from './utils';

type Props = {
  pullRight?: boolean,
  className?: string,
  classPrefix?: string,
  children?: React.Node
};

class Sidebar extends React.Component<Props> {
  render() {
    const { className, pullRight, children, classPrefix, ...props } = this.props;

    const addPrefix = prefix(classPrefix);
    const wrapperClass = classNames(addPrefix('wrapper'), className);
    const classes = classNames(classPrefix, {
      [addPrefix('right')]: pullRight
    });

    return (
      <div {...props} className={wrapperClass}>
        <div className={classes}>{children}</div>
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'sidebar'
})(Sidebar);
