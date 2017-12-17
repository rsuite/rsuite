// @flow

import * as React from 'react';
import classNames from 'classnames';
import prefix from './utils/prefix';

type Props = {
  className?: string,
  classPrefix?: string,
  children?: React.Node
}

class ModalTitle extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'modal'
  }
  render() {
    const { className, classPrefix, children, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(addPrefix('title'), className);
    return (
      <h4
        {...props}
        className={classes}
      >
        {children}
      </h4>
    );
  }
}

export default ModalTitle;
