import React from 'react';
import ModalTitle, { ModalTitleProps } from '../Modal/ModalTitle';
import { RsRefForwardingComponent } from '@/internals/types';

const DrawerTitle: RsRefForwardingComponent<'div', ModalTitleProps> = React.forwardRef(
  function DrawerTitle(props, ref: React.Ref<HTMLDivElement>) {
    return <ModalTitle classPrefix="drawer-title" {...props} ref={ref} />;
  }
);

export default DrawerTitle;
