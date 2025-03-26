import React from 'react';
import ModalTitle, { ModalTitleProps } from '../Modal/ModalTitle';
import { forwardRef } from '@/internals/utils';

export type DrawerTitleProps = ModalTitleProps;

const DrawerTitle = forwardRef<'div', ModalTitleProps>((props, ref) => {
  return <ModalTitle classPrefix="drawer-title" {...props} ref={ref} />;
});

DrawerTitle.displayName = 'DrawerTitle';

export default DrawerTitle;
