import { MouseEventHandler, TouchEventHandler } from 'react';
import { Collection, ManagedItem } from './useManager';
export interface MovedItemInfo {
    collection: Collection;
    node: HTMLElement;
    newIndex: number;
    oldIndex: number;
}
export type SortConfig = {
    autoScroll?: boolean;
    pressDelay?: number;
    transitionDuration?: number;
    onSortStart?(payload?: MovedItemInfo, event?: MouseEvent | TouchEvent): void;
    onSortMove?(payload?: MovedItemInfo, event?: MouseEvent | TouchEvent): void;
    onSortEnd?(payload?: MovedItemInfo, event?: MouseEvent | TouchEvent): void;
    onSort?(payload?: MovedItemInfo, event?: MouseEvent | TouchEvent): void;
};
declare const useSortHelper: (config: SortConfig) => {
    handleStart: MouseEventHandler<Element>;
    handleEnd: MouseEventHandler<Element>;
    handleTouchStart: TouchEventHandler<Element>;
    handleTouchEnd: TouchEventHandler<Element>;
    containerRef: import("react").RefObject<HTMLDivElement>;
    sorting: boolean;
    register: (item: ManagedItem) => {
        unregister: () => void;
    };
};
export default useSortHelper;
