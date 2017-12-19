// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string
}

class ModalFooter extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}modal-footer`
  };

  render() {
    const { classPrefix, className, ...props } = this.props;
    let classes = classNames(classPrefix, className);
    return (
      <div
        {...props}
        className={classes}
      />
    );
  }
}


export default ModalFooter;
