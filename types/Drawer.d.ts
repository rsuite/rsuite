import * as React from 'react';

import { PropTypes } from './index';
import { ModalProps } from './Modal';
import { ModalBodyProps } from './ModalBody';
import { ModalHeaderProps } from './ModalHeader';
import { ModalTitleProps } from './ModalTitle';
import { ModalFooterProps } from './ModalFooter';

declare const DrawerFooter: React.ComponentType<ModalFooterProps>;
declare const DrawerTitle: React.ComponentType<ModalTitleProps>;
declare const DrawerHeader: React.ComponentType<ModalHeaderProps>;
declare const DrawerBody: React.ComponentType<ModalBodyProps>;

export interface DrawerProps extends ModalProps {
  /** The placement of Drawer */
  placement?: PropTypes.Placement4;
}

interface DrawerComponent extends React.ComponentClass<DrawerProps> {
  Body: typeof DrawerBody;
  Header: typeof DrawerHeader;
  Title: typeof DrawerTitle;
  Footer: typeof DrawerFooter;
}

declare const Drawer: DrawerComponent;

export default Drawer;
