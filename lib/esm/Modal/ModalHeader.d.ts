import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface ModalHeaderProps extends WithAsProps {
    /** Primary content */
    children?: React.ReactNode;
    /** Display close button */
    closeButton?: boolean;
    /** Called when Modal is hidden */
    onClose?: (event: React.MouseEvent) => void;
}
declare const ModalHeader: RsRefForwardingComponent<'div', ModalHeaderProps>;
export default ModalHeader;
