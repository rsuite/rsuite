import React from 'react';
import PropTypes from 'prop-types';
import { PositionChildProps } from './Position';
import { TypeAttributes, AnimationEventProps, CursorPosition } from '../types';
export interface OverlayProps extends AnimationEventProps {
    container?: HTMLElement | (() => HTMLElement | null) | null;
    children: React.ReactElement | ((props: PositionChildProps & React.HTMLAttributes<HTMLElement>, ref: React.RefCallback<HTMLElement>) => React.ReactElement);
    childrenProps?: React.HTMLAttributes<HTMLElement>;
    className?: string;
    containerPadding?: number;
    placement?: TypeAttributes.Placement;
    preventOverflow?: boolean;
    open?: boolean;
    rootClose?: boolean;
    transition?: React.ElementType;
    triggerTarget?: React.RefObject<any>;
    onClose?: React.ReactEventHandler;
    followCursor?: boolean;
    cursorPosition?: CursorPosition | null;
}
export declare const overlayPropTypes: {
    container: PropTypes.Requireable<any>;
    children: PropTypes.Requireable<any>;
    childrenProps: PropTypes.Requireable<object>;
    className: PropTypes.Requireable<string>;
    containerPadding: PropTypes.Requireable<number>;
    placement: PropTypes.Requireable<any>;
    preventOverflow: PropTypes.Requireable<boolean>;
    open: PropTypes.Requireable<boolean>;
    rootClose: PropTypes.Requireable<boolean>;
    transition: PropTypes.Requireable<any>;
    triggerTarget: PropTypes.Requireable<any>;
    onClose: PropTypes.Requireable<(...args: any[]) => any>;
    onEnter: PropTypes.Requireable<(...args: any[]) => any>;
    onEntering: PropTypes.Requireable<(...args: any[]) => any>;
    onEntered: PropTypes.Requireable<(...args: any[]) => any>;
    onExit: PropTypes.Requireable<(...args: any[]) => any>;
    onExiting: PropTypes.Requireable<(...args: any[]) => any>;
    onExited: PropTypes.Requireable<(...args: any[]) => any>;
};
/**
 * Overlay is a powerful component that helps you create floating components.
 * @private
 */
declare const Overlay: React.ForwardRefExoticComponent<OverlayProps & React.RefAttributes<unknown>>;
export default Overlay;
