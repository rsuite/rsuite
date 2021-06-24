export const SIZE = ['lg', 'md', 'sm', 'xs'];
export const STATUS = ['success', 'warning', 'error', 'info'];
export const COLOR = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

export const PLACEMENT_4 = ['top', 'bottom', 'right', 'left'];
export const PLACEMENT_8 = [
  'bottomStart',
  'bottomEnd',
  'topStart',
  'topEnd',
  'leftStart',
  'rightStart',
  'leftEnd',
  'rightEnd'
];
export const PLACEMENT_AUTO = [
  'auto',
  'autoVertical',
  'autoVerticalStart',
  'autoVerticalEnd',
  'autoHorizontal',
  'autoHorizontalStart',
  'autoHorizontalEnd'
];

export const PLACEMENT = [].concat(PLACEMENT_4, PLACEMENT_8, PLACEMENT_AUTO);

/**
 *  Check Tree Node State
 */
export enum CHECK_STATE {
  UNCHECK = 0,
  CHECK = 1,
  INDETERMINATE = 2
}

export type CheckStateType = CHECK_STATE.UNCHECK | CHECK_STATE.CHECK | CHECK_STATE.INDETERMINATE;

export const TREE_NODE_PADDING = 16;
export const TREE_NODE_ROOT_PADDING = 12;

/**
 * Tree Node Drag Type
 */
export enum TREE_NODE_DROP_POSITION {
  DRAG_OVER = 0, // drag node in tree node
  DRAG_OVER_TOP = 1, // drag node on tree node
  DRAG_OVER_BOTTOM = 2 // drag node under tree node
}

/**
 * UI Events KeyboardEvent key Values
 * https://www.w3.org/TR/uievents-key
 */
export const KEY_VALUES = {
  // Navigation Keys
  LEFT: 'ArrowLeft',
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  END: 'End',
  HOME: 'Home',
  PAGE_DOWN: 'PageDown',
  PAGE_UP: 'PageUp',

  // Whitespace Keys
  ENTER: 'Enter',
  TAB: 'Tab',
  SPACE: ' ',

  // Editing Keys
  BACKSPACE: 'Backspace',
  DELETE: 'Delete',

  // UI Keys
  ESC: 'Escape'
};

export enum DATERANGE_DISABLED_TARGET {
  CALENDAR = 'CALENDAR',
  TOOLBAR_BUTTON_OK = 'TOOLBAR_BUTTON_OK',
  TOOLBAR_SHORTCUT = 'TOOLBAR_SHORTCUT'
}
