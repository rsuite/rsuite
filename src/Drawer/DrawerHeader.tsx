import React from 'react';
import ModalHeader, { ModalHeaderProps } from '../Modal/ModalHeader';
import { RsRefForwardingComponent } from '@/internals/types';

const DrawerHeader: RsRefForwardingComponent<'div', ModalHeaderProps> = React.forwardRef(
  (props, ref) => <ModalHeader classPrefix="drawer-header" {...props} ref={ref} />
);

export default DrawerHeader;
