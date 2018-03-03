// @flow

import * as React from 'react';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';

import { defaultProps } from './utils';

type Props = {
  classPrefix?: string,
  className?: string
};

class ModalBody extends React.Component<Props> {
  render() {
    const { classPrefix, className, ...props } = this.props;
    const classes = classNames(classPrefix, className);

    return <div {...props} className={classes} />;
  }
}

export default setDisplayName('ModalBody')(
  defaultProps({
    classPrefix: 'modal-body'
  })(ModalBody)
);
