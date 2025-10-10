import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export declare const defaultToasterContainer: () => HTMLElement | null;
export type PlacementType = 'topCenter' | 'bottomCenter' | 'topStart' | 'topEnd' | 'bottomStart' | 'bottomEnd';
export declare const toastPlacements: PlacementType[];
export interface ToastContainerProps extends WithAsProps {
    /**
     * The placement of the message box。
     *
     * @default 'topCenter'
     */
    placement?: PlacementType;
    /**
     * Set the message to appear in the specified container
     */
    container?: HTMLElement | (() => HTMLElement);
    /**
     * The number of milliseconds to wait before automatically closing a message.
     */
    duration?: number;
    /**
     * Reset the hide timer if the mouse moves over the message.
     */
    mouseReset?: boolean;
}
interface PushOptions {
    duration?: number;
    mouseReset?: boolean;
    container?: HTMLElement | (() => HTMLElement);
}
export interface ToastContainerInstance {
    push: (message: React.ReactNode, options?: PushOptions) => string;
    remove: (key: string) => void;
    clear: () => void;
    destroy: () => void;
}
export interface NodeProps extends WithAsProps {
    onClose?: (event?: React.MouseEvent<HTMLDivElement>) => void;
}
export type GetInstancePropsType = Omit<ToastContainerProps, 'container' | 'placement'> & {
    container: HTMLElement | null;
    placement: PlacementType;
};
interface ToastContainerComponent extends RsRefForwardingComponent<'div', ToastContainerProps> {
    getInstance: (props: GetInstancePropsType) => Promise<[React.RefObject<ToastContainerInstance>, string]>;
}
declare const ToastContainer: ToastContainerComponent;
export default ToastContainer;
