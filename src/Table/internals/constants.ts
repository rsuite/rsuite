export const LAYER_WIDTH = 30;
export const SCROLLBAR_MIN_WIDTH = 14;
export const SCROLLBAR_WIDTH = 10;
export const CELL_PADDING_HEIGHT = 26;
export const RESIZE_MIN_WIDTH = 20;
export const SORT_TYPE = { DESC: 'desc', ASC: 'asc' };
export const ROW_HEIGHT = 46;
export const ROW_HEADER_HEIGHT = 40;

// transition-duration (ms)
export const TRANSITION_DURATION = 1000;
// transition-timing-function (ease-out)
export const BEZIER = 'cubic-bezier(0, 0, .58, 1)';

// An attribute value added to the data row to identify whether it is expanded, used in Tree.
export const EXPANDED_KEY: unique symbol = Symbol('expanded');

export const PARENT_KEY: unique symbol = Symbol('parent');

export const TREE_DEPTH: unique symbol = Symbol('treeDepth');
