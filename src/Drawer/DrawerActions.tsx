import React from 'react';
import Modal from '../Modal';
import { RsRefForwardingComponent } from '@/internals/types';
import type { ComponentProps } from '@/internals/utils';

const DrawerActions: RsRefForwardingComponent<'div', ComponentProps> = React.forwardRef(
  (props, ref) => <Modal.Footer classPrefix="drawer-actions" {...props} ref={ref} />
);
export default DrawerActions;
