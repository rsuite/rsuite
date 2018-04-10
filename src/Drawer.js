// @flow

import * as React from 'react';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';
import setDisplayName from 'recompose/setDisplayName';

import Modal from './Modal';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';

import { prefix, defaultProps } from './utils';

type Props = {
  classPrefix: string,
  placement?: 'top' | 'right' | 'bottom' | 'left',
  show?: boolean,
  full?: boolean,
  children?: React.Node,
  className?: string
};

class Drawer extends React.Component<Props> {
  static defaultProps = {
    placement: 'right'
  };

  render() {
    const { show, full, className, placement, classPrefix, ...props } = this.props;
    const addPrefix: Function = prefix(classPrefix);
    const classes = classNames(addPrefix(placement), className, {
      [addPrefix('full')]: full
    });

    return <Modal {...props} drawer classPrefix={classPrefix} className={classes} show={show} />;
  }
}

const EnhancedDrawer = defaultProps({
  classPrefix: 'drawer'
})(Drawer);

const EnhancedBody = defaultProps({ classPrefix: 'drawer-body' })(ModalBody);

setStatic('Body', setDisplayName('Body')(EnhancedBody))(EnhancedDrawer);
setStatic('Header', defaultProps({ classPrefix: 'drawer-header' })(ModalHeader))(EnhancedDrawer);
setStatic('Title', defaultProps({ classPrefix: 'drawer-title' })(ModalTitle))(EnhancedDrawer);
setStatic('Footer', defaultProps({ classPrefix: 'drawer-footer' })(ModalFooter))(EnhancedDrawer);

export default EnhancedDrawer;
