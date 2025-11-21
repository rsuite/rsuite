import React from 'react';
import ModalBody, { ModalBodyProps } from '../Modal/ModalBody';
import { forwardRef } from '@/internals/utils';

export type DrawerBodyProps = ModalBodyProps;

const DrawerBody = forwardRef<'div', ModalBodyProps>((props, ref) => {
  return <ModalBody classPrefix="drawer-body" {...props} ref={ref} />;
});

DrawerBody.displayName = 'DrawerBody';

export default DrawerBody;
