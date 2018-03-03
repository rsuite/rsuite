// @flow

import * as React from 'react';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';

import Modal from './Modal';
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

const WithDrawer = defaultProps({
  classPrefix: 'drawer'
})(Drawer);

setStatic('Body', defaultProps({ classPrefix: 'drawer-body' })(Modal.Body))(WithDrawer);
setStatic('Header', defaultProps({ classPrefix: 'drawer-header' })(Modal.Header))(WithDrawer);
setStatic('Title', defaultProps({ classPrefix: 'drawer-title' })(Modal.Title))(WithDrawer);
setStatic('Footer', defaultProps({ classPrefix: 'drawer-footer' })(Modal.Footer))(WithDrawer);

export default WithDrawer;
