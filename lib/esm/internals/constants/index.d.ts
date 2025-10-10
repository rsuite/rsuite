export declare const SIZE: string[];
export declare const COLUMN_SIZE: string[];
export declare const STATUS: string[];
export declare const COLOR: string[];
export declare const PLACEMENT_4: readonly ["top", "bottom", "right", "left"];
export declare const PLACEMENT_8: readonly ["bottomStart", "bottomEnd", "topStart", "topEnd", "leftStart", "rightStart", "leftEnd", "rightEnd"];
export declare const PLACEMENT_AUTO: readonly ["auto", "autoVertical", "autoVerticalStart", "autoVerticalEnd", "autoHorizontal", "autoHorizontalStart", "autoHorizontalEnd"];
export declare const PLACEMENT: readonly ["top", "bottom", "right", "left", "bottomStart", "bottomEnd", "topStart", "topEnd", "leftStart", "rightStart", "leftEnd", "rightEnd", "auto", "autoVertical", "autoVerticalStart", "autoVerticalEnd", "autoHorizontal", "autoHorizontalStart", "autoHorizontalEnd"];
/**
 *  Check Tree Node State
 */
export declare enum CHECK_STATE {
    UNCHECK = 0,
    CHECK = 1,
    INDETERMINATE = 2
}
export type CheckStateType = CHECK_STATE.UNCHECK | CHECK_STATE.CHECK | CHECK_STATE.INDETERMINATE;
/**
 * Tree Node Drag Type
 */
export declare enum TREE_NODE_DROP_POSITION {
    DRAG_OVER = 0,
    DRAG_OVER_TOP = 1,
    DRAG_OVER_BOTTOM = 2
}
/**
 * UI Events KeyboardEvent key Values
 * https://www.w3.org/TR/uievents-key
 */
export declare const KEY_VALUES: {
    LEFT: string;
    UP: string;
    RIGHT: string;
    DOWN: string;
    END: string;
    HOME: string;
    PAGE_DOWN: string;
    PAGE_UP: string;
    ENTER: string;
    TAB: string;
    SPACE: string;
    BACKSPACE: string;
    DELETE: string;
    COMMA: string;
    ESC: string;
};
export declare enum DATERANGE_DISABLED_TARGET {
    CALENDAR = "CALENDAR",
    TOOLBAR_BUTTON_OK = "TOOLBAR_BUTTON_OK",
    TOOLBAR_SHORTCUT = "TOOLBAR_SHORTCUT",
    INPUT = "INPUT"
}
