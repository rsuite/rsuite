import type { CheckStateType } from '../utils/constants';
import type { StandardProps } from '../@types/common';
import type { ListProps } from '../internals/Windowing';

/**
 * Represents a single node in a tree.
 */
export interface TreeNode extends Record<string, any> {
  /**
   * Specifies whether the node is uncheckable.
   */
  uncheckable?: boolean;
  /**
   * The reference key of the node.
   */
  refKey?: string;
  /**
   * Specifies whether the node is checked.
   */
  check?: boolean;
  /**
   * The parent node of the current node.
   */
  parent?: TreeNode;
  /**
   * Specifies whether all child nodes are checked.
   */
  checkAll?: boolean;
  /**
   * Specifies whether the node is visible.
   */
  visible?: boolean;
  /**
   * Specifies whether the node is expanded.
   */
  expand?: boolean;
  /**
   * The layer of the node in the tree hierarchy.
   */
  layer?: number;
  /**
   * The label of the node.
   */
  label?: string | React.ReactNode;
  /**
   * The value of the node.
   */
  value?: string | number;
  /**
   * The property to group nodes by.
   */
  groupBy?: string;
  /**
   * The child nodes of the current node.
   */
  children?: TreeNode[];
  /**
   * Specifies whether the node has children.
   */
  hasChildren?: boolean;
  /**
   * The check state of the node.
   */
  checkState?: CheckStateType;
}

/**
 * Represents a map of tree nodes.
 */
export interface TreeNodeMap {
  [key: string]: TreeNode;
}

/**
 * Tree Node Drag Type
 */
export enum TREE_NODE_DROP_POSITION {
  DRAG_OVER = 0, // drag node in tree node
  DRAG_OVER_TOP = 1, // drag node on tree node
  DRAG_OVER_BOTTOM = 2 // drag node under tree node
}

export interface DropData<T> {
  /** drag node data */
  dragNode: T;

  /** dropNode data */
  dropNode: T;

  /** node drop position */
  dropNodePosition: TREE_NODE_DROP_POSITION;

  /** Update Data when drop node */
  createUpdateDataFunction: (data: T[]) => T[];
}

export interface TreeDragProps<T = Record<string, any>> {
  /** Whether the node can  be dragged */
  draggable?: boolean;

  /** Called when scrolling */
  onScroll?: (event: React.SyntheticEvent) => void;

  /** Called when node drag start */
  onDragStart?: (nodeData: T, e: React.DragEvent) => void;

  /** Called when node drag enter */
  onDragEnter?: (nodeData: T, e: React.DragEvent) => void;

  /** Called when node drag over */
  onDragOver?: (nodeData: T, e: React.DragEvent) => void;

  /** Called when node drag leave */
  onDragLeave?: (nodeData: T, e: React.DragEvent) => void;

  /** Called when node drag end */
  onDragEnd?: (nodeData: T, e: React.DragEvent) => void;

  /** Called when node drop */
  onDrop?: (dropData: DropData<T>, e: React.DragEvent) => void;
}

export interface TreeBaseProps<V = string | number, T = TreeNode> extends StandardProps {
  /** The height of the tree */
  height?: number;

  /** Whether display search input box */
  searchable?: boolean;

  /** Display an auxiliary line when the tree node is indented. */
  showIndentLine?: boolean;

  /** Whether using virtualized list */
  virtualized?: boolean;

  /** Virtualized List props */
  listProps?: Partial<ListProps>;

  /** Expand all nodes By default */
  defaultExpandAll?: boolean;

  /** searchKeyword (Controlled) */
  searchKeyword?: string;

  /** Set the option value for the expand node */
  defaultExpandItemValues?: any[];

  /** Set the option value for the expand node with controlled*/
  expandItemValues?: any[];

  /** Callback function for data change */
  onExpand?: (
    expandItemValues: T[],
    activeNode: T,
    concat: (data: T[], children: T[]) => T[]
  ) => void;

  /** Callback function after selecting tree node */
  onSelect?: (activeNode: T, value: V, event: React.SyntheticEvent) => void;

  /** Callback when a tree item is clicked */
  onSelectItem?: (item: T, path: T[]) => void;

  /** Custom Render tree Node */
  renderTreeNode?: (nodeData: T) => React.ReactNode;

  /** Custom Render icon */
  renderTreeIcon?: (nodeData: T) => React.ReactNode;

  /** callback fired when search */
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent) => void;

  /** Custom search rules. */
  searchBy?: (keyword: string, label: React.ReactNode, item: any) => boolean;

  /** Customizing the Rendering Menu list */
  renderMenu?: (menu: React.ReactNode) => React.ReactNode;

  /** load node children data asynchronously */
  getChildren?: (activeNode: T) => T[] | Promise<T[]>;

  /**
   * Called after the value has been changed
   */
  onChange?: (value: V, event: React.SyntheticEvent) => void;
}
