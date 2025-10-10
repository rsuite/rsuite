import { CSSProperties } from 'react';
import { Offset } from '../../internals/types';
export interface Axis {
    x: number;
    y: number;
}
export type EdgeOffset = Omit<Offset, 'width' | 'height'>;
export declare function isContainInteractiveElement(targetNode: HTMLElement): boolean;
export declare function setInlineStyles(node: HTMLElement, styles: CSSProperties): void;
export declare function setTranslate3d(node: HTMLElement, translate: Axis | null): void;
export declare function setTransitionDuration(node: HTMLElement, duration?: number | null): void;
/**
 * find closest target node from source node
 * */
export declare function closestNode(sourceNode: HTMLElement, judge: (target: HTMLElement) => boolean): HTMLElement | null;
export declare function getEdgeOffset(node: HTMLElement, parent: HTMLElement, offset?: EdgeOffset): Partial<EdgeOffset>;
export declare function getScrollingParent(el: HTMLElement): HTMLElement | null;
