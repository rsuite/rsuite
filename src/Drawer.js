// @flow

import * as React from 'react';
import classNames from 'classnames';
import Modal from './Modal';
import prefix, { globalKey } from './utils/prefix';
import withStyleProps from './utils/withStyleProps';

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
  render() {

    const { show, full, children, className, placement, classPrefix, ...props } = this.props;
    const addPrefix: Function = prefix(classPrefix);
    const classes = classNames(addPrefix(placement), {
      [addPrefix('full')]: full
    }, className);

    return (
      <Modal
        {...props}
        classPrefix={classPrefix}
        className={classes}
        show={show}
      >
        <Modal.Body classPrefix={addPrefix('body')}>
          {children}
        </Modal.Body>
      </Modal>
    );
  }
}

export default withStyleProps({
  hasSize: true
})(Drawer);

