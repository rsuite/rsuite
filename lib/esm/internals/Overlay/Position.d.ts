import React from 'react';
import { CursorPosition, TypeAttributes } from '../types';
export interface PositionChildProps {
    className: string;
    left?: number;
    top?: number;
    arrowOffsetLeft?: number;
    arrowOffsetTop?: number;
}
export interface PositionProps {
    children: (props: PositionChildProps, ref: React.RefObject<HTMLElement>) => React.ReactElement;
    className?: string;
    container?: HTMLElement | (() => HTMLElement | null) | null;
    containerPadding?: number;
    placement?: TypeAttributes.Placement;
    preventOverflow?: boolean;
    triggerTarget?: React.RefObject<any>;
    followCursor?: boolean;
    cursorPosition?: CursorPosition | null;
}
export interface PositionInstance {
    updatePosition?: () => void;
    child?: Element;
}
/**
 * The `Position` component calculates the position of the child element.
 * @private
 */
declare const Position: React.ForwardRefExoticComponent<PositionProps & React.RefAttributes<unknown>>;
export default Position;
