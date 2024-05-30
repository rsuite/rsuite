import React from 'react';
import Modal, { ModalTitleProps } from '../Modal';
import { RsRefForwardingComponent } from '@/internals/types';

const DrawerTitle: RsRefForwardingComponent<'div', ModalTitleProps> = React.forwardRef(
  (props, ref) => <Modal.Title classPrefix="drawer-title" {...props} ref={ref} />
);

export default DrawerTitle;
