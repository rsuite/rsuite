import React from 'react';
import ModalHeader, { ModalHeaderProps } from '../Modal/ModalHeader';
import { RsRefForwardingComponent } from '@/internals/types';

const DrawerHeader: RsRefForwardingComponent<'div', ModalHeaderProps> = React.forwardRef(
  function DrawerHeader(props, ref: React.Ref<HTMLDivElement>) {
    return <ModalHeader classPrefix="drawer-header" {...props} ref={ref} />;
  }
);

export default DrawerHeader;
