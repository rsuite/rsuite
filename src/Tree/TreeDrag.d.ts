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

  /** node drop position */
  dropNodePosition: TREE_NODE_DROP_POSITION;

  /** Update Data when drop node */
  createUpdateDataFunction: (data: any[]) => any[];
}

export interface TreeDragProps {
  /** Whether the node can  be dragged */
  draggable?: boolean;

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
