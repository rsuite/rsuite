// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string
}

class ModalBody extends React.Component<Props> {

  static displayName = 'ModalBody';
  static defaultProps = {
    classPrefix: `${globalKey}modal-body`
  };
  render() {
    const { classPrefix, className, ...props } = this.props;
    const classes = classNames(classPrefix, className);

    return (
      <div {...props} className={classes} />
    );
  }
}

export default ModalBody;
