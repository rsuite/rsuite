import React from 'react';
import { BaseModalProps } from '../internals/Overlay/Modal';
import ModalDialog from './ModalDialog';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';
import { ModalSize } from './utils';
import { RsRefForwardingComponent } from '../internals/types';
export interface ModalProps extends BaseModalProps, Pick<React.HTMLAttributes<HTMLElement>, 'role' | 'id' | 'aria-labelledby' | 'aria-describedby'> {
    /** A modal can have different sizes */
    size?: ModalSize;
    /** Set the duration of the animation */
    animationTimeout?: number;
    /** Set an animation effect for Modal, the default is Bounce.  */
    animation?: React.ElementType;
    /** CSS class applied to Dialog DOM nodes */
    dialogClassName?: string;
    /** CSS style applied to dialog DOM nodes */
    dialogStyle?: React.CSSProperties;
    /**
     * Full screen
     * @deprecated Use size="full" instead.
     */
    full?: boolean;
    /** You can use a custom element type for Dialog */
    dialogAs?: React.ElementType;
    /** Automatically sets the height when the body content is too long. */
    overflow?: boolean;
    /** Indicates if the component should be displayed as a drawer */
    isDrawer?: boolean;
    /** Custom close button, used when rendered as a Drawer */
    closeButton?: React.ReactNode | boolean;
}
interface ModalComponent extends RsRefForwardingComponent<'div', ModalProps> {
    Body: typeof ModalBody;
    Header: typeof ModalHeader;
    Title: typeof ModalTitle;
    Footer: typeof ModalFooter;
    Dialog: typeof ModalDialog;
}
/**
 * The `Modal` component is used to show content in a layer above the app.
 * @see https://rsuitejs.com/components/modal
 */
declare const Modal: ModalComponent;
export default Modal;
