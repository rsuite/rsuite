import React from 'react';
import TreePicker from '../TreePicker';
import { StandardProps, ItemDataType, RsRefForwardingComponent } from '../@types/common';

/**
 * Tree Node Drag Type
 */
export enum TREE_NODE_DROP_POSITION {
  DRAG_OVER = 0, // drag node in tree node
  DRAG_OVER_TOP = 1, // drag node on tree node
  DRAG_OVER_BOTTOM = 2 // drag node under tree node
}

export interface DropData<ItemDataType> {
  /** drag node data */
  dragNode: ItemDataType;

  /** dropNode data */
  dropNode: ItemDataType;

  /** node drop position */
  dropNodePosition: TREE_NODE_DROP_POSITION;

  /** Update Data when drop node */
  createUpdateDataFunction: (data: ItemDataType[]) => ItemDataType[];
}

export interface TreeDragProps<ItemDataType = Record<string, any>> {
  /** Whether the node can  be dragged */
  draggable?: boolean;

  /** Called when scrolling */
  onScroll?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when node drag start */
  onDragStart?: (nodeData: ItemDataType, e: React.DragEvent) => void;

  /** Called when node drag enter */
  onDragEnter?: (nodeData: ItemDataType, e: React.DragEvent) => void;

  /** Called when node drag over */
  onDragOver?: (nodeData: ItemDataType, e: React.DragEvent) => void;

  /** Called when node drag leave */
  onDragLeave?: (nodeData: ItemDataType, e: React.DragEvent) => void;

  /** Called when node drag end */
  onDragEnd?: (nodeData: ItemDataType, e: React.DragEvent) => void;

  /** Called when node drop */
  onDrop?: (dropData: DropData<ItemDataType>, e: React.DragEvent) => void;

  renderDragNode?: (dragNode: ItemDataType) => React.ReactNode;
}

export interface TreeBaseProps<ValueType = string | number, ItemDataType = Record<string, any>>
  extends StandardProps {
  /** The height of Dropdown */
  height?: number;

  /** Display inline */
  inline?: boolean;

  /** Whether display search input box */
  searchable?: boolean;

  /** Whether using virtualized list */
  virtualized?: boolean;

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
    expandItemValues: ItemDataType[],
    activeNode: ItemDataType,
    concat: (data: ItemDataType[], children: React.ReactNode) => ItemDataType[]
  ) => void;

  /** Callback function after selecting tree node */
  onSelect?: (activeNode: ItemDataType, value: ValueType, event: React.SyntheticEvent<any>) => void;

  /** Custom Render tree Node */
  renderTreeNode?: (nodeData: ItemDataType) => React.ReactNode;

  /** Custom Render icon */
  renderTreeIcon?: (nodeData: ItemDataType) => React.ReactNode;

  /** callback fired when search */
  onSearch?: (searchKeyword: string, event: React.KeyboardEvent<HTMLInputElement>) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent<any>) => void;

  /** Custom search rules. */
  searchBy?: (keyword: string, label: React.ReactNode, item: any) => boolean;

  /** Customizing the Rendering Menu list */
  renderMenu?: (menu: React.ReactNode) => React.ReactNode;

  /** load node children data asynchronously */
  getChildren?: (activeNode: ItemDataType) => ItemDataType[] | Promise<ItemDataType>;
}

export interface TreeProps<ValueType = string | number>
  extends TreeBaseProps<ValueType, ItemDataType>,
    TreeDragProps<ItemDataType> {
  /** Tree Data */
  data: ItemDataType[];

  /** Selected value */
  value?: ValueType;

  /** Whether using virtualized list */
  virtualized?: boolean;

  /** Tree data structure Label property name */
  labelKey?: keyof ItemDataType;

  /** ree data Structure Value property name */
  valueKey?: keyof ItemDataType;

  /** Tree data structure Children property name */
  childrenKey?: keyof ItemDataType;

  /** Default selected Value  */
  defaultValue?: ValueType;
}

const Tree: RsRefForwardingComponent<
  'div',
  TreeProps
> = React.forwardRef((props: TreeProps, ref: React.Ref<any>) => (
  <TreePicker inline ref={ref} {...props} />
));

Tree.displayName = 'Tree';
export default Tree;
