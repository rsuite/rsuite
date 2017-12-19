// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';

type Props = {
  className?: string,
  classPrefix?: string,
  children?: React.Node
}

class ModalTitle extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}modal-title`
  }
  render() {
    const { className, classPrefix, children, ...props } = this.props;
    const classes = classNames(classPrefix, className);
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
