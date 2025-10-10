import React from 'react';
import PropTypes from 'prop-types';
import { WithAsProps, AnimationEventProps, RsRefForwardingComponent } from '../types';
export interface BaseModalProps extends WithAsProps, AnimationEventProps {
    /** Animation-related properties */
    animationProps?: any;
    /** Primary content */
    children?: React.ReactNode;
    /**
     * Add an optional extra class name to .modal-backdrop
     * It could end up looking like class="modal-backdrop foo-modal-backdrop in"
     */
    backdropClassName?: string;
    /** CSS style applied to backdrop DOM nodes  */
    backdropStyle?: React.CSSProperties;
    /** Open  modal */
    open?: boolean;
    /**
     * When set to true, the Modal will display the background when it is opened.
     * Clicking on the background will close the Modal. If you do not want to close the Modal,
     * set it to 'static'.
     */
    backdrop?: boolean | 'static';
    /** Close Modal when esc key is pressed */
    keyboard?: boolean;
    /**
     * When set to true, the Modal is opened and is automatically focused on its own,
     * accessible to screen readers
     */
    autoFocus?: boolean;
    /**
     * When set to true, Modal will prevent the focus from leaving when opened,
     * making it easier for the secondary screen reader to access
     */
    enforceFocus?: boolean;
    /** Called when Modal is displayed */
    onOpen?: () => void;
    /** Called when Modal is closed */
    onClose?: (event: React.SyntheticEvent) => void;
    container?: HTMLElement | (() => HTMLElement);
    containerClassName?: string;
    backdropTransitionTimeout?: number;
    dialogTransitionTimeout?: number;
    transition?: React.ElementType;
    onEsc?: React.KeyboardEventHandler;
    onBackdropClick?: React.MouseEventHandler;
}
declare const Modal: RsRefForwardingComponent<'div', BaseModalProps>;
export declare const modalPropTypes: {
    as: PropTypes.Requireable<PropTypes.ReactComponentLike>;
    className: PropTypes.Requireable<string>;
    backdropClassName: PropTypes.Requireable<string>;
    style: PropTypes.Requireable<object>;
    backdropStyle: PropTypes.Requireable<object>;
    open: PropTypes.Requireable<boolean>;
    backdrop: PropTypes.Requireable<NonNullable<string | boolean | null | undefined>>;
    keyboard: PropTypes.Requireable<boolean>;
    autoFocus: PropTypes.Requireable<boolean>;
    enforceFocus: PropTypes.Requireable<boolean>;
    animationProps: PropTypes.Requireable<object>;
    onOpen: PropTypes.Requireable<(...args: any[]) => any>;
    onClose: PropTypes.Requireable<(...args: any[]) => any>;
};
export default Modal;
