import * as React from 'react';

import { FormControlPickerProps } from '../@types/common';
import { TreeBaseProps } from '../Tree/TreeBase';

/**
 * Tree Node Drag Type
 */
export enum TREE_NODE_DROP_POSITION {
  DRAG_OVER = 0, // drag node in tree node
  DRAG_OVER_TOP = 1, // drag node on tree node
  DRAG_OVER_BOTTOM = 2 // drag node under tree node
}

export interface DropData {
  /** drag node data */
  dragNode: any;

  /** dropNode data */
  dropNode: any;

  /** node drop postion */
  dropNodePosition: TREE_NODE_DROP_POSITION;

  /** Update Data when drop node */
  createUpdateDataFunction: (data: any[]) => any[];
}
export interface TreePickerProps extends TreeBaseProps, FormControlPickerProps {
  /** The height of Dropdown */
  height?: number;

  /** Tree node cascade */
  cascade?: boolean;

  /** A picker that can be counted */
  countable?: boolean;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** Whether using virtualized list */
  virtualized?: boolean;

  /** Whether the node can  be dragged */
  draggable?: boolean;

  /** Set the option value for the expand node */
  defaultExpandItemValues?: any[];

  /** Set the option value for the expand node with controlled*/
  expandItemValues?: any[];

  /** Customizing the Rendering Menu list */
  renderMenu?: (menu: React.ReactNode) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (
    value: any[],
    selectedItems: any[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when scrolling */
  onScroll?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when node drag start */
  onDragStart?: (nodeData: any, e: React.DragEvent) => void;

  /** Called when node drag enter */
  onDragEnter?: (nodeData: any, e: React.DragEvent) => void;

  /** Called when node drag over */
  onDragOver?: (nodeData: any, e: React.DragEvent) => void;

  /** Called when node drag leave */
  onDragLeave?: (nodeData: any, e: React.DragEvent) => void;

  /** Called when node drag end */
  onDragEnd?: (nodeData: any, e: React.DragEvent) => void;

  /** Called when node drop */
  onDrop?: (dropData: DropData, e: React.DragEvent) => void;

  renderDragNode?: (dragNode: any) => React.ReactNode;
}

declare const TreePicker: React.ComponentType<TreePickerProps>;

export default TreePicker;
