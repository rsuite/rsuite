import React from 'react';
export interface ModalContextProps {
    /** ID of the dialog element */
    dialogId: string;
    /** Pass the close event callback to the header close button. */
    onModalClose?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    /** Pass the latest style to body. */
    getBodyStyles?: () => React.CSSProperties | null;
    /** Indicates if the component should be displayed as a drawer */
    isDrawer?: boolean;
    /** Custom close button used when rendered as a Drawer */
    closeButton?: React.ReactNode | boolean;
}
export declare const ModalContext: React.Context<ModalContextProps | null>;
