// @flow

import * as React from 'react';
import classNames from 'classnames';
import prefix from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string
}

class ModalBody extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'modal'
  };
  render() {
    const { classPrefix, className, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(addPrefix('body'), className);

    return (
      <div {...props} className={classes} />
    );
  }
}

export default ModalBody;
