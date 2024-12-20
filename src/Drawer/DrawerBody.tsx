import React from 'react';
import ModalBody, { ModalBodyProps } from '../Modal/ModalBody';
import { RsRefForwardingComponent } from '@/internals/types';

const DrawerBody: RsRefForwardingComponent<'div', ModalBodyProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => (
    <ModalBody classPrefix="drawer-body" {...props} ref={ref} />
  )
);

export default DrawerBody;
