import React from 'react';
import Modal, { ModalHeaderProps } from '../Modal';
import { RsRefForwardingComponent } from '@/internals/types';

const DrawerHeader: RsRefForwardingComponent<'div', ModalHeaderProps> = React.forwardRef(
  (props, ref) => <Modal.Header classPrefix="drawer-header" {...props} ref={ref} />
);

export default DrawerHeader;
