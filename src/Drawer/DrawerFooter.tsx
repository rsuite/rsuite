import React from 'react';
import ModalFooter, { ModalFooterProps } from '../Modal/ModalFooter';
import { RsRefForwardingComponent } from '@/internals/types';

const DrawerFooter: RsRefForwardingComponent<'div', ModalFooterProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => (
    <ModalFooter classPrefix="drawer-footer" {...props} ref={ref} />
  )
);
export default DrawerFooter;
