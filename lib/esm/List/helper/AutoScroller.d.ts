import { Axis, EdgeOffset } from './utils';
type OffsetCallback = (offset: EdgeOffset) => void;
export interface AutoScrollerUpdatePayload {
    translate: Axis;
    minTranslate: Axis;
    maxTranslate: Axis;
    width: number;
    height: number;
}
/***
 * Auto scroll when approaching the edge
 * */
declare class AutoScroller {
    private readonly container;
    private readonly onScrollCallback;
    private interval;
    isAutoScrolling: boolean;
    constructor(container: HTMLElement, onScrollCallback: OffsetCallback);
    clear(): void;
    update({ translate, minTranslate, maxTranslate, width, height }: AutoScrollerUpdatePayload): void;
}
export default AutoScroller;
