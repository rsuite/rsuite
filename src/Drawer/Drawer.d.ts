import * as React from 'react';

import { TypeAttributes } from '../@types/common';
import { ModalProps } from '../Modal/Modal.d';
import { ModalBodyProps } from '../Modal/ModalBody.d';
import { ModalHeaderProps } from '../Modal/ModalHeader.d';
import { ModalTitleProps } from '../Modal/ModalTitle.d';
import { ModalFooterProps } from '../Modal/ModalFooter.d';

declare const DrawerFooter: React.ComponentType<ModalFooterProps>;
declare const DrawerTitle: React.ComponentType<ModalTitleProps>;
declare const DrawerHeader: React.ComponentType<ModalHeaderProps>;
declare const DrawerBody: React.ComponentType<ModalBodyProps>;

export interface DrawerProps extends ModalProps {
  /** The placement of Drawer */
  placement?: TypeAttributes.Placement4;
}

interface DrawerComponent extends React.ComponentClass<DrawerProps> {
  Body: typeof DrawerBody;
  Header: typeof DrawerHeader;
  Title: typeof DrawerTitle;
  Footer: typeof DrawerFooter;
}

declare const Drawer: DrawerComponent;

export default Drawer;
