import React from 'react';
import { ModalProps } from '../Modal';
import { TypeAttributes } from '../internals/types';
import DrawerBody from './DrawerBody';
import DrawerHeader from './DrawerHeader';
import DrawerActions from './DrawerActions';
import DrawerFooter from './DrawerFooter';
import DrawerTitle from './DrawerTitle';
export interface DrawerProps extends Omit<ModalProps, 'overflow'> {
    /** The placement of Drawer */
    placement?: TypeAttributes.Placement4;
    /** Custom close button */
    closeButton?: React.ReactNode | boolean;
}
interface DrawerComponent extends React.FC<DrawerProps> {
    Body: typeof DrawerBody;
    Header: typeof DrawerHeader;
    Actions: typeof DrawerActions;
    Title: typeof DrawerTitle;
    /**
     * @deprecated use <Drawer.Actions> instead
     */
    Footer: typeof DrawerFooter;
}
/**
 * The Drawer component is used to display extra content from a main content.
 * @see https://rsuitejs.com/components/drawer
 */
declare const Drawer: DrawerComponent;
export default Drawer;
