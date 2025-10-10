import React from 'react';
import PropTypes from 'prop-types';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../internals/types';
export interface ModalDialogProps extends WithAsProps {
    /** A modal can have different sizes */
    size?: TypeAttributes.Size;
    dialogClassName?: string;
    dialogStyle?: React.CSSProperties;
}
export declare const modalDialogPropTypes: {
    size: PropTypes.Requireable<string>;
    className: PropTypes.Requireable<string>;
    classPrefix: PropTypes.Requireable<string>;
    dialogClassName: PropTypes.Requireable<string>;
    style: PropTypes.Requireable<object>;
    dialogStyle: PropTypes.Requireable<object>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
};
declare const ModalDialog: RsRefForwardingComponent<'div', ModalDialogProps>;
export default ModalDialog;
