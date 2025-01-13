import React from 'react';
import ModalFooter, { ModalFooterProps } from '../Modal/ModalFooter';
import { forwardRef } from '@/internals/utils';

export type DrawerFooterProps = ModalFooterProps;

const DrawerFooter = forwardRef<'div', ModalFooterProps>((props, ref) => {
  return <ModalFooter classPrefix="drawer-footer" {...props} ref={ref} />;
});

DrawerFooter.displayName = 'DrawerFooter';

export default DrawerFooter;
