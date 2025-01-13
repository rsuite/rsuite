import React from 'react';
import ModalHeader, { ModalHeaderProps } from '../Modal/ModalHeader';
import { forwardRef } from '@/internals/utils';

export type DrawerHeaderProps = ModalHeaderProps;

const DrawerHeader = forwardRef<'div', ModalHeaderProps>((props, ref) => {
  return <ModalHeader classPrefix="drawer-header" {...props} ref={ref} />;
});

DrawerHeader.displayName = 'DrawerHeader';

export default DrawerHeader;
