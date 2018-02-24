// @flow

import * as React from 'react';
import classNames from 'classnames';
import { defaultProps } from 'recompose';
import Modal from './Modal';
import prefix, { globalKey } from './utils/prefix';


type Props = {
  classPrefix: string,
  placement?: 'top' | 'right' | 'bottom' | 'left',
  show?: boolean,
  full?: boolean,
  children?: React.Node,
  className?: string
}

class Drawer extends React.Component<Props> {
  static defaultProps = {
    placement: 'right',
    classPrefix: `${globalKey}drawer`
  };

  static Body = defaultProps({ classPrefix: `${globalKey}drawer-body` })(Modal.Body);
  static Header = defaultProps({ classPrefix: `${globalKey}drawer-header` })(Modal.Header);
  static Title = defaultProps({ classPrefix: `${globalKey}drawer-title` })(Modal.Title);
  static Footer = defaultProps({ classPrefix: `${globalKey}drawer-footer` })(Modal.Footer);

  render() {

    const { show, full, className, placement, classPrefix, ...props } = this.props;
    const addPrefix: Function = prefix(classPrefix);
    const classes = classNames(addPrefix(placement), {
      [addPrefix('full')]: full
    }, className);

    return (
      <Modal
        {...props}
        drawer
        overflow={false}
        classPrefix={classPrefix}
        className={classes}
        show={show}
      />
    );
  }
}


export default Drawer;

