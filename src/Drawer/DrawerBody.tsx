import React from 'react';
import Modal, { ModalBodyProps } from '../Modal';
import { RsRefForwardingComponent } from '@/internals/types';

const DrawerBody: RsRefForwardingComponent<'div', ModalBodyProps> = React.forwardRef(
  (props, ref) => <Modal.Body classPrefix="drawer-body" {...props} ref={ref} />
);

export default DrawerBody;
