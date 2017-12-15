// @flow

import * as React from 'react';
import classNames from 'classnames';
import prefix from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string
}

class ModalFooter extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'modal'
  };

  render() {
    const { classPrefix, className, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    let classes = classNames(addPrefix('footer'), className);
    return (
      <div
        {...props}
        className={classes}
      />
    );
  }
}


export default ModalFooter;
