// @flow

import * as React from 'react';
import classNames from 'classnames';
import { defaultProps } from './utils';

type Props = {
  className?: string,
  classPrefix?: string,
  children?: React.Node
};

class ModalTitle extends React.Component<Props> {
  render() {
    const { className, classPrefix, children, ...props } = this.props;
    const classes = classNames(classPrefix, className);
    return (
      <h4 {...props} className={classes}>
        {children}
      </h4>
    );
  }
}

export default defaultProps({
  classPrefix: 'modal-title'
})(ModalTitle);
