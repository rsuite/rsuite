import React from 'react';
import ModalFooter, { ModalFooterProps } from '../Modal/ModalFooter';
import { RsRefForwardingComponent } from '@/internals/types';

const DrawerFooter: RsRefForwardingComponent<'div', ModalFooterProps> = React.forwardRef(
  function DrawerFooter(props, ref: React.Ref<HTMLDivElement>) {
    return <ModalFooter classPrefix="drawer-footer" {...props} ref={ref} />;
  }
);
export default DrawerFooter;
