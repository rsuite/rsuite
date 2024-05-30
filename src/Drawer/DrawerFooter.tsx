import React from 'react';
import Modal, { ModalFooterProps } from '../Modal';
import { RsRefForwardingComponent } from '@/internals/types';

const DrawerFooter: RsRefForwardingComponent<'div', ModalFooterProps> = React.forwardRef(
  (props, ref) => <Modal.Footer classPrefix="drawer-footer" {...props} ref={ref} />
);
export default DrawerFooter;
