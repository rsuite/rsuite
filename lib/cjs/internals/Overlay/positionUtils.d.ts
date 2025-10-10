import { CursorPosition, TypeAttributes } from '../types';
type Offset = {
    top: number;
    left: number;
    width: number;
    height: number;
};
export interface PositionType {
    positionLeft?: number;
    positionTop?: number;
    arrowOffsetLeft?: number;
    arrowOffsetTop?: number;
    positionClassName?: string;
}
export interface UtilProps {
    placement: TypeAttributes.Placement;
    preventOverflow: boolean;
    padding: number;
}
export declare const AutoPlacement: {
    left: string;
    right: string;
    top: string;
    bottom: string;
};
export interface Dimensions {
    width: number;
    height: number;
    scrollX: number;
    scrollY: number;
}
declare const _default: (props: UtilProps) => {
    getPosition(target: HTMLElement, container: HTMLElement): import("dom-lib/getOffset").Offset | DOMRect | null;
    getCursorOffsetPosition(target: HTMLElement, container: HTMLElement, cursorPosition: CursorPosition): Offset;
    calcAutoPlacement(targetOffset: any, container: any, overlay: any): any;
    calcOverlayPosition(overlayNode: HTMLElement, target: HTMLElement, container: HTMLElement, cursorPosition?: CursorPosition | null): PositionType;
};
export default _default;
