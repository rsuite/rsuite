/// <reference types="react" />
import { TREE_NODE_DROP_POSITION } from '../../internals/constants';
import type { DropData } from '../types';
interface TreeDragProps {
    draggable?: boolean;
    flattenedNodes: Record<string, any>;
    treeNodesRefs: Record<string, any>;
    prefix: (className: string) => string;
    onDragStart?: (nodeData: any, event: React.DragEvent) => void;
    onDragEnter?: (nodeData: any, event: React.DragEvent) => void;
    onDragOver?: (nodeData: any, event: React.DragEvent) => void;
    onDragLeave?: (nodeData: any, event: React.DragEvent) => void;
    onDragEnd?: (nodeData: any, event: React.DragEvent) => void;
    onDrop?: (dropData: DropData<Record<string, any>>, event: React.DragEvent) => void;
}
/**
 * Custom hook for handling tree node dragging.
 */
export default function useTreeDrag<T>(props: TreeDragProps): {
    dragNode: T | null;
    dragOverNodeKey: null;
    dropNodePosition: -1 | TREE_NODE_DROP_POSITION | null;
    dragEvents: {
        onDragStart: (...args: any[]) => any;
        onDragEnter: (...args: any[]) => any;
        onDragOver: (...args: any[]) => any;
        onDragLeave: (...args: any[]) => any;
        onDragEnd: (...args: any[]) => any;
        onDrop: (...args: any[]) => any;
    };
};
export {};
