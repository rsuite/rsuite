// @flow

import * as React from 'react';
import classNames from 'classnames';
import { defaultProps } from './utils';

type Props = {
  classPrefix?: string,
  className?: string
};

class ModalFooter extends React.Component<Props> {
  render() {
    const { classPrefix, className, ...props } = this.props;
    let classes = classNames(classPrefix, className);
    return <div {...props} className={classes} />;
  }
}

export default defaultProps({
  classPrefix: 'modal-footer'
})(ModalFooter);
