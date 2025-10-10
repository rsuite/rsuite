/// <reference types="react" />
import type { OverlayTriggerHandle } from '../PickerToggleTrigger';
import type { ListHandle } from '../../Windowing';
/**
 * A hook of the exposed method of Picker
 */
declare function usePickerRef(ref: any): {
    trigger: import("react").RefObject<OverlayTriggerHandle>;
    root: import("react").MutableRefObject<any>;
    overlay: import("react").RefObject<HTMLElement>;
    target: import("react").RefObject<HTMLElement>;
    list: import("react").RefObject<ListHandle>;
    searchInput: import("react").RefObject<HTMLInputElement>;
    treeView: import("react").RefObject<HTMLDivElement>;
};
export default usePickerRef;
